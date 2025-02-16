import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { auth } from "./firebaseconfig.js";
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, query, where } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import { db } from "./firebaseconfig.js"




const logOut_btn = document.querySelector('#logOut_btn');
const loginBtn = document.querySelector('#login')
const userProfileImage = document.querySelector('#userImage')
const userName = document.querySelector('#userName');
const userDiv = document.querySelector('#userProfileDiv');
const showBlogUser = document.querySelector('.showBlogUsers');

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const uid = user.uid;
        console.log(uid);
        showBlogs()

        let users = await getUserData();

        console.log(users);
        userDiv.classList.remove('d-none')

        userName.innerHTML = users.FullName;
        userProfileImage.src = users.Profile


    } else {
        console.log("user is not logged in");
        window.location = "./BlogPage.html"
        
        
    }
});

let blogUsersList = [];

async function showBlogs() {
    try {
        const querySnapshot = await getDocs(collection(db, 'Blogs'));
        querySnapshot.forEach((doc) => {
            blogUsersList.push({...doc.data(), ID: doc.id})
            console.log("Data==>", doc.data(), "DocID==>", doc.id);
        });

        renderBlogUsers(blogUsersList)
        
    } catch (error) {
        console.log(error);
        
    }
}

// async function UserTodo() {
//     try {
//         const now = new Date();
//         const docRef = await addDoc(collection(db, "Blog-User"), {

//         });
//         console.log("Document written with ID: ", docRef.id)
//     } catch (e) {
//         console.error("Error adding document: ", e);
//     }
// }

async function getUserData() {
    try {
        let singleUser = null;
        const q = query(collection(db, "Blog-Users"), where("uid", "==", auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            singleUser = doc.data()
        });

        return singleUser;
        // todos.push({
        // ...doc.data(),
        //   docId : doc.id,


        // })

    } catch (error) {
        console.log(error);

    }
}


logOut_btn.addEventListener('click', e => {
    e.preventDefault()

    signOut(auth).then(() => {
        window.location = './login.html'
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
        alert(error)
    });
})


function renderBlogUsers(usersBlog) {
    showBlogUser.innerHTML = "";

    usersBlog.map(blogs =>{
        showBlogUser.innerHTML += `<div class="container mt-5">
    <div class="">
        <div class="col-md-4">
            <div class="card shadow">
                <img src="${blogs.Image}" class="card-img-top" width="10" height="200" alt="Card Image">
                <div class="card-body">
                    <h5 class="card-title">Title : ${blogs.Title}</h5>
                </div>
            </div>
        </div>
    </div>
</div>`
    })
}

