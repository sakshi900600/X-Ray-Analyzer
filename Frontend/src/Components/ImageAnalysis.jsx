import React, { useEffect, useState } from 'react'
import "./ImageAnalysis.css"


const ImageAnalysis = ({ imageData }) => {

  const [analysisResult, setAnalysisResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  // console.log(imageData)

  // fun to get results from ai model
  const processImage = async () => {
    try {
      setIsLoading(true)
      // model related code
      // const response = await fetch('http://localhost:5000/analyze', {
      const response = await fetch('https://x-ray-analyzer-backend.onrender.com/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageData }),
      })

      const data = await response.json()

      // add 3 second delay for loading animation
      await new Promise(resolve => 
        setTimeout(resolve, 3000)
      )

      setAnalysisResult(data)
      setIsLoading(false)

      // console.log("Got Image, waiting for AI model")

    } catch (error) {
      console.error("Error analyzing image: ", error)
    }

    
  }

  useEffect(() => {
    if (imageData && imageData !== "&& imageData !== undefined") {
      // console.log("valid image path detected:", new Date().toISOString())
      processImage()
    }
  }, [imageData])


  return (


    // created a dummy card for styling 
    <div className='analysis-container'>

      {isLoading &&
          <div className='loading-container'>
          <div className='loading'></div>
          <p>Analyzing Image...</p>
        </div>
      }

      {!isLoading && analysisResult && (
        <div>
          <h2>Analysis Complete</h2>

          <div className='result-grid'>

            <div className="result-card condition">
              <h3>Condition:</h3>
              <p>{analysisResult.result.prediction}</p>
            </div>

            <div className="result-card confidence">
              <h3>Confidence:</h3>
              <p>{analysisResult.result.confidence}%</p>
            </div>

            <div className="result-card recommendations">
              <h3>Recommendations:</h3>
              <p>{analysisResult.result.recommendation}</p>
            </div>
          </div>

        </div>
      )}


    </div>

  )
}

export default ImageAnalysis
