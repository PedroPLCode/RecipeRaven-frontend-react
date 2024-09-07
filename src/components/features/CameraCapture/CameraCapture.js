import React, { useRef, useState, useEffect } from 'react';

function CameraCapture() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      })
      .catch(err => {
        console.error("Error accessing the camera", err);
      });
  }, []);

  const takePicture = () => {
    const width = videoRef.current.videoWidth;
    const height = videoRef.current.videoHeight;

    canvasRef.current.width = width;
    canvasRef.current.height = height;

    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, width, height);

    const dataUrl = canvasRef.current.toDataURL('image/png');
    setPhoto(dataUrl);
  };

  return (
    <div>
      <h1>Capture a photo from your webcam</h1>
      <div>
        <video ref={videoRef} style={{ width: '100%', maxWidth: '600px' }}></video>
      </div>
      <button onClick={takePicture}>Take Picture</button>
      <div>
        <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
        {photo && (
          <div>
            <h2>Your Photo:</h2>
            <img src={photo} alt="Captured" style={{ width: '100%', maxWidth: '600px' }} />
          </div>
        )}
      </div>
    </div>
  );
}

export default CameraCapture;