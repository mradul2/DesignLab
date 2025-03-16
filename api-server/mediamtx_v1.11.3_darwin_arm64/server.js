const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const fs = require('fs');
const twilio = require('twilio');


// Enable CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'DELETE', 'POST'],
  allowedHeaders: ['Content-Type'],
  // exposedHeaders: ['Content-Length', 'HLS-Stream-URL']  // Add this
}));

app.use(express.json()); // <-- This was missing

TWILIO_ACCOUNT_SID = "ACcdc0954e23d346628a728887750786a6"
TWILIO_AUTH_TOKEN = "863b41146d4c08243e27f6ff14cf0863"
TWILIO_PHONE_NUMBER = "+13344182629"

// Twilio Configuration
const client = twilio(
  TWILIO_ACCOUNT_SID, 
  TWILIO_AUTH_TOKEN
);

// Contacts Storage
const contactsFile = 'contacts.json';

// Load contacts
const loadContacts = () => {
  try {
    return JSON.parse(fs.readFileSync(contactsFile));
  } catch (err) {
    return [];
  }
};

// SMS Alert Endpoint
app.post('/api/send-alert', async (req, res) => {
  try {
    const contacts = loadContacts();
    const message = `🚨 Security Alert: Person detected at ${new Date().toLocaleString()}. Check your app for details.`;
    
    await Promise.all(contacts.map(contact =>
      client.messages.create({
        body: message,
        from: TWILIO_PHONE_NUMBER,
        to: `+${contact.phone}`
      })
    ));

    res.status(200).send('Alerts sent');
  } catch (err) {
    console.error('SMS Error:', err);
    res.status(500).send('Failed to send alerts');
  }
});

// Contacts API Endpoints
app.get('/api/contacts', (req, res) => res.json(loadContacts()));

app.post('/api/contacts', (req, res) => {
  const contacts = loadContacts();
  const newContact = {
    id: Date.now().toString(),
    phone: req.body.phone.replace(/\D/g, '')
  };
  
  fs.writeFileSync(contactsFile, JSON.stringify([...contacts, newContact]));
  res.json(newContact);
});

app.delete('/api/contacts/:id', (req, res) => {
  const contacts = loadContacts().filter(c => c.id !== req.params.id);
  fs.writeFileSync(contactsFile, JSON.stringify(contacts));
  res.sendStatus(204);
});




// Gallery images directory
const galleryDir = '/Users/mradulagrawal/Desktop/design-lab/my-app/api-server/mediamtx_v1.11.3_darwin_arm64/gallery'



// Get all gallery images
app.get('/api/gallery', (req, res) => {
  // console.log('Gallery request received');
  // console.log('Attempting to read gallery directory:', galleryDir);
  
  fs.readdir(galleryDir, (err, files) => {
    if (err) {
      console.error('Gallery directory read error:', err);
      return res.status(500).json({ 
        error: 'Gallery directory error',
        details: err.message 
      });
    }

    // console.log('Found files:', files);
    
    const images = files
      .filter(f => {
        const isValid = f.endsWith('.jpg');
        if (!isValid) console.log('Skipping non-JPG file:', f);
        return isValid;
      })
      .map(f => {
        try {
          const [timestamp, camera] = f.split('_');
          console.log('Processing file:', f, 'Parsed:', { timestamp, camera });
          
          return {
            id: f.replace('.jpg', ''),
            url: `http://192.168.0.121:3000/gallery/${f}`,
            timestamp: new Date(parseInt(timestamp) * 1000).toISOString(),
            camera: camera.replace('cam', 'Camera ')
          };
        } catch (parseError) {
          console.error('Error parsing filename:', f, parseError);
          return null;
        }
      })
      .filter(Boolean)
      .sort((a, b) => b.timestamp.localeCompare(a.timestamp));

    // console.log('Sending images:', images);
    res.json(images);
  });
});

// Delete an image
app.delete('/api/gallery/:id', (req, res) => {
  const filePath = path.join(galleryDir, `${req.params.id}.jpg`);
  
  fs.unlink(filePath, (err) => {
    if (err) {
      return res.status(404).json({ error: 'Image not found' });
    }
    res.sendStatus(204);
  });
});

// Serve gallery images
app.use('/gallery', express.static(galleryDir));

// Dummy camera data
const cameras = [
  {
    id: 'cam1',
    name: 'Entrance Camera',
    hlsUrl: 'http://192.168.0.121:3000/live/cam1.m3u8',
    rtspUrl: 'rtsp://192.168.0.121:8554/cam1',
    features: ['human-detection']  // New field for mobile UI
  },
  {
    id: 'cam2',
    name: 'Parking Camera',
    hlsUrl: 'http://192.168.0.121:3000/live/cam2.m3u8',
    rtspUrl: 'rtsp://192.168.0.121:8554/cam2'
  }
];

// API Endpoints
app.get('/api/streams', (req, res) => {
  res.json(cameras);
});

app.get('/api/streams/:id', (req, res) => {
  const camera = cameras.find(c => c.id === req.params.id);
  res.json(camera || { error: 'Camera not found' });
  // res.json(camera || { error: id });
});

app.listen(port, '0.0.0.0', () => { // Bind to all interfaces
  console.log(`API server running at http://0.0.0.0:${port}`);
});

app.use('/live', express.static('live'));

// // Start server
// app.listen(port, () => {
//   console.log(`API server running at http://127.0.0.1:${port}`);
// });