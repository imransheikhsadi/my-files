import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDg9NIQVZJVghl9YqqjNnKvNBSODv5NvQ0",
    authDomain: "ecommerce-react-project.firebaseapp.com",
    databaseURL: "https://ecommerce-react-project.firebaseio.com",
    projectId: "ecommerce-react-project",
    storageBucket: "ecommerce-react-project.appspot.com",
    messagingSenderId: "277861961118",
    appId: "1:277861961118:web:6702c798a0db027b1dda8f",
    measurementId: "G-272G27ZL81"
  };

  export const createUserProfileDocument = async (userAuth,additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();
    
    if (!snapShot.exists) {
      const {displayName,email} = userAuth;
      const createdAt = new Date();


      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (error) {
        console.log('error creaing user',error.massage);
      }
    }

    return userRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore()

  const provider = new firebase.auth.GoogleAuthProvider()
  provider.setCustomParameters({prompt: 'select_account'})

  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;
