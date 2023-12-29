import React, {useState, useContext} from 'react'
import "./SignInForm.scss"
import FormInput from './FormInput'
import Button from './Button'
import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from '../utils/firebase/firebase'
import {UserContext} from '../contexts/user.context'

const defaultFormField = {
    email: '',
    password: ''
}

function SignInForm(){

    const [formFields, setFormFields]= useState(defaultFormField)
    const {email, password} = formFields

    const handleChange = (event) => {
        const {name,value} = event.target;
        setFormFields({...formFields, [name]:value})
    }

    const {setCurrentUser} = useContext(UserContext);


    const resetFormFields = () => {
        setFormFields(defaultFormField)
    }

    const handleSubmit = async(event) => {
        event.preventDefault();

        

        try{
           const response = await signInAuthUserWithEmailAndPassword(email, password)
           console.log(response)
            resetFormFields();
            setCurrentUser(response.user);
        }
        
        
        
        catch(error){
            switch(error.code){
                case "auth//wrong-password":
                    alert("incorrect password for email");
                    break

                case "auth/user-not-found":
                    alert("no user associated with this email");
                    break

                default:
                    console.log(error)

            }

        }
    }

    const signInWithGoogle= async () => {
        const response = await signInWithGooglePopup()
        await createUserDocumentFromAuth(response.user)
        
    }


    return(
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
          
                <FormInput 
                    label="Email"
                    type="text" 
                    name="email" 
                    value={email} 
                    onChange={handleChange} 
                    required
                />

                <FormInput 
                    label="Passsword"
                    type="text" 
                    name="password" 
                    value={password} 
                    onChange={handleChange} 
                    required
                />
                <div className='buttons-container'>
                    <Button type='submit'>Sign In</Button>
                    <Button type="button" buttonType='google' onClick={signInWithGoogle}>Sign In With Google</Button>
                </div>
               
            </form>
        </div>
    )



}

export default SignInForm