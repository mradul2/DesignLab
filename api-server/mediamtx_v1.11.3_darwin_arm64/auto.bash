#!/bin/bash

# Start RTSP server
./mediamtx &

# Wait for server startup
sleep 2
node server.js &

# Start HLS transcoding
ffmpeg -i rtsp://10.145.5.117:8554/cam1 \
  -c:v copy -c:a aac \
  -f hls -hls_time 2 -hls_list_size 3 \
  live/cam1.m3u8 &

ffmpeg -i rtsp://127.0.0.1:8554/cam2 \
  -c:v copy -c:a aac \
  -f hls -hls_time 2 -hls_list_size 3 \
  live/cam2.m3u8 &
