import React, { useRef, useState, useEffect } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";

import "./App.css";
function App() {
  const [image, setImage] = useState(null);
  const handleImageUploader = (e) => {
    setImage(e.target.files[0]);
  };

  const canvasRef = useRef(null);

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        const img = new Image();
        img.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          const aspectRatio = img.width / img.height;
          let width = canvas.width;
          let height = canvas.width / aspectRatio;
          if (height > canvas.height) {
            width = canvas.height * aspectRatio;
            height = canvas.height;
          }
          const x = (canvas.width - width) / 2;
          const y = (canvas.height - height) / 2;

          ctx.drawImage(img, x, y, width, height);
        };

        img.src = event.target.result;
      };
      reader.readAsDataURL(image);
    }
  }, [image]);

  return (
    <div className="flex flex-col items-center justify-start space-y-3 my-2">
      <label className="px-12 py-2 uppercase flex flex-row  items-center  space-x-2 justify-between bg-black text-white cursor-pointer font-bold rounded">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUploader}
          className="hidden"
        />
        Upload Image <AiOutlineCloudUpload size={30} />
      </label>
      <canvas
        className="bg-[#edede9] py-8 px-8"
        width="800"
        height="400"
        ref={canvasRef}
        id="canvas"
      />
    </div>
  );
}

export default App;
