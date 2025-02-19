import React, { useRef, useState } from 'react';
import './App.css';

/*
import firebase from 'firebase/';
import 'firebase/firestore';
import 'firebase/auth';
*/
import firebase from 'firebase/compat/app'; 

import 'firebase/compat/firestore';

import 'firebase/compat/auth'; 

import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';

import Settings from './components/Settings';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';

firebase.initializeApp({
  apiKey: "AIzaSyDhXnMyDGw3ei7-4M-x1LXcEZvATPx0tbc",
  authDomain: "yapper-204ab.firebaseapp.com",
  projectId: "yapper-204ab",
  storageBucket: "yapper-204ab.firebasestorage.app",
  messagingSenderId: "31767433105",
  appId: "1:31767433105:web:b75ea782115bc2fe8a1430",
  measurementId: "G-ERFF6SL9W6"
});

const auth = firebase.auth();
const firestore  =firebase.firestore();

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header">
        <SignOut auth={auth}></SignOut>
      </header>

      <section>
      {user ? <ChatRoom/> : <SignIn auth={auth}/>}
      </section>
    </div>
  );
}



function ChatRoom(){

  const dummy = useRef();

  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, {idField: 'id'});

  const [formValue, setFromValue] = useState('');
  
  const sendMessage = async(e) => {
    e.preventDefault();

    const {uid, photoURL} = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    });

    setFromValue('');

    dummy.current.scrollIntoView({behavoir: 'smooth'});
  }

  return (
    <>
    <main>
      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg}></ChatMessage>)}

      <div ref={dummy}>

      </div>
    </main>

    <form onSubmit={sendMessage}>

    <input value={formValue} onChange={(e) => setFromValue(e.target.value)}></input>

    <button type='submit'>🏹</button>

    </form>

    </>
  )
  
  /*
  return (
    <div className="loggedInText">
      You are logged in
    </div>
  );
  */
}

function ChatMessage(props){
  const {text, uid, photoURL} = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'recieved';

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} alt=''/>
      <p>{text}</p>
    </div>
  )
}


export default App;
