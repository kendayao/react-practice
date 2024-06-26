import {initializeApp} from 'firebase/app'
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} from 'firebase/auth'
import {getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs} from 'firebase/firestore'

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

export const signOutUser = async () => await signOut(auth);


//observer listener (hook into stream of events, trigger soemthing based on these changes)
//onAuthStateChanged calls the callback everytime auth changes (user sign in/ sign out)
export const onAuthStateChangedListener = (callback) =>onAuthStateChanged(auth, callback)


// upload data to firestore collectionKey(ex. users, categories)objects(documents to add)
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  
  const collectionRef = collection(db,collectionKey);
  //batch instance to add documents
  const batch = writeBatch(db);
  //each category object ex hats, womens etcs
  objectsToAdd.forEach((object)=>{
    //create doc ref where key is the title
    const docRef=doc(collectionRef, object.title.toLowerCase());
    //set location in firebase with the object
    batch.set(docRef, object)
  })
  //begin firing to add data to firebase
  await batch.commit()
  console.log('done')
}

//retreive documents frm the firebase
export const getCategoriesAndDocuments = async () => {
  //collection that is being targetted
  const collectionRef = collection(db, 'categories');

  const q = query(collectionRef);

  //fetch documents that we want and store in querysnapshot
  const querySnapshot = await getDocs(q);

  
  //snapshots is data themselves which is array of individual documents
  
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot)=>{
    
    console.log(docSnapshot.data())
    
    const {title, items}=docSnapshot.data();
    console.log(title)
    console.log(items)
    console.log(acc)
    //add new categories items to object (assigned title to items)
    acc[title.toLowerCase()]=items;
    
    
    console.log(acc)
    //once done mapping and adding to object return acc to cateogryMaps
    return acc;
  },{})
  
  console.log(categoryMap)
  
  return categoryMap;
}