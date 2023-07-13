import React from 'react'
import "./Footer.css"

function Footer(){

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear()

    return (
        <footer>
            <p>Copyright &copy; {currentYear} </p>
        </footer>
    )
    
}

export default Footer