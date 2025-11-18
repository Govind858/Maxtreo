import React from 'react'
import ContactCard from "../user/ContactCard"
import Navbar from "../../components/user/NavBar/NavBar"
import Footer from "../../components/user/Footer/Footer"
function ContactPage() {
  return (
    <div>
      <Navbar/>
     <ContactCard/>
     <Footer/>
    </div>
  )
}

export default ContactPage