import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import ClassificationComponent from "./components/ClassificationComponent";
import ImageUpload from "./components/ImageUpload";

function App() {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
            <div className="content">
            <ImageUpload />
            </div>
        </div>
        <div className="col">
            <div className="content">
            <ClassificationComponent />
            </div>
        </div>
      </div>
      
    </div>
  );
}

export default App;
