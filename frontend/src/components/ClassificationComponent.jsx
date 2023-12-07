import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Messages } from 'primereact/messages';

const ClassificationComponent = () => {
  const [classificationData, setClassificationData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messages = React.useRef(null);

  const handleButtonClick = () => {
    setLoading(true);
    setError(null);
    fetch('http://172.201.242.16:8000/classify')
      .then(response => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          return response.json();
        })
      .then(data => setClassificationData(data))
      .catch(error => {
        setError(error.message);
        messages.current.show({ severity: 'error', detail: error.message });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <div className='row'>
        <div className='col-4'>
          <Button 
            label={loading ? 'Loading...' : 'Send'} 
            onClick={handleButtonClick}
            // className="p-button-success p-button-sm"
            disabled={loading}
            icon={loading ? 'pi pi-spin pi-spinner' : null}
          />
        </div>
      </div>
      
      <Messages ref={messages} />

      {classificationData && !loading && (
        <div>
          <p>Class: {classificationData.class_}</p>
          <p>Confidence: {classificationData.confidence}%</p>
        </div>
      )}
      
      {loading && (
        <div>
          <ProgressSpinner />
        </div>
      )}
    </div>
  );
};

export default ClassificationComponent;
