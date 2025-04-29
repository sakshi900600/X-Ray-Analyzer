import React, { useRef, useState } from 'react';
import "./ImageUploader.css";
import { FiUpload } from "react-icons/fi";
import { IoCameraOutline } from "react-icons/io5";
import ImageAnalysis from './ImageAnalysis';


const ImageUploader = () => {
  const [showCamera, setShowCamera] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null)
  const [uploadedImgData, setUploadedImgData] = useState(null)


  // handle upload and sent it to backend
  const handleUpload = async (file)=>{
    try{
      const formData = new FormData()
      formData.append('image', file)

      // const response = await fetch('http://localhost:5000/upload', {
      const response = await fetch('https://x-ray-analyzer-backend.onrender.com/upload', {
        method: 'POST',
        body: formData
      })

      const data = await response.json();

      if(response.ok){
        console.log('Upload successful: ', data)
        setSelectedImage(URL.createObjectURL(file))
        setUploadedImgData(data.file)
      }
      else{
        console.error("Upload failed: ", data.error)
      }
    }
    catch(error){
      console.error('Upload error: ', error)
    }
  }


    // allow to choose img when click on upload-card
    const handleCardClick = () => {
        document.getElementById("file-input").click()
    }

    // select file & if file is selected show the image on website
    const handleFileSelect = (e) => {
        const file = e.target.files[0];

        if (file) {
            setSelectedImage(URL.createObjectURL(file))
            handleUpload(file)
        }
    }

    // to stop drag automatically functionality
    const handleDragOver = (e) => {
        e.preventDefault();
    }

    // to drag a file in upload card
    const handleDrop = (e) => {
        e.preventDefault()
        const file = e.dataTransfer.files[0]

        if (file) {
            setSelectedImage(URL.createObjectURL(file))
            handleUpload(file)
        }
    }





  const CameraView = () => {
    const [isCameraOn, setIsCameraOn] = useState(false);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [capturedImage, setCapturedImage] = useState(null)

    const startCamera = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        videoRef.current.play()
        setIsCameraOn(true);

        // testing if streaming or not.
        if(videoRef.current.play()){
          console.log("Video Playing");
          
        }
    };
    
    const capturePhoto = async () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Set canvas dimensions
      canvas.width = 640;
      canvas.height = 480;
      
      // Capture image
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Create photo URL
      const photoUrl = canvas.toDataURL('image/png');
      setCapturedImage(photoUrl);
      
      // Stop camera
      const stream = video.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      
      // Update UI states
      setIsCameraOn(false);
      
      // Show canvas, hide video
      canvas.style.display = 'block';
      video.style.display = 'none';
      
      // Convert base64 to blob
      const response = await fetch(photoUrl);
      const blob = await response.blob();
      
      // Create file object from blob
      const file = new File([blob], "webcam-capture.jpg", {type: "image/jpeg"});
      
      // Handle upload
      handleUpload(file);
    }

    const retakePhoto = () => {
      // Reset to camera view
      setCapturedImage(null);
      setIsCameraOn(true);
      
      // Restart camera
      startCamera();
    };


    return (
      <div className="container">
        <div className='upload-card camera-view'>
        <video ref={videoRef} autoPlay></video>
        <canvas ref={canvasRef} style={{display: 'none'}} />

        {!isCameraOn ? (

          <button className='camera' onClick={startCamera}> <IoCameraOutline fontSize={'23px'} /> Start Camera</button>
        ):(
          <button className='camera' onClick={capturePhoto}>Capture Photo</button>
        )}

      </div>
        <button className='switchToUpload' onClick={() => setShowCamera(false)}>Switch to Upload</button>
      </div>
    );
  };


  const UploadView = () => (
    <div className="container">

      <div className='img-upload'>
        <div onClick={handleCardClick} onDrop={handleDrop} onDragOver={handleDragOver} className="upload-card">

          <input onChange={handleFileSelect} type="file" id='file-input' hidden accept='image' />

          {selectedImage ? (
            <img src={selectedImage} alt="selected" className='uploaded-img' />
          ) : (
            <>
              <FiUpload fontSize={"46px"} color='blue' />
              <p className='desc'><span className='click'>click to upload</span> or drag and drop <br /> </p>
              <span className='file-type'>PNG,JPG or DICOM</span>
            </>
          )

          }


        </div>
      </div>

      <button onClick={() => setShowCamera(true)}>Switch to camera mode</button>
    </div>
  );



  return (
    <div>
      {showCamera ? <CameraView /> : <UploadView />}
      {uploadedImgData && (
        <ImageAnalysis imageData={uploadedImgData} />
      )}
    </div>
  );
};

export default ImageUploader;
