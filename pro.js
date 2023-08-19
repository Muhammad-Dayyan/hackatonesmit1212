import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getStorage, ref ,uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
const firebaseConfig = {
    apiKey: "AIzaSyBHG6-Hj5JiX3LX1PUHHzrWPbTIAAd7IWM",
    authDomain: "data-base-f6ac2.firebaseapp.com",
    projectId: "data-base-f6ac2",
    storageBucket: "data-base-f6ac2.appspot.com",
    messagingSenderId: "605107890798",
    appId: "1:605107890798:web:92c109078716967cda147f"
  };
  
  const app = initializeApp(firebaseConfig);
  console.log(app)
  

  const storage = getStorage();
  let upload=document.getElementById("upload")
  const uploadFile = (file)=>{
    return new Promise((resolve,reject)=>{
      const mountainsRef = ref(storage, `images/${file.name}`);
   const uploadTask = uploadBytesResumable(mountainsRef, file);

    uploadTask.on('state_changed', 
      (snapshot) => {

       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
       console.log('Upload is ' + progress + '% done');
       switch (snapshot.state) {
         case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
       }
   }, 
   (error) => {
     reject(error)
   }, 
     () => {   
       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
         resolve(downloadURL);
       });
     }
   );
   })
 }
 upload.addEventListener('click',async()=>{

 try{
   let file=document.getElementById('file')
   const res= await  uploadFile(file.files[0])
   console.log("res",res)
    const img=document.getElementById('img')
    img.src=res;
  }
  catch(err){
    console.log(err)
  }

   let file=document.getElementById('file')
   uploadFile(file.files[0])
   .then((res) => console.log("res",res)

   )
   .catch((err=>("err",err)))
   const mountainsRef = ref(storage, `images/${file.files[0].name}`);
   const uploadTask = uploadBytesResumable(mountainsRef, file.files[0]);


   uploadTask.on('state_changed', 
     (snapshot) => {

     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
     console.log('Upload is ' + progress + '% done');
   switch (snapshot.state) {
       case 'paused':
         console.log('Upload is paused');
         break;
       case 'running':
         console.log('Upload is running');
         break;
     }
   }, 
   (error) => {
     console.log('error',error);
    }, 
      () => {

       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
         console.log('File available at', downloadURL);
       });
   }
  );

  }) 

  const logoutBtn=document.getElementById("logout")
  logoutBtn.addEventListener('click',logout)
  function logout() {
      localStorage.removeItem("loginUser")
      window.location.replace("./index.html")
  }
