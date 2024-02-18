import React, { useState } from "react";

const MultimediaUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    // Get the selected file from the input element
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    // Handle the file upload logic here
    if (selectedFile) {
      // Example: send the file to the server
      console.log("Uploading file:", selectedFile);
    } else {
      console.log("No file selected");
    }
  };

  return (
    <div>
      <h2>Upload Multimedia Content</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default MultimediaUpload;
