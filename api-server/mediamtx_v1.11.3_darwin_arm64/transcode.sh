#!/bin/bash

# Convert RTSP to HLS
# ffmpeg -i rtsp://127.0.0.1:8554/$1 \
#   -c:v libx264 -preset ultrafast -tune zerolatency \
#   -c:a aac -strict experimental \
#   -f hls -hls_time 2 -hls_list_size 3 -hls_flags delete_segments \
#   -hls_segment_filename "live/%v_%03d.ts" \
#   live/$1.m3u8

# ffmpeg -i rtsp://192.168.0.121:8554/$1 \
#   -c:v libx264 -preset ultrafast -tune zerolatency \
#   -profile:v baseline -level 3.1 -pix_fmt yuv420p \
#   -c:a aac -strict experimental \
#   -f hls -hls_time 2 -hls_list_size 3 -hls_flags delete_segments \
#   -hls_segment_filename "live/%v_%03d.ts" \
#   live/$1.m3u8

ffmpeg -i "rtsp://atonu:Onvif%232023@192.168.0.184/cam/realmonitor?channel=4&subtype=1&unicast=true&proto=Onvif" \
  -c:v libx264 -preset ultrafast -tune zerolatency \
  -c:a aac -strict experimental \
  -f hls -hls_time 2 -hls_list_size 3 -hls_flags delete_segments \
  -hls_segment_filename "live/%v_%03d.ts" \
  live/$1.m3u8


  # rtsp://atonu:Onvif%232023@192.168.0.184/cam/realmonitor?channel=4&subtype=0&unicast=true&proto=Onvif



# logo scroll 
# comments in the code
# push code on github


# ffmpeg -f lavfi -i testsrc=duration=60:size=640x480:rate=30 \
#   -c:v libx264 -preset ultrafas`t -tune zerolatency \
#   -profile:v baseline -level:v 3.1 \
#   -pix_fmt yuv420p \
#   -c:a aac -b:a 128k \
#   input1.mp4