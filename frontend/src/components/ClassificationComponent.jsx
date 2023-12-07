import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Messages } from 'primereact/messages';
import { Card } from 'primereact/card';

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
    <div className="p-m-3">
      <div className="row">
        <div className='col-4'>
          <Button 
            label={loading ? 'Loading...' : 'Send'} 
            onClick={handleButtonClick}
            disabled={loading}
            icon={loading ? 'pi pi-spin pi-spinner' : 'pi pi-send'}
            className="p-button-rounded p-button-outlined"
            style={{
              width: '20%',
            }}
          />
        </div>
      </div>
      
      <Messages ref={messages} />
          
      <div style={{ height: '50px'}} />
      {classificationData && !loading && (
        <div>
          <h3 className="p-card-title">Classification Results</h3>
          <p className="p-m-0" style={{fontSize: '20px'}}> <span style={{ fontWeight: 'bold' }}>Class:</span> {classificationData.class_}</p>          
          <p className="p-m-0" style={{fontSize: '20px'}}> <span style={{ fontWeight: 'bold' }}>Confidence:</span> {(100 * classificationData.confidence).toFixed(2)} %</p>         
        </div>
      )}

      {error && (
        <Card title="Error" style={{ borderColor: '#ff0000', color: '#ff0000' }}>
          <p>{error}</p>
        </Card>
      )}
      
    </div>
  );
};

export default ClassificationComponent;
