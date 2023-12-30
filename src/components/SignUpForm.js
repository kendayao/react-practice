import React, {useState} from 'react'
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../utils/firebase/firebase'
import FormInput from './FormInput'
import "./SignUpForm.scss"
import Button from './Button'



const defaultFormField = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

function SignUpForm(){

    const [formFields, setFormFields] = useState(defaultFormField)
    const {displayName, email, password, confirmPassword}=formFields

    

    const handleChange = (event) => {
        const {name,value} = event.target;
        setFormFields({...formFields, [name]:value})
    }

    const resetFormFields = () => {
        setFormFields(defaultFormField)
    }

    const handleSubmit = async(event) => {
        event.preventDefault();

        if(password!==confirmPassword){
            alert("passwords do not match");
            return;
        }

        try{
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
       
            await createUserDocumentFromAuth(user, {displayName})
            resetFormFields();
        } catch(error){
            if(error.code==='auth/email-already-in-use'){
                alert('Cannot create user, email already in use')
            }else{
                console.log('user creation encounterd an error', error)
            }

        }
    }

    return(
        <div className="sign-up-container">
            <h2>Don't have an account</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label="Display Name"
                    type="text" 
                    name="displayName" 
                    value={displayName} 
                    onChange={handleChange} 
                    required
                />

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

                <FormInput 
                    label="Confirm Password"
                    type="text" 
                    name="confirmPassword" 
                    value={confirmPassword} 
                    onChange={handleChange} 
                    required
                />
                <Button type='submit'>Sign Up</Button>
            </form>
        </div>
    )
}


export default SignUpForm