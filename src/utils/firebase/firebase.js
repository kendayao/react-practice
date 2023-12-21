import {initializeApp} from 'firebase/app'
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDz9RrvhOSYIvWorihm8XrkyuWlHqaxgL8",
    authDomain: "crwn-clothing-db-e0937.firebaseapp.com",
    projectId: "crwn-clothing-db-e0937",
    storageBucket: "crwn-clothing-db-e0937.appspot.com",
    messagingSenderId: "265478122079",
    appId: "1:265478122079:web:1fe77383692c52011b49ea"
  };
  
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = ()=> signInWithPopup(auth, googleProvider)
export const signInWithGoogleRedirect = ()=>signInWithRedirect(auth, googleProvider)
export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth, additionalInformation) => {
  const userDocRef = doc(db, 'users', userAuth.uid)
  console.log(userDocRef)
  const userSnapshot = await getDoc(userDocRef)
  console.log(userSnapshot.exists())

  if(!userSnapshot.exists()){
    const {displayName, email}=userAuth;  
    const createAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createAt,
        ...additionalInformation
      });


    } catch(error){

      console.log('error in returning user', error.message)
    }
  
  return userDocRef
  }

}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email||!password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email||!password) return;

  return await signInWithEmailAndPassword(auth, email, password);
}

