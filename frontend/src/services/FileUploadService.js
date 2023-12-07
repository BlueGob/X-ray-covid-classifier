import http from "../http-common";

const upload = (file, onUploadProgress) => {
  let formData = new FormData();
  console.log("FileUploadService.js: upload: file:", file);
  formData.append("file", file);

  return http.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
  });
};

const getFiles = () => {
  return http.get("/files");
};

const FileUploadService = {
  upload,
  getFiles,
};

export default FileUploadService;
