// This is your new function. To start, set the name and path on the left.

exports.handler = function(context, event, callback) {
    // Here's an example of setting up some TWiML to respond to with this function
      let twiml = new Twilio.twiml.VoiceResponse();
    twiml.say('Something went wrong!');
    twiml.hangup();
    
    return callback(null, twiml);
  };