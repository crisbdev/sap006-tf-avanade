import React, { useState } from 'react';
import QrScan from 'react-qr-reader';

function QRscanner() {
  const [qrscan, setQrscan] = useState('No result');
  
  const handleScan = (data) => {
    console.log(data);
    if (data) {
      setQrscan(data);
    }
  };
  const handleError = (err) => {
    console.error(err);
  };
  return (
    <div>
      <div>
        <QrScan
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ height: 240, width: 320 }}
        />
      </div>
    </div>
  );
}

export default QRscanner;
