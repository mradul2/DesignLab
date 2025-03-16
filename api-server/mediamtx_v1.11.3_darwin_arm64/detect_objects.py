import cv2
import numpy as np
import subprocess

# Load YOLOv3-tiny model
net = cv2.dnn.readNet("yolov3-tiny.weights", "yolov3-tiny.cfg")
classes = []
with open("coco.names", "r") as f:
    classes = [line.strip() for line in f.readlines()]

# Corrected output layer handling for OpenCV 4.5.3+
layer_names = net.getLayerNames()

# First option: Direct index access (for OpenCV versions returning indices)
output_layers = [layer_names[i - 1] for i in net.getUnconnectedOutLayers()]

def detect_humans(frame):
    height, width = frame.shape[:2]
    blob = cv2.dnn.blobFromImage(frame, 0.00392, (416, 416), (0, 0, 0), True, crop=False)
    net.setInput(blob)
    outs = net.forward(output_layers)

    # Process detections
    for out in outs:
        for detection in out:
            scores = detection[5:]
            class_id = np.argmax(scores)
            confidence = scores[class_id]
            if class_id == 0 and confidence > 0.5:  # Class 0 is person
                center_x = int(detection[0] * width)
                center_y = int(detection[1] * height)
                w = int(detection[2] * width)
                h = int(detection[3] * height)
                x = int(center_x - w/2)
                y = int(center_y - h/2)
                cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)
                cv2.putText(frame, f"Person {confidence:.2f}", (x, y-5), 
                           cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0,255,0), 2)
    return frame

# FFmpeg pipeline setup
rtsp_url = "rtsp://atonu:Onvif%232023@192.168.0.184/cam/realmonitor?channel=4&subtype=0&unicast=true&proto=Onvif"
cap = cv2.VideoCapture(rtsp_url)

# Get video properties
fps = int(cap.get(cv2.CAP_PROP_FPS))
width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

# FFmpeg HLS output command
ffmpeg_cmd = [
    'ffmpeg',
    '-y',
    '-f', 'rawvideo',
    '-vcodec','rawvideo',
    '-pix_fmt', 'bgr24',
    '-s', f'{width}x{height}',
    '-r', str(fps),
    '-i', '-',
    '-c:v', 'libx264',
    '-preset', 'ultrafast',
    '-tune', 'zerolatency',
    '-f', 'hls',
    "-x264-params", "keyint=60:min-keyint=30",  # Force regular keyframes,
        "-pix_fmt", "yuv420p",  # Mandatory for Android
    '-hls_time', '2',
    '-hls_list_size', '3',
    '-hls_flags', 'delete_segments',
    '-hls_segment_filename', 'live/cam1_%03d.ts',
    'live/cam1.m3u8'
]

process = subprocess.Popen(ffmpeg_cmd, stdin=subprocess.PIPE)

while True:
    ret, frame = cap.read()
    if not ret:
        break
    
    frame = detect_humans(frame)
    process.stdin.write(frame.tobytes())

cap.release()
process.stdin.close()
process.wait()
