import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup  } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { auth } from "./firebaseconfig.js";

const signin_email = document.querySelector('#signin_email');
const signin_password = document.querySelector('#signin_password');
const signin_btn = document.querySelector('#signin-btn');
const google_btn = document.querySelector('#google_btn')

signin_btn.addEventListener('click', SignInUser)

const provider = new GoogleAuthProvider();


function SignInUser(){
    signInWithEmailAndPassword(auth, signin_email.value, signin_password.value)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log("Blog-User", user);
      window.location = './index.html'
      
      // ...
    })

    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage)
    });
  
  }

  google_btn.addEventListener('click', userLoginGoogle)

  function userLoginGoogle(){
    signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    window.location = './index.html'
    // ...
  }).catch((error) => {

    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
  }