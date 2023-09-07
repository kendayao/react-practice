import React from 'react'
import Category from "./Category.js"
import "./Directory.scss"

function Directory({categories}) {
    
    return (
    <div className="directory-container">
        {categories.map((category)=>(
            <Category key={category.id} category={category} />
        ))}
    </div>
    )

}

export default Directory