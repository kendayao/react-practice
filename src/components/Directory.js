import React from 'react'
import DirectoryItem from "./DirectoryItem.js"
import "./Directory.scss"

function Directory({categories}) {
    
    return (
    <div className="directory-container">
        {categories.map((category)=>(
            <DirectoryItem key={category.id} category={category} />
        ))}
    </div>
    )

}

export default Directory