import { Card } from "primereact/card";
import React, { useRef, useState } from "react";
import UploadService from "../services/FileUploadService";
import "./ImageUpload.css"; // Import your custom CSS file

import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";
import { ProgressBar } from "primereact/progressbar";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";

const ImageUpload = () => {
  const [currentFile, setCurrentFile] = useState(undefined);
  const [previewImage, setPreviewImage] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [imageInfos, setImageInfos] = useState([]);
  const toast = React.useRef(null);
  const fileUploadRef = useRef(null);

  const onUpload = (event) => {
    const file = event.files[0];
    setCurrentFile(file);

    UploadService.upload(event.files[0], (event) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    })
      .then((response) => {
        setMessage(response.data.message);
        toast.current.show({
          severity: "info",
          summary: "Success",
          detail: response.data.message,
        });
        return UploadService.getFiles();
      })
      .then((files) => {
        setImageInfos(files.data);
        selectFile(event);
      })
      .catch((err) => {
        setProgress(0);
        const errorMessage =
          err.response && err.response.data && err.response.data.message
            ? err.response.data.message
            : "Could not upload the Image!";
        setMessage(errorMessage);
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: errorMessage,
        });
        setCurrentFile(undefined);
      });
  };

  const selectFile = (event) => {
    const file = event.files[0];
    setPreviewImage(URL.createObjectURL(file));
    setProgress(0);
    setMessage("");
  };

  return (
    <div className="image-upload">
      <Toast ref={toast} />
      <FileUpload
        ref={fileUploadRef}
        name="image"
        url={"/api/upload"}
        customUpload
        uploadHandler={onUpload}
        accept="image/*"
        maxFileSize={1000000}
        onClear={() => {
          setPreviewImage(undefined);
          setCurrentFile(undefined);
        }}
        style={{ width: "90%" }}
        pt={{
          chooseButton: {
            className: "p-button-success",
          },
          cancelButton: {
            root: { className: "p-button-danger" },
          },
        }}
        emptyTemplate={
          <p className="m-0">Drag and drop files to here to upload.</p>
        }
      />

      {previewImage && (
        <Card title="Preview" style={{ width: "90%", marginTop: "20px" }}>
          <img
            className="preview"
            src={previewImage}
            alt="Preview"
            style={{ width: "60%", objectFit: "cover" }}
          />
        </Card>
      )}
    </div>
  );
};

export default ImageUpload;
