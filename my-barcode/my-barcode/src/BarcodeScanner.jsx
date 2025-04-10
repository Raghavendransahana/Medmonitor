import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

const BarcodeScanner = () => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [extractedNumber, setExtractedNumber] = useState(null);
  const [databaseStatus, setDatabaseStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      setCapturedImage(imageSrc);
      console.log('Image captured successfully!');
      sendImageToBackend(imageSrc);
    } else {
      console.error('Failed to capture image.');
      setErrorMessage('Failed to capture image.');
    }
  };

  const sendImageToBackend = async (imageSrc) => {
    try {
      setExtractedNumber(null);
      setDatabaseStatus(null);
      setErrorMessage(null);

      const blob = await fetch(imageSrc).then((res) => res.blob());
      const formData = new FormData();
      formData.append('image', blob, 'capturedImage.jpg');

      const response = await fetch('http://localhost:3001/decode-barcode', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Backend response:', data);

      if (data.extractedNumber) {
        setExtractedNumber(data.extractedNumber);
        setDatabaseStatus(
          data.status === 'exists'
            ? 'Medicine is good to use!!'
            : data.status === 'not_found'
            ? 'Medicine is counterfeit'
            : 'Unknown database response.'
        );
      } else {
        setErrorMessage('No number detected in the image.');
      }
    } catch (error) {
      console.error('Error communicating with backend:', error);
      setErrorMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif', background: 'linear-gradient(to bottom, #e3f2fd, #ffffff)', minHeight: '100vh', padding: '20px' }}>
      <h1 style={{ color: '#1976d2' }}>Barcode Scanner</h1>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={400}
        style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}
      />
      <button
        onClick={capture}
        style={{
          marginTop: '20px',
          padding: '12px 35px',
          fontSize: '18px',
          backgroundColor: '#0d47a1',
          color: '#ffffff',
          border: 'none',
          borderRadius: '30px',
          cursor: 'pointer',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.3s ease',
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = '#1565c0')}
        onMouseOut={(e) => (e.target.style.backgroundColor = '#0d47a1')}
      >
        Capture
      </button>

      {capturedImage && (
        <div style={{ marginTop: '20px' }}>
          <h2>Captured Image:</h2>
          <img src={capturedImage} alt="Captured" width={400} />
        </div>
      )}

      {extractedNumber && (
        <div style={{ marginTop: '20px', color: '#00796b', fontWeight: 'bold' }}>
          <h3>Barcode Decoded: {extractedNumber}</h3>
        </div>
      )}

      {databaseStatus && (
        <div style={{ marginTop: '20px', color: databaseStatus.includes('good') ? '#4caf50' : '#d32f2f', fontWeight: 'bold' }}>
          <h3>{databaseStatus}</h3>
        </div>
      )}

      {errorMessage && (
        <div style={{ marginTop: '20px', color: '#d32f2f', fontWeight: 'bold' }}>
          <h3>{errorMessage}</h3>
        </div>
      )}
    </div>
  );
};

export default BarcodeScanner;
