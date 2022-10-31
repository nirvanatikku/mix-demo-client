// source: nuance/rpc/status.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require('google-protobuf');
var goog = jspb;
var global = (function() { return this || window || global || self || Function('return this')(); }).call(null);

var nuance_rpc_status_code_pb = require('../../nuance/rpc/status_code_pb.js');
goog.object.extend(proto, nuance_rpc_status_code_pb);
var nuance_rpc_error_details_pb = require('../../nuance/rpc/error_details_pb.js');
goog.object.extend(proto, nuance_rpc_error_details_pb);
goog.exportSymbol('proto.nuance.rpc.Status', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.nuance.rpc.Status = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.nuance.rpc.Status.repeatedFields_, null);
};
goog.inherits(proto.nuance.rpc.Status, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.nuance.rpc.Status.displayName = 'proto.nuance.rpc.Status';
}

/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.nuance.rpc.Status.repeatedFields_ = [7,9];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.nuance.rpc.Status.prototype.toObject = function(opt_includeInstance) {
  return proto.nuance.rpc.Status.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.nuance.rpc.Status} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.nuance.rpc.Status.toObject = function(includeInstance, msg) {
  var f, obj = {
    statusCode: jspb.Message.getFieldWithDefault(msg, 1, 0),
    statusSubCode: jspb.Message.getFieldWithDefault(msg, 2, 0),
    httpTransCode: jspb.Message.getFieldWithDefault(msg, 3, 0),
    requestInfo: (f = msg.getRequestInfo()) && nuance_rpc_error_details_pb.RequestInfo.toObject(includeInstance, f),
    statusMessage: (f = msg.getStatusMessage()) && nuance_rpc_error_details_pb.LocalizedMessage.toObject(includeInstance, f),
    helpInfo: (f = msg.getHelpInfo()) && nuance_rpc_error_details_pb.HelpInfo.toObject(includeInstance, f),
    fieldViolationsList: jspb.Message.toObjectList(msg.getFieldViolationsList(),
    nuance_rpc_error_details_pb.FieldViolation.toObject, includeInstance),
    retryInfo: (f = msg.getRetryInfo()) && nuance_rpc_error_details_pb.RetryInfo.toObject(includeInstance, f),
    statusDetailsList: jspb.Message.toObjectList(msg.getStatusDetailsList(),
    nuance_rpc_error_details_pb.StatusDetail.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.nuance.rpc.Status}
 */
proto.nuance.rpc.Status.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.nuance.rpc.Status;
  return proto.nuance.rpc.Status.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.nuance.rpc.Status} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.nuance.rpc.Status}
 */
proto.nuance.rpc.Status.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.nuance.rpc.StatusCode} */ (reader.readEnum());
      msg.setStatusCode(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setStatusSubCode(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setHttpTransCode(value);
      break;
    case 4:
      var value = new nuance_rpc_error_details_pb.RequestInfo;
      reader.readMessage(value,nuance_rpc_error_details_pb.RequestInfo.deserializeBinaryFromReader);
      msg.setRequestInfo(value);
      break;
    case 5:
      var value = new nuance_rpc_error_details_pb.LocalizedMessage;
      reader.readMessage(value,nuance_rpc_error_details_pb.LocalizedMessage.deserializeBinaryFromReader);
      msg.setStatusMessage(value);
      break;
    case 6:
      var value = new nuance_rpc_error_details_pb.HelpInfo;
      reader.readMessage(value,nuance_rpc_error_details_pb.HelpInfo.deserializeBinaryFromReader);
      msg.setHelpInfo(value);
      break;
    case 7:
      var value = new nuance_rpc_error_details_pb.FieldViolation;
      reader.readMessage(value,nuance_rpc_error_details_pb.FieldViolation.deserializeBinaryFromReader);
      msg.addFieldViolations(value);
      break;
    case 8:
      var value = new nuance_rpc_error_details_pb.RetryInfo;
      reader.readMessage(value,nuance_rpc_error_details_pb.RetryInfo.deserializeBinaryFromReader);
      msg.setRetryInfo(value);
      break;
    case 9:
      var value = new nuance_rpc_error_details_pb.StatusDetail;
      reader.readMessage(value,nuance_rpc_error_details_pb.StatusDetail.deserializeBinaryFromReader);
      msg.addStatusDetails(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.nuance.rpc.Status.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.nuance.rpc.Status.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.nuance.rpc.Status} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.nuance.rpc.Status.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStatusCode();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
      f
    );
  }
  f = message.getStatusSubCode();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
  f = message.getHttpTransCode();
  if (f !== 0) {
    writer.writeInt32(
      3,
      f
    );
  }
  f = message.getRequestInfo();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      nuance_rpc_error_details_pb.RequestInfo.serializeBinaryToWriter
    );
  }
  f = message.getStatusMessage();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      nuance_rpc_error_details_pb.LocalizedMessage.serializeBinaryToWriter
    );
  }
  f = message.getHelpInfo();
  if (f != null) {
    writer.writeMessage(
      6,
      f,
      nuance_rpc_error_details_pb.HelpInfo.serializeBinaryToWriter
    );
  }
  f = message.getFieldViolationsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      7,
      f,
      nuance_rpc_error_details_pb.FieldViolation.serializeBinaryToWriter
    );
  }
  f = message.getRetryInfo();
  if (f != null) {
    writer.writeMessage(
      8,
      f,
      nuance_rpc_error_details_pb.RetryInfo.serializeBinaryToWriter
    );
  }
  f = message.getStatusDetailsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      9,
      f,
      nuance_rpc_error_details_pb.StatusDetail.serializeBinaryToWriter
    );
  }
};


