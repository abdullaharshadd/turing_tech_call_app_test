exports.handler = function(context, event, callback) {
    const twiml = new Twilio.twiml.VoiceResponse();
  
    // Check if the user has provided input
    if (event.Digits) {
      const userChoice = event.Digits;
  
      // Define messages for different options
      const messages = {
        '1': 'You are being connected to a customer support agent.',
        '2': 'Please leave your voice message after the beep. After you have recorded your message, press # to indicate you are done recording.',
        'invalid': 'Sorry, that\'s an invalid option. Please try again.',
        'thankYou': 'Thank you for calling. Have a nice day.'
      };
  
      if (userChoice === '1') {
        twiml.say(messages['1']);
  
        const dial = twiml.dial({
            action: '<your_ngrok_url_here>/handle_call', // Replace with your server's endpoint
            method: 'POST'
          }, '<your_verified_number_here>');
  
      } else if (userChoice === '2') {
        twiml.say(messages['2']);
        twiml.record({
          maxLength: 30,
          action: '<your_ngrok_url_here>/handle_recording', // Replace with your server's endpoint
          method: 'POST',
          finishOnKey: '#' // Press '#' to indicate end of recording
        });
  
      } else {
        twiml.say(messages['invalid']);
        const gather = twiml.gather({
          numDigits: 1, // Gather a single digit
          timeout: 10 // Wait for user input for up to 10 seconds
        });
        gather.say('Sorry, that\'s an invalid option. Please try again.');
      }
  
      // Return the TwiML response with the menu or thank you message and hang up
      return callback(null, twiml);
    }
  
    // If user hasn't provided input, play the menu prompt
    const gather = twiml.gather({
      numDigits: 1, // Gather a single digit
      timeout: 10 // Wait for user input for up to 10 seconds
    });
  
    gather.say('Welcome to our service. Press 1 to talk to the customer support agent.');
    gather.say('Press 2 to record your voice message.');
  
    // Return the TwiML response with the menu
    return callback(null, twiml);
    
  };