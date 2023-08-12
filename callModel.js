const mongoose = require('mongoose');

const callSchema = new mongoose.Schema({
  AccountSid: String,
  CallSid: String,
  CallStatus: String,
  Called: String,
  Caller: String,
  // ... other fields ...

  // Additional properties for Dial call
  DialBridged: Boolean,
  DialCallDuration: String,
  DialCallSid: String,
  DialCallStatus: String,

  // Additional properties for Recording
  Digits: String,
  RecordingDuration: String,
  RecordingSid: String,
  RecordingUrl: String,
});

const Call = mongoose.model('Call', callSchema);

module.exports = Call;