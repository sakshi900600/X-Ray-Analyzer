import { useState } from 'react'


// creating a custom hook 
export const useImageAnalysis = () => {

    const [selectedImage, setSelectedImage] = useState(null)
    const [analysis, setAnalysis] = useState(null)
    const [isAnalyzing, setIsAnalyzing] = useState(false)


    // analyze image and get result from model
    const analyzeImage = async (imageData) => {
        setIsAnalyzing(true)

        // API call to trained model
        try {
            // Replace this setTimeout with actual API call
            await new Promise(resolve => setTimeout(resolve, 2000))
            setAnalysis({
                condition: "Potential anomaly detected",
                confidence: "85%",
                recommendations: "Further examination recommended"
            })
        } catch (error) {
            console.log("Analysis Error: ", error);
        }
        finally {
            setIsAnalyzing(false)
        }
    }

    // processing image by model
    const processImage = (imageData) => {
        setSelectedImage(imageData)
        analyzeImage(imageData)
    }

    // reset image analysis
    const resetAnalysis = () => {
        setSelectedImage(null)
        setAnalysis(null)
    }

    return {
        selectedImage,
        analysis,
        isAnalyzing,
        processImage,
        resetAnalysis
    }

}
