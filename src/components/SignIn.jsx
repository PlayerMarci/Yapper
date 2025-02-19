import firebase from 'firebase/compat/app'; 

import 'firebase/compat/firestore';

import 'firebase/compat/auth'; 


export default function SignIn(props){
  const signInWithGoogle = () =>{
    const provider = new firebase.auth.GoogleAuthProvider();
    props.auth.signInWithPopup(provider);
  }

  return(
    <>
    <button onClick={signInWithGoogle}>Sign in with google</button>
    <p>Do not violate the community guidelines or you will be banned for life!</p>
    </>
  )
}