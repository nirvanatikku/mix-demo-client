/*
 * Copyright 2021-present, Nuance, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE.md file in the root directory of this source tree.
 *
 */
import React, { useState } from "react"

import moment from 'moment'
import loadable from '@loadable/component'

import { BaseClass, AuthForm } from "./shared"
import { CLIENT_DATA, ROOT_URL, SIMULATED_EXPERIENCES } from "./shared"
import { LogEventsTable, LogEventsViz } from "./log"
import ChatPanel from "./chat"
import TTSaaS from "../components/ttsaas"
import Form from 'react-bootstrap/Form'

const ReactJson = loadable(() => import('react-json-view'))
const Button = loadable(() => import('react-bootstrap/Button'))
const Tabs = loadable(() => import('react-bootstrap/Tabs'))
const Tab = loadable(() => import('react-bootstrap/Tab'))
const TabContent = loadable(() => import('react-bootstrap/TabContent'))

const ACTION_TYPES = [ 
  'qaAction',
  'daAction',
  // 'escalationAction',
  // 'endAction'
]

// Data Handlers

class ExternalFetchHandlers {

  // iGetWeather
  Server_WeatherAPI_CitySearch = () => {
    return 'api/weather-api-city-search'
  }
  Server_WeatherAPI_CurrentConditions = () => {
    return 'api/weather-api-city-conditions'
  }

  // iAssetPrice
  Server_Asset_Price = () => {
    return 'api/finance-api-asset-price'
  }
  Server_Asset_Purchase = () => {
    return 'api/finance-api-asset-purchase'
  }

  // iSendEmail
  Server_Send_Email = () => {
    return 'api/email-api-send'
  }

  // iBookFlight
  Server_Trip_ListOptions = () => {
    return 'api/travel-api-list-options'
  }

  // iBuyPhone
  Server_PhoneWordset_Filter = () => {
    return 'api/store-api-filter-phone-wordset'
  }
  Server_RequestPurchase = () => {
    return 'api/store-api-request-purchase'
  }
  Server_Purchase = () => {
    return 'api/store-api-purchase'
  }

}

class ClientFetchHandlers {

  Location = () => {
    // Get location from browser
    return new Promise(resolve => {
      if(!navigator.geolocation){
        resolve({
          'response': {
            'returnCode': 'error.browser.unable',
            'returnMessage': 'Unable to retrieve location from client; no access.'
          }
        })
      } else {
        navigator.geolocation.getCurrentPosition((pos) => {
          resolve({
            'response': {
              'returnCode': '0',
              'returnMessage': 'Returning coordinates from browser',
              'searchLatLng': {
                'latitude': pos.coords.latitude,
                'longitude': pos.coords.longitude
              }
            }
          })
        }, (error) => {
          console.error(error)
          resolve({
            'response': {
              'returnCode': 'error.browser.fail',
              'returnMessage': 'Unable to retrieve location; error.'
            }
          })
        })
      }
    })
  }

}

//
// DLGaaS
//

