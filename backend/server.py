from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os
from model_test import classify

def empty_folder(folder_path):
    # Get a list of all files in the folder
    files = os.listdir(folder_path)

    # Iterate over the files and remove them
    for file in files:
        file_path = os.path.join(folder_path, file)
        try:
            if os.path.isfile(file_path):
                os.remove(file_path)
            elif os.path.isdir(file_path):
                # If you want to empty subfolders as well, you can recursively call the function
                empty_folder(file_path)
        except Exception as e:
            print(f"Error: {e}")


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can replace * with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

upload_dir = "uploads"

@app.post("/upload")
async def create_upload_file(file: UploadFile = File(...)):
    try:
        # Create the upload directory if it doesn't exist
        os.makedirs(upload_dir, exist_ok=True)
        empty_folder(upload_dir)
        # Save the file locally
        file_path = os.path.join(upload_dir, file.filename)
        with open(file_path, "wb") as f:
            shutil.copyfileobj(file.file, f)

        return JSONResponse(content={"filename": file.filename, "saved_path": file_path}, status_code=201)

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

@app.options("/upload")
async def options_upload_file():
    # Handle OPTIONS request for the /uploadfile/ endpoint
    return JSONResponse(content={"message": "Allowed methods: GET, POST, OPTIONS"}, status_code=200)


@app.get("/files")
async def get_uploaded_files():
    try:
        # Get the list of files in the upload directory
        files = os.listdir(upload_dir)
        return JSONResponse(content={"files": files}, status_code=200)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/classify")
async def model_classify():
    try:
        # model call
        files = os.listdir(upload_dir)
        ret = classify(files[0])
        return JSONResponse(content={
            "class_": ret[0],
            "confidence": f"{ret[1]}"
            }, status_code=200)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))