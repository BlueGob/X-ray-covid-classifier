import React, { useState } from 'react';

const ClassificationComponent = () => {
  const [classificationData, setClassificationData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      .catch(error => setError(error.message))
      .finally(() => setLoading(false));
  };

  return (
    <div>
        <div className='row'>
            <div className='col-8'>
            <h2>Classification Result</h2>
            </div>
            <div className='col-4'>
                <button 
                    className="btn btn-success btn-sm"
                    onClick={handleButtonClick} 
                    disabled={loading}
                    >
                    {loading ? 'Loading...' : 'Send'}
                </button>
            </div>
        </div>
      
      
      {classificationData && !loading && (
        <div>
          <p>Class: {classificationData.class_}</p>
          <p>Confidence: {classificationData.confidence}%</p>
        </div>
      )}
      {error && !loading && (
        <div>
        <div className="alert alert-warning mt-3" role="alert">
          {error}
        </div>
        </div>
      )}
    </div>
  );
};

export default ClassificationComponent;
