import { BrowserRouter as Router, useLocation } from "react-router-dom";
//import './CreatePage.css';
import { initializeApp } from "firebase/app";
import {getDatabase, ref, child, get} from "firebase/database";




const firebaseConfig = {
  apiKey: "AIzaSyAM6D9YmamUP2KvGydvqnS4UIuvUelC5cQ",
  authDomain: "linkshortener-3948e.firebaseapp.com",
  projectId: "linkshortener-3948e",
  databaseURL: "https://linkshortener-3948e-default-rtdb.europe-west1.firebasedatabase.app/",
  storageBucket: "linkshortener-3948e.appspot.com",
  messagingSenderId: "931426171539",
  appId: "1:931426171539:web:30a5a5e18b2db04c3b2b66",
  measurementId: "G-QZKKV62PQF"
};





// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase();


















function App() {

  
  const dbRef = ref(getDatabase());
  get(child(dbRef, `ShortenedLinksDatabase/${useLocation().pathname.replace("/", "")}`)).then((snapshot) => {
    if (snapshot.exists()) {
      //console.log(snapshot.val());
      //alert(snapshot.val()["link"])

      window.location.href=`${snapshot.val()["link"]}`;



    } else {
      alert("This page doesn't exist");
    }
  }).catch((error) => {
    console.error(error);
  });
    

  

  


  
 
  return (
    null


  // <Route path="" element={<p>Create your LinkStock now</p>}/>
  //<Route path="*" element={<p>Welcome to {useLocation().pathname.replace("/", "")}'s LinkStock</p>}/>
    
    
  );
}

export default App;

