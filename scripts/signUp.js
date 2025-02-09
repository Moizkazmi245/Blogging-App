import { createUserWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { collection, addDoc} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import { auth, db } from "./firebaseconfig.js";

const signup_email = document.querySelector('#signup_email');
const signup_password = document.querySelector('#signup_password');
const signup_btn = document.querySelector('#signup-btn');
const fullName = document.querySelector('#fullName')


let uploadImageUrl = ""

var myWidget = cloudinary.createUploadWidget({
    cloudName: 'ddwbdirt6', 
    uploadPreset: 'Moiz0619'}, (error, result) => { 
      if (!error && result && result.event === "success") { 
        console.log('Done! Here is the image info: ', result.info); 
        uploadImageUrl = result.info.secure_url;
      }
    }
  )
  
  document.getElementById("upload_widget").addEventListener("click", function(){
      myWidget.open();
    }, false);


signup_btn.addEventListener('click', event =>{

    // console.log("email==>", signup_email.value);
    // console.log("password==>", signup_password.value);
    
    createUserWithEmailAndPassword(auth, signup_email.value, signup_password.value)
    .then( async (userCredential) => {
      // Signed up 
      const user = userCredential.user;
      console.log("user==>", user);
      window.location = 'login.html'


      try{
        const docRef = await addDoc (collection(db, 'Blog-Users'),{
            FullName : fullName.value,
            Email : signup_email.value,
            Profile: uploadImageUrl,
            uid: user.uid
        });
        console.log("Document ID:", docRef.id);
      }catch(e){
        console.log("error in document ID:" , e);
      }
      // ...
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage)
      // ..
    });
})



