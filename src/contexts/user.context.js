import { createContext, useState, useEffect, useReducer } from 'react';
import { onAuthStateChangedListener, createUserDocumentFromAuth } from '../utils/firebase/firebase'


// as the actual value you want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
})

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
}

const userReducer = (state,action)=>{
    const {type, payload} = action;
    console.log('dispatched')
    console.log(action)
    switch(type){
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return{
                // spread state so you can get all values from previous state object
                ...state,
                currentUser: payload
            }
            default:
                throw new Error(`Unahndled type ${type} in usesrReducer`)
        }

}

const INITAL_STATE = {
    currentUser: null
}



export const UserProvider = ({children})=>{
    // const [currentUser, setCurrentUser] = useState(null);
    const [state, dispatch] = useReducer(userReducer, INITAL_STATE)
    const {currentUser}=state
    

    
    
    //when user is found in useEffect tgus setCurrentUser function runs
    const setCurrentUser = (user) => {
        dispatch({type:USER_ACTION_TYPES.SET_CURRENT_USER, payload: user})
    }

    const value = {currentUser, setCurrentUser}
    useEffect(()=>{
        const unsubscribe = onAuthStateChangedListener((user)=>{
            console.log(user)
            if (user) {
                createUserDocumentFromAuth(user)
            }
            setCurrentUser(user)
        })

        //unsubscribe on unmount
        return unsubscribe
    },[])


    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}










//reducers are functons that return back an object.reason why return new object that is how react knows something has changed

/*
    const userReducer=(state, action)=>{
        return{
            currentUser: null
        }
    }



*/