/**
 * optional StatusCode status_code = 1;
 * @return {!proto.nuance.rpc.StatusCode}
 */
proto.nuance.rpc.Status.prototype.getStatusCode = function() {
  return /** @type {!proto.nuance.rpc.StatusCode} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {!proto.nuance.rpc.StatusCode} value
 * @return {!proto.nuance.rpc.Status} returns this
 */
proto.nuance.rpc.Status.prototype.setStatusCode = function(value) {
  return jspb.Message.setProto3EnumField(this, 1, value);
};


/**
 * optional int32 status_sub_code = 2;
 * @return {number}
 */
proto.nuance.rpc.Status.prototype.getStatusSubCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.nuance.rpc.Status} returns this
 */
proto.nuance.rpc.Status.prototype.setStatusSubCode = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional int32 http_trans_code = 3;
 * @return {number}
 */
proto.nuance.rpc.Status.prototype.getHttpTransCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.nuance.rpc.Status} returns this
 */
proto.nuance.rpc.Status.prototype.setHttpTransCode = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional RequestInfo request_info = 4;
 * @return {?proto.nuance.rpc.RequestInfo}
 */
proto.nuance.rpc.Status.prototype.getRequestInfo = function() {
  return /** @type{?proto.nuance.rpc.RequestInfo} */ (
    jspb.Message.getWrapperField(this, nuance_rpc_error_details_pb.RequestInfo, 4));
};