function DlgTabs({simulateExperience, logEvents, apiEvents, rawResponses}){
  const [key, setKey] = useState('raw_payloads')
  return (
    <Tabs onSelect={(k) => setKey(k)}
      activeKey={key}
      transition={false}
      id="noanim-tab-example">
      <Tab eventKey="raw_payloads" title={(<div>Client Payloads <small className="badge bg-light text-secondary">{rawResponses.length}</small></div>)}>
        <TabContent className="bg-light px-2 py-2">
          { key === 'raw_payloads' ? (
            <ReactJson
              className="mb-2"
              key={'json-' + rawResponses.length}
              src={{
                'latest': {
                  1: rawResponses[0], 
                  2: rawResponses.length > 1 ? rawResponses[1] : null,
                  3: rawResponses.length > 2 ? rawResponses[2] : null
                }, 
                'all': rawResponses
              }}
              displayDataTypes={false}
              iconStyle={'circle'}
              indentWidth={2}
              name={false}
              quotesOnKeys={false}
              groupArraysAfterLength={5}
              collapseStringsAfterLength={50}
              displayObjectSize={true}
              collapsed={9}
              displayArrayKey={false}
              // theme={'grayscale'}
            />
          ) : ('')}
        </TabContent>
      </Tab>
      <Tab eventKey="table_log_events" title={(<div>Log Events Table</div>)} disabled={logEvents.length === 0}>
        <TabContent className="bg-light px-2 py-2">
          { logEvents.length && key === 'table_log_events' ? (<LogEventsTable events={logEvents} simulateExperience={simulateExperience}/>) : ''}
        </TabContent>
      </Tab>
      <Tab eventKey="viz_log_events" title={(<div>Log Events Viz</div>)} disabled={logEvents.length === 0}>
        <TabContent className="bg-light px-2 py-2">
          {logEvents.length && key === 'viz_log_events' ? (<LogEventsViz events={logEvents}/>) : ''}
        </TabContent>
      </Tab>
      <Tab eventKey="raw_log_events" title={(<div>Log Events JSON <small className="badge bg-light text-secondary">{logEvents.length}</small></div>)} disabled={logEvents.length === 0}>
        <TabContent className="bg-light px-2 py-2">
          { key === 'raw_log_events' ? (
            <ReactJson
              className="mb-2"
              key={'nii-json-' + logEvents.length}
              src={logEvents}
              displayDataTypes={false}
              iconStyle={'circle'}
              indentWidth={2}
              name={false}
              quotesOnKeys={false}
              groupArraysAfterLength={5}
              collapseStringsAfterLength={50}
              displayObjectSize={true}
              collapsed={5}
              displayArrayKey={false}
            />
          ) : ('')}
        </TabContent>
      </Tab>
      <Tab eventKey="raw_api_events" title={(<div>API Events JSON <small className="badge bg-light text-secondary">{apiEvents.length}</small></div>)} className="bg-light" disabled={apiEvents.length === 0}>
        <TabContent className="bg-light px-2 py-2">
          { key === 'raw_api_events' ? (
            <ReactJson
              className="mb-2"
              key={'event-json-' + apiEvents.length}
              src={apiEvents}
              displayDataTypes={false}
              iconStyle={'circle'}
              indentWidth={2}
              name={false}
              quotesOnKeys={false}
              groupArraysAfterLength={5}
              collapseStringsAfterLength={50}
              displayObjectSize={true}
              collapsed={5}
              displayArrayKey={false}
            />
          ) : ('')}
        </TabContent>
      </Tab>
    </Tabs>
  )
}

// Client

export default class DLGaaS extends BaseClass {

  constructor(){
    super()
    this.state = {
      error: null,
      clientId: '',
      clientSecret: '',
      modelUrn: 'urn:nuance-mix:tag:model/REPLACE_ME/mix.dialog',
      accessToken: null,
      sessionId: '',
      channel: 'default',
      language: 'en-US',
      sessionTimeout: 900,
      simulateExperience: 'visualVA',
      ttsVoice: {name: 'Evan', model: 'enhanced'},
      ttsVoices: [],
      rawResponses: [],
      rawEvents: [],
      autoScrollChatPanel: true,
      startData: {
        userData: {
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          userGlobalID: null,
          userChannelID: null,
          userAuxiliaryID: null,
          systemID: null,
          location: null
        }
      },
      tokenError: '',
      isSessionActive: false,
      logConsumerGroup: null,
      logConsumerName: null,
      fetchRecordsTimeout: -1,
      fetchingLocation: false
    }
    this.logTimer = -1
    this.recoTimeout = -1
    this.onChangeTextInput = this.onChangeTextInput.bind(this)
    this.onChangeSelectInput = this.onChangeSelectInput.bind(this)
    this.clientHandlers = new ClientFetchHandlers()
    this.externalHandlers = new ExternalFetchHandlers()

    this.ttsClz = new TTSaaS(this)

  }

