import React, { useRef } from "react";
import { Toast } from "primereact/toast";
import { Card } from "primereact/card";
import ClassificationComponent from "./components/ClassificationComponent";
import ImageUpload from "./components/ImageUpload";
import "./App.css"; // Import a CSS file for custom styles
import 'primeicons/primeicons.css';                        //icons
import "primereact/resources/themes/lara-light-cyan/theme.css";
        
function App() {
  const toast = useRef(null);

  return (
      <div className="container">
        <Toast ref={toast} />

        <div className="p-grid p-justify-center">
          <div className="p-col-12">
            <Card
              title="X-Ray Classifier"
              subTitle="Classify and analyze X-Ray images"
              className="card"
            ></Card>
          </div>

          <div className="p-col-12 p-md-6 p-lg-6">
            <Card title="Upload X-Ray Image" className="card">
              <div className="content">
                <ImageUpload toast={toast} />
              </div>
            </Card>
          </div>

          <div className="p-col-12 p-md-6 p-lg-6">
            <Card title="Classification Results" className="card">
              <div className="content">
                <ClassificationComponent toast={toast} />
              </div>
            </Card>
          </div>
        </div>
      </div>
  );
}

export default App;
