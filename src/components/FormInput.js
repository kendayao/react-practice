import React from 'react'
import "./FormInput.scss"

function FormInput({label, ...otherProps}){
    console.log(otherProps)
    return(
        <div className="group">
            <input className="form-input"{...otherProps}/>
            {label && (
                 <label className={`${otherProps.value.length ? "shrink" : ""} form-input-label`}>{label}</label>
            )}
        </div>
    )
}

export default FormInput