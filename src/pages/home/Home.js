import React, { useEffect } from 'react'
import Product from '../../components/product/product'
import Slider from '../../components/slider/Slider'

const Home = () => {
  const url = window.location.href;
  
  useEffect(() => {
    const scrollToProducts = () => {
      if(url.includes("#products")){
        window.scrollTo({
          top: 700,
          behavior: "smooth",
        })
        return
      }
    }
  }, []);
  return (
    <div>
      <Slider/>
      <Product/>
    </div>
  )
}

export default Home