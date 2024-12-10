import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList/>
    <BannerProduct/>
    <HorizontalCardProduct category={"Python"} heading={"Top's Pythone COurses"}/>
    <HorizontalCardProduct category={"UI/UX"} heading={"Popular UI/UX courses"}/>
    
    <VerticalCardProduct   category={"Web development"} heading={"web dev courses"}/>
    <VerticalCardProduct   category={"Graphics Design"} heading={"Best graphics design courses"}/>
    <VerticalCardProduct   category={"English"} heading={"best spoken english courses"}/>
    {/* <VerticalCardProduct   category={"refrigerator"} heading={"Refrigerator"}/>
    <VerticalCardProduct   category={"printers"} heading={"Printers"}/>
    <VerticalCardProduct   category={"speakers"} heading={"Speakers"}/>
    <VerticalCardProduct   category={"camera"} heading={"Camera & Photography"}/>
    <VerticalCardProduct   category={"trimmers"} heading={"Trimmers"}/>
    <VerticalCardProduct   category={"processor"} heading={"Processor"}/>
    <VerticalCardProduct   category={"earphones"} heading={"Earphones & Headphones"}/> */}
    </div>
  )
}

export default Home