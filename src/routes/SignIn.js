import {useEffect, React} from 'react'
import { getRedirectResult } from 'firebase/auth'
import { auth, signInWithGooglePopup, signInWithGoogleRedirect, createUserDocumentFromAuth } from "../utils/firebase/firebase"

function SignIn(){

    useEffect(async()=>{
        const response = await getRedirectResult(auth)
        if(response){
            const userDocRef = await createUserDocumentFromAuth(response.user)
        }
    },[])

    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup()
        const userDocRef = await createUserDocumentFromAuth(response.user)
        
    }

    return(
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>Sign in with Google Popup</button>
            <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button>
        </div>
    )
    
}

export default SignIn