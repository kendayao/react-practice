import React from 'react'
import { signWithGooglePopup, createUserDocumentFromAuth } from "../utils/firebase/firebase"

function SignIn(){

    const logGoogleUser = async () => {
        const response = await signWithGooglePopup()
        const userDocRef = await createUserDocumentFromAuth(response.user)
        
    }

    return(
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>Sign in with Google Popup</button>
        </div>
    )
    
}

export default SignIn