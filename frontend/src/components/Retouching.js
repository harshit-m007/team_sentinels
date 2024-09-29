import React, { useState } from "react";
import "./Retouching.css";

function Retouching() {
  const [selectedImage, setSelectedImage] = useState(null);

  // Handle file input change event
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/bmp", "image/webp"];

    if (file && allowedTypes.includes(file.type)) {
      if (file.type === "image/jpeg") {
        // If the file is already a JPEG, no need for conversion
        const imageUrl = URL.createObjectURL(file);
        setSelectedImage(imageUrl);
      } else {
        // Convert non-JPEG images to JPEG
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

        // Set canvas dimensions to the image dimensions
        canvas.width = imgElement.width;
        canvas.height = imgElement.height;

        // Draw the image onto the canvas
        ctx.drawImage(imgElement, 0, 0);

        // Convert the canvas content to JPEG
        const jpegUrl = canvas.toDataURL("image/jpeg", 0.9); // 0.9 for high-quality JPEG

        // Update the state with the JPEG image URL
        setSelectedImage(jpegUrl);
      };
    };

    // Read the file as a data URL (base64)
    reader.readAsDataURL(file);
  };

  return (
    <div className="retouching-container">
      <h1 className="retouching-heading">Retouching Tool</h1>
      <p className="retouching-description">
        Upload a image to start retouching and enhancing your image.
        This tool applies subtle edits to enhance or alter specific features without overt manipulation, such as text editing or major changes. The AI recognizes and highlights subtle modifications like noise reduction, brightness, or contrast adjustments, giving your images a professional and polished look.
      </p>

      {/* File input */}
      <div className="upload-area">
        <input
          type="file"
          accept="image/*"  // Allow all image formats
          onChange={handleImageUpload}
          className="upload-input"
        />
      </div>

      {/* Display the selected image */}
      {selectedImage && (
        <div className="image-preview">
          <h2 className="preview-heading">Selected Image:</h2>
          <img src={selectedImage} alt="Uploaded file preview" className="preview-image" />
        </div>
      )}
    </div>
  );
}

export default Retouching;


