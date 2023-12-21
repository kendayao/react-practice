import {useEffect, React} from 'react'
import { getRedirectResult } from 'firebase/auth'
import { auth, signInWithGooglePopup, signInWithGoogleRedirect, createUserDocumentFromAuth } from "../utils/firebase/firebase"
import SignUpForm from '../components/SignUpForm'
import SignInForm from '../components/SignInForm'
import './Authentication.scss'

function Authentication(){

    // useEffect(async()=>{
    //     const response = await getRedirectResult(auth)
    //     if(response){
    //         const userDocRef = await createUserDocumentFromAuth(response.user)
    //     }
    // },[])

   
    return(
        <div className="authentication-container">
            <SignInForm/>
            {/* <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button> */}
            <SignUpForm/>
        </div>
    )
    
}

export default Authentication