/**
 * @param {?proto.nuance.rpc.RequestInfo|undefined} value
 * @return {!proto.nuance.rpc.Status} returns this
*/
proto.nuance.rpc.Status.prototype.setRequestInfo = function(value) {
  return jspb.Message.setWrapperField(this, 4, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.nuance.rpc.Status} returns this
 */
proto.nuance.rpc.Status.prototype.clearRequestInfo = function() {
  return this.setRequestInfo(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.nuance.rpc.Status.prototype.hasRequestInfo = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional LocalizedMessage status_message = 5;
 * @return {?proto.nuance.rpc.LocalizedMessage}
 */
proto.nuance.rpc.Status.prototype.getStatusMessage = function() {
  return /** @type{?proto.nuance.rpc.LocalizedMessage} */ (
    jspb.Message.getWrapperField(this, nuance_rpc_error_details_pb.LocalizedMessage, 5));
};


/**
 * @param {?proto.nuance.rpc.LocalizedMessage|undefined} value
 * @return {!proto.nuance.rpc.Status} returns this
*/
proto.nuance.rpc.Status.prototype.setStatusMessage = function(value) {
  return jspb.Message.setWrapperField(this, 5, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.nuance.rpc.Status} returns this
 */
proto.nuance.rpc.Status.prototype.clearStatusMessage = function() {
  return this.setStatusMessage(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.nuance.rpc.Status.prototype.hasStatusMessage = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional HelpInfo help_info = 6;
 * @return {?proto.nuance.rpc.HelpInfo}
 */
proto.nuance.rpc.Status.prototype.getHelpInfo = function() {
  return /** @type{?proto.nuance.rpc.HelpInfo} */ (
    jspb.Message.getWrapperField(this, nuance_rpc_error_details_pb.HelpInfo, 6));
};


/**
 * @param {?proto.nuance.rpc.HelpInfo|undefined} value
 * @return {!proto.nuance.rpc.Status} returns this
*/
proto.nuance.rpc.Status.prototype.setHelpInfo = function(value) {
  return jspb.Message.setWrapperField(this, 6, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.nuance.rpc.Status} returns this
 */
proto.nuance.rpc.Status.prototype.clearHelpInfo = function() {
  return this.setHelpInfo(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.nuance.rpc.Status.prototype.hasHelpInfo = function() {
  return jspb.Message.getField(this, 6) != null;
};


/**
 * repeated FieldViolation field_violations = 7;
 * @return {!Array<!proto.nuance.rpc.FieldViolation>}
 */
proto.nuance.rpc.Status.prototype.getFieldViolationsList = function() {
  return /** @type{!Array<!proto.nuance.rpc.FieldViolation>} */ (
    jspb.Message.getRepeatedWrapperField(this, nuance_rpc_error_details_pb.FieldViolation, 7));
};


/**
 * @param {!Array<!proto.nuance.rpc.FieldViolation>} value
 * @return {!proto.nuance.rpc.Status} returns this
*/
proto.nuance.rpc.Status.prototype.setFieldViolationsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 7, value);
};


/**
 * @param {!proto.nuance.rpc.FieldViolation=} opt_value
 * @param {number=} opt_index
 * @return {!proto.nuance.rpc.FieldViolation}
 */
proto.nuance.rpc.Status.prototype.addFieldViolations = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 7, opt_value, proto.nuance.rpc.FieldViolation, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.nuance.rpc.Status} returns this
 */
proto.nuance.rpc.Status.prototype.clearFieldViolationsList = function() {
  return this.setFieldViolationsList([]);
};


/**
 * optional RetryInfo retry_info = 8;
 * @return {?proto.nuance.rpc.RetryInfo}
 */
proto.nuance.rpc.Status.prototype.getRetryInfo = function() {
  return /** @type{?proto.nuance.rpc.RetryInfo} */ (
    jspb.Message.getWrapperField(this, nuance_rpc_error_details_pb.RetryInfo, 8));
};


/**
 * @param {?proto.nuance.rpc.RetryInfo|undefined} value
 * @return {!proto.nuance.rpc.Status} returns this
*/
proto.nuance.rpc.Status.prototype.setRetryInfo = function(value) {
  return jspb.Message.setWrapperField(this, 8, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.nuance.rpc.Status} returns this
 */
proto.nuance.rpc.Status.prototype.clearRetryInfo = function() {
  return this.setRetryInfo(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.nuance.rpc.Status.prototype.hasRetryInfo = function() {
  return jspb.Message.getField(this, 8) != null;
};


/**
 * repeated StatusDetail status_details = 9;
 * @return {!Array<!proto.nuance.rpc.StatusDetail>}
 */
proto.nuance.rpc.Status.prototype.getStatusDetailsList = function() {
  return /** @type{!Array<!proto.nuance.rpc.StatusDetail>} */ (
    jspb.Message.getRepeatedWrapperField(this, nuance_rpc_error_details_pb.StatusDetail, 9));
};


/**
 * @param {!Array<!proto.nuance.rpc.StatusDetail>} value
 * @return {!proto.nuance.rpc.Status} returns this
*/
proto.nuance.rpc.Status.prototype.setStatusDetailsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 9, value);
};


/**
 * @param {!proto.nuance.rpc.StatusDetail=} opt_value
 * @param {number=} opt_index
 * @return {!proto.nuance.rpc.StatusDetail}
 */
proto.nuance.rpc.Status.prototype.addStatusDetails = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 9, opt_value, proto.nuance.rpc.StatusDetail, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.nuance.rpc.Status} returns this
 */
proto.nuance.rpc.Status.prototype.clearStatusDetailsList = function() {
  return this.setStatusDetailsList([]);
};


goog.object.extend(exports, proto.nuance.rpc);
