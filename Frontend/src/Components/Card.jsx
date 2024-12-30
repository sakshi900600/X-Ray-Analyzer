import React from 'react'
import "./Card.css"
import { FiUpload } from "react-icons/fi";
import { detail } from '../assets/detail';

const Card = () => {



  return (
    <>
    <h1 className='hero-title'>How To Use it ?</h1>
    <div className='card-container'>

      {detail.map((item, index) => {
        const Icon = item.icon;
        return (
          <div className="card" key={index}>
            <Icon fontSize={"26px"} color='blue' />
            <h2 className='title'>{item.title}</h2>
            <p className='desc'>{item.description}</p>
          </div>
        )
      })}

    </div>
    </>
  )
}

export default Card
