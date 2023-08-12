const Call = require('./callModel'); // Use require for importing
const express = require('express');
const cors = require('cors'); // Import the CORS middleware
const bodyParser = require('body-parser');

const app = express();
const port = 8080;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Parse JSON in the request body

const mongoose = require('mongoose');

const connectionString = 'mongodb://localhost:27017/calls';

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
          res.redirect('https://turingtechbackendtest-6556.twil.io/end_message');
        })
        .catch(error => {
          console.error('Error saving call data:', error);
          res.redirect('https://turingtechbackendtest-6556.twil.io/error');
        });
    } catch (error) {
      console.error('Error parsing call data:', error);
      res.redirect('https://turingtechbackendtest-6556.twil.io/error');
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
          res.redirect('<your_twilo_function_url_without_route>/end_message');
        })
        .catch(error => {
          console.error('Error saving recording data:', error);
          res.redirect('<your_twilo_function_url_without_route>/error');
        })
    } catch (error) {
      console.error('Error parsing recording data:', error);
      res.redirect('<your_twilo_function_url_without_route>/error');
    }
  });


  



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
