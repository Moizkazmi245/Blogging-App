import { collection, addDoc, getDocs,  query, where  } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import { auth, db } from "./firebaseconfig.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";


const titleName = document.querySelector('#titleName');
const upload_widget = document.querySelector('#upload_widget');
const addBlogBtn = document.querySelector('#addBlogBtn')
const cardDetails = document.querySelector('#cardDetails')

let imagePost = null;

let allBlogsUser = [];


onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User is logged in:", user.uid);
        getUserdData(user.uid); 
    } else {
        console.log("User is not logged in");
        window.location = "./BlogPage.html"; 
    }
});

var myWidget = cloudinary.createUploadWidget({
    cloudName: 'ddwbdirt6',
    uploadPreset: 'Moiz0619'
}, (error, result) => {
    if (!error && result && result.event === "success") {
        console.log('Done! Here is the image info: ', result.info);
        imagePost = result.info.secure_url;
    }
}
)

upload_widget.addEventListener("click", function (event) {
    event.preventDefault()
    myWidget.open();
}, false);

addBlogBtn.addEventListener('click', async (event) => {

    try {
        const docRef = await addDoc(collection(db, 'Blogs'), {
            Title: titleName.value,
            Image: imagePost,
            uid: auth.currentUser.uid,
        });
        console.log("Document ID:", docRef.id);
        console.log("title: ", titleName.value);
        console.log("Image: ", imagePost);
        allBlogsUser.push({
            Title: titleName.value,
            Image: imagePost,
            uid: auth.currentUser.uid,
            DocId: docRef.id,
        });
        renderBlog(allBlogsUser)
    } catch (e) {
        console.log("error in document ID:", e);
    }
    titleName.value = "";
    imagePost = "";
});

async function getUserdData() {
    try {
        const q = query(collection(db, "Blogs"), where("uid", "==", auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            allBlogsUser.push({ ...doc.data(), DocId: doc.id, uid: auth.currentUser.uid })
            console.log("Data==>", doc.data(), "DocID==>", doc.id);
        });
        console.log(allBlogsUser);

        renderBlog(allBlogsUser)

    } catch (error) {
        console.log(error);

    }
}

// getUserdData()




function renderBlog(blog) {
    cardDetails.innerHTML = "";

    blog.forEach((allBlogsUser) => {
        cardDetails.innerHTML += `<div class="container mt-5">
    <div class="">
        <div class="col-md-4">
            <div class="card shadow">
                <img src="${allBlogsUser.Image}" class="card-img-top" width="10" height="200" alt="Card Image">
                <div class="card-body">
                    <h5 class="card-title">Title : ${allBlogsUser.Title}</h5>
                </div>
            </div>
        </div>
    </div>
</div>`
    });
}