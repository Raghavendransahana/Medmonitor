import React from 'react';
import BarcodeScanner from './BarcodeScanner'; // Make sure BarcodeScanner.jsx is also in the src directory

function App() {
    return (
        <div>
            <h1>Barcode Scanner App</h1>
            <BarcodeScanner /> {/* Render your BarcodeScanner component here */}
        </div>
    );
}

export default App;