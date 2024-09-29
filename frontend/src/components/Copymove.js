import React, { useState } from "react";
import "./Copymove.css";

function Copymove() {
  const [selectedImage, setSelectedImage] = useState(null);

  // Handle file input change event
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/bmp", "image/webp"];

    if (file && allowedTypes.includes(file.type)) {
      if (file.type === "image/jpeg") {
        const imageUrl = URL.createObjectURL(file);
        setSelectedImage(imageUrl);
      } else {
        convertToJpeg(file);
      }
    } else {
      alert("Please upload a valid image (.jpeg, .png, .bmp, .webp).");
    }
  };

  // Convert the image to JPEG using canvas
  const convertToJpeg = (file) => {
    const reader = new FileReader();
    reader.onload = function (event) {
      const imgElement = document.createElement("img");
      imgElement.src = event.target.result;

      imgElement.onload = function () {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = imgElement.width;
        canvas.height = imgElement.height;

        ctx.drawImage(imgElement, 0, 0);

        const jpegUrl = canvas.toDataURL("image/jpeg", 0.9);
        setSelectedImage(jpegUrl);
      };
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="copymove-container">
      <h1 className="copymove-heading">Copy-Move Forgery Detection Tool</h1>
      <p className="copymove-description">
        Upload a image to detect copy-move forgery. This tool helps you find areas in an image where part of the content, such as a car, has been copied and pasted within the same image. The AI will highlight these duplicate regions for closer inspection.
      </p>

      <div className="upload-area">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="upload-input"
        />
      </div>

      {selectedImage && (
        <div className="image-preview">
          <h2 className="preview-heading">Selected Image:</h2>
          <img src={selectedImage} alt="Uploaded file preview" className="preview-image" />
        </div>
      )}
    </div>
  );
}

export default Copymove;