  isStandalone(){
    return false
  }

  componentDidMount(){
    const params = this.initStateFromQueryParams([
      'clientId',
      'clientSecret',
      'modelUrn',
      'channel',
      'language',
      'sessionTimeout',
      'simulateExperience',
      'ttsVoice',
      'sessionId'
    ])
    if(Object.keys(params).length){
      this.setState(params)
    }
    window.addEventListener('beforeunload', this.onUnmount, false)
    this.initStartData(() => {
      if(this.isStandalone()){
        this.initToken().then(() => {
          this.go()
        })
      }
    })
  }

  initStartData(after){
    const startDataLocalStorage = window.localStorage.getItem('startData')
    if(startDataLocalStorage){
      try{
        this.setState({
          startData: JSON.parse(startDataLocalStorage)
        }, after)
      } catch (ex) {
        console.error(ex)
      }
    }
  }

  onUnmount = (e) => {
    try{
      if(this.state.logConsumerName){
        this.destroyConsumer()
      }
      if(this.ttsClz){
        this.ttsClz.onUnmount()
      }
    } catch(ex) {
      console.warn(ex)
    }
    return null
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onUnmount.bind(this), false)
    this.onUnmount()
  }

  onTokenAcquired() {
    // noop
    if(SIMULATED_EXPERIENCES(this.state.simulateExperience).playTTS){
      this.ttsClz = new TTSaaS(this)
      this.ttsClz.componentDidMount()
      this.ttsClz.state.ssmlInput = true
      this.ttsClz.playQueue = []
      this.ttsClz.state.accessToken = this.state.accessToken
      this.ttsClz.getVoices().then(res => {
        this.setState({
          ttsVoices: res.response.payload.voices
        })
      })
    }
  }

  // DLGaaS API

  async sessionStart(language, channel, sessionTimeout, startData, sessionId) {
    // Second, the Session is Started
    await this.ensureTokenNotExpired()
    let fullPayload = {
      selector: {
        language: language,
        channel: channel,
        library: 'default',
      },
      payload: {
        data: startData
      },
      session_timeout_sec: sessionTimeout,
      client_data: CLIENT_DATA,
    }
    if(sessionId){
      fullPayload.session_id = sessionId
    }
    return await this.request(`${ROOT_URL}/api/dlgaas-session-start`, {
      token: this.state.accessToken,
      modelUrn: this.state.modelUrn,
      rawPayload: fullPayload
    })
  }

  async sessionExecute(payload) {
    // Third, transactions are Executed within the Session
    await this.ensureTokenNotExpired()
    return await this.request(`${ROOT_URL}/api/dlgaas-session-execute`, {
      token: this.state.accessToken,
      sessionId: this.state.sessionId,
      rawPayload: payload
    })
  }

  async sessionStop() {
    // Lastly, the Session is Stopped
    await this.ensureTokenNotExpired()
    return await this.request(`${ROOT_URL}/api/dlgaas-session-stop`, {
      token: this.state.accessToken,
      sessionId: this.state.sessionId
    })
  }

  async clientFetchDaAction(daAction){
    //
    //  1. Client  -> local client handling
    const daId = daAction.id
    let localFunctionStub = this.clientHandlers[daId]
    if(localFunctionStub){
      console.log('Calling CLIENT FUNCTION', daAction, localFunctionStub())
      return localFunctionStub(daAction)
    }
    // Special
    if(daId === 'Client_Location_LatLng'){
      return await this.clientHandlers.Location(daAction)
    }
    //
    //  2. Server  -> local client to function, intended: webhook and DataHost usage
    let externalFunctionStub = this.externalHandlers[daId]
    if(externalFunctionStub){
      console.log('Calling SERVER FUNCTION', daAction, externalFunctionStub())
      return await this.request(
        `${ROOT_URL}/${externalFunctionStub()}`,
        daAction.data,
        true
      )
    }
    return {
      'returnCode': 'error.unhandled', 
      'returnMessage': 'Ensure handlers in dlgaas.js `clientFetchDaAction` resolve.'
    }
  }

  // App

  async start() {
    if(this.state.sessionId && this.state.sessionId.length > 0){
      this.setState({
        isSessionActive: true,
        error: false,
        autoScrollChatPanel: true
      })
    } else {
      // Starts a session
      let res = await this.sessionStart(
        this.state.language,
        this.state.channel,
        this.state.sessionTimeout,
        this.state.startData,
        this.state.sessionId
      )
      // Error
      if(res.error){
        console.warn(res)
        this.setState({
          sessionId: null,
          isSessionActive: false,
          logConsumerName: null,
          error: res.error.response.data.error
        })
        return false
      }
      // start session timeout
      this.setState({
        sessionId: res.response.payload.sessionId,
        isSessionActive: true,
        error: false,
        autoScrollChatPanel: true
      })
      // Kick things off..
      await this.execute('')
    }
    if(!this.isStandalone()){
      // Attach a Log Consumer
      await this.startCapturingLogs()
    }
    return true
  }

  async execute(input, dataAction, dialogEvent, isDTMF) {
    // Executes within a session
    // 5 use cases:
      // 1) user input (text),
      // 2) user input (selectable)
      // 3) data interactions
      // 4) events
      // 5) interpretation (external) - ie DTMF
    let payload = {
      client_data: CLIENT_DATA
    }
    let consideredInput = false
    if(typeof(input) === 'string'){
      if(dataAction){
        payload = {
          requested_data: {
            id: input,
            data: dataAction
          }
        }
      } else {
        payload = {
          user_input: {
            user_text: input
          }
        }
        if(isDTMF){
          payload.user_input.input_mode = 'dtmf'
        }
        consideredInput = true
      }
    } else if(typeof(input) === 'object'){
      if(dialogEvent){
        payload = {
          dialog_event: dialogEvent
        }
      } else if (!isDTMF) {
        payload = {
          user_input: {
            selected_item: input
          }
        }
        consideredInput = true
      } else {
        let iKeys = Object.keys(input)
        let confidences = {}
        let literals = {}
        iKeys.forEach(key => {
          confidences[key] = "1.0"
          literals[key] = input[key]
        })
        payload = {
          user_input: {
            interpretation: {
              confidence: "1.0",
              data: input,
              slot_literals: literals,
              slot_confidences: confidences,
              input_mode: 'dtmf'
            },
          }
        }
        consideredInput = true
      }
    }
    let rawResponses = this.state.rawResponses || []
    rawResponses.unshift({
      request: payload,
    })
    this.setState({
      rawResponses: rawResponses
    })
    if(this.ttsClz){
      this.ttsClz.resetAudio()
    }
    if(consideredInput && this.recoTimeout !== -1){
      clearTimeout(this.recoTimeout)
    }
    let r = await this.sessionExecute(payload)
    rawResponses.unshift(r)
    this.setState({
      rawResponses: rawResponses,
    })
    if(!r.error){
      this.parseResponse(r)
      // Fetch records
      this.doFetchRecords(2000)
    } else {
      console.warn(r.error)
    }
    return false
  }


  async processDataAction(daAction){
    let res = await this.clientFetchDaAction(daAction)
    console.log('client fetch resulted in', res)
    return await this.execute(daAction.id, 
      res.response || {
        'returnCode': 'error.noresponse',
        'returnMessage': JSON.stringify(res.error ? res.error.message : res)
      }
    )
  }

  collectNlgMessages(res){
    let msgs = []
    res.messages.forEach(msgSegments => {
      msgSegments.nlg.forEach(msgSeg => {
        msgs.push(msgSeg)
      })
    })
    ACTION_TYPES.forEach(action => {
      if(res[action] && res[action].message){
        res[action].message.nlg.forEach(msgSeg => {
          msgs.push(msgSeg)
        })
      }
    })
    return msgs
  }

  async playTtsMessage(playStr){
    this.ttsClz.state.accessToken = this.state.accessToken
    this.ttsClz.state.voice = this.state.ttsVoice
    this.ttsClz.state.textInput = playStr
    let req = await this.ttsClz.executeTextInput({
      'x-nuance-dialog-session-id': this.state.sessionId
    })
    this.state.rawResponses.unshift({'tts-request': req.payload})
    this.state.rawResponses.unshift({'tts-response': req.res})
    this.setState({
      rawResponses: this.state.rawResponses
    })
  }

  bindCollectionTimeouts(timeouts){
    if(!timeouts){
      return
    }
    if(!this.state.isSessionActive){
      return
    }
    if(!SIMULATED_EXPERIENCES(this.state.simulateExperience).bindTimeouts){
      return
    }
    let mainTimeout = timeouts.timeout
    let completeTimeout = timeouts.completeTimeout
    let incompleteTimeout = timeouts.incompleteTimeout
    let maxSpeechInput = timeouts.maxSpeechTimeout
    if(this.recoTimeout !== -1){
      clearTimeout(this.recoTimeout)
    }
    this.recoTimeout = setTimeout(() => {
      Promise.resolve().then(() => {
        this.execute(null, false, {
            type: 'NO_INPUT',
            message: `Standard reco timeout kicked in after ${mainTimeout}.`,
        })
      })
    }, parseInt(mainTimeout.substring(0, mainTimeout.length-2))) // chop the `ms`
  }

  parseResponse(res){
    try{
      let dataAction
      let collectionSettings
      const qaAction = res.response.payload.qaAction
      const daAction = res.response.payload.daAction
      const escalationAction = res.response.payload.escalationAction
      const endAction = res.response.payload.endAction
      if(daAction){
        dataAction = daAction
      } else if (escalationAction){
        dataAction = escalationAction
      } else if (endAction){
        console.log(endAction)
        this.stop(true)
      } else if (qaAction){
        collectionSettings = qaAction.recognitionSettings.collectionSettings
      }

      let exp = SIMULATED_EXPERIENCES(this.state.simulateExperience)
      if(exp.playTTS){
        let nlgMessages = this.collectNlgMessages(res.response.payload)
        let promiseChain = Promise.resolve()
        nlgMessages.forEach(msg => {
          promiseChain = promiseChain.then(() => {
            return this.playTtsMessage(msg.text)
          })
        })
        promiseChain = promiseChain.then(() => {
          this.ttsClz.whenAudioEnds(() => {
            if(exp.bindTimeouts){
              this.bindCollectionTimeouts(collectionSettings)
            }
          })
        })
      } else {
        if(collectionSettings){
          this.bindCollectionTimeouts(collectionSettings)
        }
      }

      if(dataAction){
        setTimeout(() => {
          this.processDataAction(dataAction)
        }, 0)
      }
    } catch (ex) {
      console.error('bad response parsing', ex)
    }
  }

  async stop(ended) {
    // Stop the session
    if(this.recoTimeout !== -1){
      clearTimeout(this.recoTimeout)
    }
    if(!ended && this.ttsClz){
      this.ttsClz.resetAudio()
    }
    if(!ended){
      await this.sessionStop()
    }
    this.setState({
      isSessionActive: false,
      autoScrollChatPanel: false
    })
    // this.stopCapturingLogs() // Enable this to reduce requests
    return false
  }

  async restart() {
    // Restart the client.
    this.setState({
      rawResponses: [],
      rawEvents: [],
      sessionId: '',
    })
    if(this.state.logConsumerName){
      await this.destroyConsumer()
    }
    if(this.ttsClz){
      this.ttsClz.resetAudio()
    }
    this.stopCapturingLogs()
    return false
  }

  stopCapturingLogs(){
    if(this.logTimer !== -1){
      window.clearInterval(this.logTimer)
      this.logTimer = -1
      this.setState({
        logConsumerName: null
      })
    }
  }

  onEditStartData(type, item){
    switch(type){
      case 'edit':
      case 'add':
      case 'delete':
        this.setState({
          startData: item.updated_src
        }, this.saveStartDataToLocalStorage)
        break
      default:
        break
    }
  }

  saveStartDataToLocalStorage(){
    window.localStorage.setItem('startData', JSON.stringify(this.state.startData))
  }

  getApiEvents(){
    return this.state.rawEvents.filter(e => e.value.source !== 'NIIEventLogger')
  }

  getLogEvents(){
    const ret = this.state.rawEvents.filter(e => e.value.source === 'NIIEventLogger')
    return ret.sort((a, b) => {
      const _a = parseInt(a.value.data.seqid, 10)
      const _b = parseInt(b.value.data.seqid, 10)
      if(_a < _b){
        return -1
      } else if(_a > _b){
        return 1
      } else {
        return 0
      }
    })
  }

  go(){
    this.start()
  }

  getAuthHtml(){
    return (
      <div className="col-md-6 offset-md-3">
        <Tabs variant="pills"
          defaultActiveKey="dlgaas" transition={false}
          id="noanim-tab-example"
          className="justify-content-center"
          onSelect={this.handleTabSelection.bind(this)}>
          <Tab eventKey="profile" title={`Profile`}></Tab>
          <Tab eventKey="dlgaas" title={`DLGaaS`}>
            <AuthForm tokenError={this.state.tokenError}
                initToken={this.initToken.bind(this)}
                clientId={this.state.clientId}
                clientSecret={this.state.clientSecret}
                onChangeTextInput={this.onChangeTextInput.bind(this)}
                serviceScope="dlg tts log" />
          </Tab>
          <Tab eventKey="nluaas" title={`NLUaaS`}></Tab>
          <Tab eventKey="ttsaas" title={`TTSaaS`}></Tab>
        </Tabs>
      </div>
    )
  }

  addLocationToStartData(){
    let startData = this.state.startData
    this.setState({
      fetchingLocation: true
    })
    navigator.geolocation.getCurrentPosition((pos) => {
      if(!startData.userData){
        startData.userData = {location: {}}
      }
      startData.userData.location = {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude
      }
      let fetchingLocation = false
      this.setState({
        startData,
        fetchingLocation
      }, this.saveStartDataToLocalStorage)
    }, (error) => {
      console.error(error)
      alert('Unable to get location from browser...')
      this.setState({
        fetchingLocation: false
      })
    })
  }

  getScope(){
    return 'dlg tts log'
  }

  getVoiceOptionsHTML(){
    let ret = []
    if(this.state.ttsVoices){
      this.state.ttsVoices.forEach(voice => {
        if(voice.language.startsWith(this.state.language.substring(0,2)) 
            && voice.sampleRateHz === 22050
            && !voice.restricted){
          ret.push(<option key={'opt-'+voice.name+'-'+voice.model} value={voice.name} data-model={voice.model}>{voice.name} ({voice.language})</option>)
        }
      })
    }
    return ret
  }

  onToggleMinMax(minimized){
    
  }

  onLaunchedStandalone(url){
    if(this.state.recoTimeout !== -1){
      clearTimeout(this.state.recoTimeout)
    }
    this.setState({
      isSessionActive: false
    })
  }

  getConfigureSessionHtml(){
    return (
      <div className="">
        <div className="col-12">
          <h3 className="fw-bold text-center w-100 mb-4 mt-3">Start a Bot Session</h3>
          {/*<span className="badge bg-dark text-white mb-3">Token Expiry {moment(this.state.accessToken.expires_at*1000).fromNow()}</span>*/}
          {this.state.error ? (<div className="badge bg-warning text-dark text-left text-wrap mb-3 w-100"><strong>Oops....</strong>{`   `}{this.state.error}</div>) : '' }
          <div className="row">

            <div className={(this.isStandalone() ? `col-12` : `col-10 offset-md-1`) + ` bg-light rounded-3 px-4 py-1 pt-4`}>
              <div className="form-floating">
                <Form.Control 
                  name="simulateExperience"
                  as="select" 
                  className="form-select"
                  value={this.state.simulateExperience} 
                  onChange={this.onChangeSelectInput.bind(this)}>
                  <optgroup label="Visual VA">
                    <option value={'visualVA'}>Visual VA: Text Input with HTML Output</option>
                    <option value={'visualVAwithTts'}>Visual VA: Text Input with HTML &amp; TTS Output</option>
                  </optgroup>
                  <optgroup label="IVR">
                    <option value={'ivrTextWithSSML'}>IVR: Text &amp; DTMF Input with SSML Output</option>
                    <option value={'ivrTextWithTts'}>IVR: Text &amp; DTMF Input with TTS Output (no ASR)</option>
                  </optgroup>
                </Form.Control>
                <Form.Label>Simulate Experience</Form.Label>
              </div>
            </div>

            <div className={(this.isStandalone() ? `col-12` : `col-4 offset-md-1`) + ` bg-light rounded-3 px-4 py-4`}>

              <form className="form" onSubmit={(evt) => {this.go(); evt.preventDefault();}}>
                <h4 className="w-100">Configuration</h4>
                <p>
                  See <a target="_blank" rel="noreferrer" href="https://docs.mix.nuance.com/languages/?src=demo#languages-and-voices">Languages and Voices</a>
                </p>
                {SIMULATED_EXPERIENCES(this.state.simulateExperience).playTTS ? (
                  <div className="form-floating">
                    <Form.Control 
                      name="ttsVoice"
                      as="select" 
                      className="form-select"
                      value={this.state.ttsVoice.name} 
                      onChange={this.onChangeSelectInput.bind(this)}>
                      {this.getVoiceOptionsHTML()}
                    </Form.Control>
                    <Form.Label>TTS Voice</Form.Label>
                  </div>
                  ) : ''}
                <div className="form-floating">
                  <input type="text" className="form-control" name="modelUrn" value={this.state.modelUrn} onChange={this.onChangeTextInput.bind(this)} />
                  <label htmlFor="modelUrn" className="form-label">Model URN</label>
                </div>
                <div className="form-floating">
                  <input disabled={this.state.sessionId.length} type="text" className="form-control" name="language" value={this.state.language} onChange={this.onChangeTextInput.bind(this)} />
                  <label htmlFor="language" className="form-label">Language</label>
                </div>
                <div className="form-floating">
                  <input disabled={this.state.sessionId.length} type="text" className="form-control" name="channel" value={this.state.channel} onChange={this.onChangeTextInput.bind(this)} />
                  <label htmlFor="channel" className="form-label">Channel</label>
                </div>
                <div className="form-floating">
                  <input type="number" className="form-control" name="sessionTimeout" value={this.state.sessionTimeout} onChange={this.onChangeTextInput.bind(this)} />
                  <label htmlFor="sessionTimeout" className="form-label">Session Timeout (s)</label>
                </div>
                <br/>
                <div className="form-floating">
                  <input type="text" className="form-control" name="sessionId" value={this.state.sessionId} onChange={this.onChangeTextInput.bind(this)} />
                  <label htmlFor="sessionId" className="form-label">Session ID <span className='text-muted'>(optional)</span></label>
                </div>
                <div className="form-group mt-3">
                  <button className="btn btn-primary d-flex justify-content-center w-100 text-center" type="submit">
                    {this.state.sessionId.length ? 'Resume Session' : 'Start New Session'}
                  </button>
                </div>
              </form>
            </div>
            <div className={(this.isStandalone() ? `col-12` : `col-6`) + ` bg-light rounded-3 px-4 py-4`}>
                <div className="form-floating">
                  <h4 className="mb-2">
                    Start Data
                  </h4>
                  { navigator.geolocation ? (
                      <div className="d-flex w-100 pb-3">
                        <button disabled={this.state.fetchingLocation} className="btn btn-outline-primary btn-sm" onClick={this.addLocationToStartData.bind(this)}>
                          { this.state.fetchingLocation ? 'Getting location...' : 'Add Client Location' }
                        </button>
                      </div>
                    ) : ('') }
                  <ReactJson
                    key={'json-startData'}
                    src={this.state.startData}
                    displayDataTypes={true}
                    displayObjectSize={true}
                    collapsed={false}
                    name={`startData`}
                    theme={`grayscale:inverted`}
                    sortKeys={true}
                    onEdit={(edit) => { this.onEditStartData('edit', edit); }}
                    onAdd={(add) => { this.onEditStartData('add', add); }}
                    onDelete={(del) => { this.onEditStartData('delete', del); }}>
                  </ReactJson>
                  
                </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  getChatResponses(){
    return this.state.rawResponses.filter(res => {
      let keys = Object.keys(res)
      return keys.indexOf('tts-request') === -1 &&
             keys.indexOf('tts-response') === -1
    })
  }

  getBotSessionHtml(){
    const logEvents = this.getLogEvents()
    const apiEvents = this.getApiEvents()
    const chatResponses = this.getChatResponses()
    return (
      <div className="col">
        <div className="row">
          <div className="col-8">
            <h3 className="fw-bold">Converse and Troubleshoot</h3>
            <span className="badge bg-light text-dark mb-3">Token Expiry {moment(this.state.accessToken.expires_at*1000).fromNow()}</span>
            {` `}
            <span className="badge bg-light text-dark mb-3">Session ID: <strong id="dlgaas-session-id">{this.state.sessionId}</strong></span>
            {` `}
          </div>
          <div className="col-4 text-end">
            { this.state.isSessionActive && this.state.sessionId.length > 0 ? (
                <button className="btn btn-danger float-end mt-3" onClick={(evt) => {this.stop(); evt.preventDefault(); }}>Stop Session</button>
              ) : (
                <button className="btn btn-warning float-end mt-3" onClick={(evt) => {this.restart(); evt.preventDefault(); }}>New Session</button>
              )
            }
            {` `}
            { this.state.logConsumerName ? (
                <Button className="text-dark mt-3"
                  variant={`light`}
                  onClick={(evt) => {this.doFetchRecords(0); evt.preventDefault(); }}
                  disabled={this.state.fetchRecordsTimeout !== -1}>
                  Fetch Log Events{` `}
                  {this.state.fetchRecordsTimeout !== -1 ? (
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  ) : ''}
                </Button>
              ) : ('')}
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-12">
            <DlgTabs
              simulateExperience={this.state.simulateExperience}
              logEvents={logEvents}
              apiEvents={apiEvents}
              rawResponses={this.state.rawResponses}
            />
          </div>
          <div className={`col-3 float-end`}>
            <ChatPanel
              simulateExperience={this.state.simulateExperience}
              onLaunchedStandalone={this.onLaunchedStandalone.bind(this)}
              onExecute={this.execute.bind(this)}
              rawResponses={chatResponses}
              autoScrollChatPanel={this.state.autoScrollChatPanel}
              width={365}
              height={window.innerHeight-250}
              sessionTimeout={this.state.sessionTimeout}
              sessionId={this.state.sessionId}
              active={this.state.isSessionActive}
              onSessionTimeoutEnded={this.stop.bind(this)}
              onToggleMinMax={this.onToggleMinMax.bind(this)}/>
          </div>
        </div>
      </div>
    )
  }

  render(){
    return (
      <div className="row">
        {
          this.state.accessToken ? (
          this.state.sessionId && (this.state.isSessionActive || this.state.rawResponses.length) ?
          this.getBotSessionHtml() :
          this.getConfigureSessionHtml()) :
          this.getAuthHtml()
        }
      </div>
    )
  }
}
