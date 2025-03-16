const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;



// Enable CORS
app.use(cors({
  origin: '*',
  methods: ['GET'],
  allowedHeaders: ['Content-Type'],
  // exposedHeaders: ['Content-Length', 'HLS-Stream-URL']  // Add this
}));

// Dummy camera data
const cameras = [
  {
    id: 'cam1',
    name: 'Entrance Camera',
    hlsUrl: 'http://192.168.0.121:3000/live/cam1.m3u8',
    rtspUrl: 'rtsp://192.168.0.121:8554/cam1'
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