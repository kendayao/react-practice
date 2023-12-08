import React, {useState} from 'react'
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../utils/firebase/firebase'
import FormInput from './FormInput'


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
                console.log('user createion encounterd an error', error)
            }

        }
    }

    return(
        <div>
            <h1>Sign up with your email and password</h1>
            <form onSubmit={handleSubmit}>
                <label>Display Name</label>
                <input type="text" name="displayName" value={displayName} onChange={handleChange} required/>

                <label>Email</label>
                <input type="email" name="email" value={email} onChange={handleChange} required/>

                <label>Password</label>
                <input type="password" name="password" value={password} onChange={handleChange} required/>

                <label>Confirm Password</label>
                <input type="password" name="confirmPassword" value={confirmPassword} onChange={handleChange} required/>

                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}


export default SignUpForm