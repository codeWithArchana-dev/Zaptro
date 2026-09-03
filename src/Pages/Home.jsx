import React from 'react'
import Carosel from '../Components/Carosel'
import MidBanner from '../Components/MidBanner'
import Features from '../Components/Features'


const Home = () => {
  return (
    <div className='overflow-x-hidden'>
        <Carosel/>
       <MidBanner/>
      <Features/> 
    </div>
    
  )
}

export default Home
