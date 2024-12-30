import React, { useState } from 'react'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Hero from './Components/Hero'
import Card from './Components/Card'
import ImageUploader from './Components/ImageUploader'
import ImageAnalysis from './Components/ImageAnalysis'


const App = () => {


  return (
    <div>
      <Navbar />
      <Hero />
      <ImageUploader />

      <ImageAnalysis />
      <Card />


      <Footer />
    </div>
  )
}

export default App




