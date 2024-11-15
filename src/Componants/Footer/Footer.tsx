import React from 'react'
import style from "./Footer.module.css"

export default function Footer() {
  return <>
  
  <footer className={` ${style.navColor} text-white text-center py-3 mt-4`}>
        <p className=' text-center fs-4'>&copy; 2024 E-commerce - All rights reserved.</p>
      </footer>
  </>
}
