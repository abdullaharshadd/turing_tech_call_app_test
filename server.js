const Call = require('./callModel'); // Use require for importing
const express = require('express');
const cors = require('cors'); // Import the CORS middleware
const bodyParser = require('body-parser');

const app = express();
const port = 8080;

const mongodbUrl = process.env.MONGODB_URL;
const twilio_base_url = process.env.TWILIO_BASE_URL;


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Parse JSON in the request body

const mongoose = require('mongoose');

const connectionString = mongodbUrl + '/calls';

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = db;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post('/handle_call', (req, res) => {
    try {
      const callData = req.body;
  
      // Create a new instance of the Call model using callData
      const call = new Call(callData);
  
      // Save the call data to the database
      call.save()
        .then(savedCall => {
          console.log('Call data saved:', savedCall);
          res.redirect(twilio_base_url + '/end_message');
        })
        .catch(error => {
          console.error('Error saving call data:', error);
          res.redirect(twilio_base_url + '/error');
        });
    } catch (error) {
      console.error('Error parsing call data:', error);
      res.redirect(twilio_base_url + '/error');
    }
  });  

  app.get('/all_calls', async (req, res) => {
    try {
      const calls = await Call.find(); // Retrieve all calls from the collection
      res.json(calls);
    } catch (error) {
      console.error('Error fetching calls:', error);
      res.status(500).send('Internal server error');
    }
  });


  app.post('/handle_recording', (req, res) => {
    try {
      const recordingData = req.body;
  
      // Create a new instance of the Call model using recordingData
      const call = new Call(recordingData);
  
      // Save the call data to the database
      call.save()
        .then(savedCall => {
          console.log('Recording data saved:', savedCall);
          res.redirect(twilio_base_url + '/end_message');
        })
        .catch(error => {
          console.error('Error saving recording data:', error);
          res.redirect(twilio_base_url + '/error');
        })
    } catch (error) {
      console.error('Error parsing recording data:', error);
      res.redirect(twilio_base_url + '/error');
    }
  });


  



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
