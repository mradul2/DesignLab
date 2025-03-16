#!/bin/bash

# Convert RTSP to HLS
ffmpeg -i rtsp://localhost:8554/$1 \
  -c:v copy -c:a aac \
  -f hls -hls_time 4 -hls_list_size 6 -hls_flags delete_segments \
  -hls_segment_filename "live/%v_%03d.ts" \
  live/$1.m3u8