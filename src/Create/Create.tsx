import React, {useState} from 'react';
import { BrowserRouter as Router, Routes , Route, Link, BrowserRouter, useLocation, useNavigate } from "react-router-dom";
import './Create.css';
import ReactDOM from 'react-dom';
import { initializeApp } from "firebase/app";
import {getDatabase, ref, set, child, get} from "firebase/database";
import QRCode from 'qrcode'
import {QRCodeCanvas, QRCodeSVG} from 'qrcode.react';
import { saveAs } from 'file-saver';





//add a button to get back to home page to generate another shortened link




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
  







function App() {

  const [qrCodeImage, setQrCodeImage] = useState("");
  const [qrCodeBg, setQrCodeBg] = useState("transparent");


  const app = initializeApp(firebaseConfig);
  
  const db = getDatabase();
  
  
  function generateId(length: any): string {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  

  let navigate = useNavigate();

  var location = useLocation();

  if (location.state == null) {
    navigate("/");
   return(null);
   
  }

  var linkToSendToDatabase = location.state.link;
  

  var idToSendToDatabase = location.state.id;

  const shortenedLink = "linkshortener.netlify.app/" + idToSendToDatabase

  var opts = {
    errorCorrectionLevel: 'H',
    type: 'image/jpeg',
    quality: 0.3,
    margin: 1,
    color: {
      dark:"#010599FF",
      light:"#FFBF60FF"
    }
  }

  


  

  QRCode.toDataURL(linkToSendToDatabase)
  .then(url => {
    setQrCodeImage(url)
  })
  .catch(err => {
    console.error(err)
  })

  function saveQrCode(){
    setQrCodeBg("#fff")
    alert("QR code saved to your device")
    let canvas = document.getElementById('qr_code_image') as HTMLCanvasElement;


    canvas?.toBlob(
      function(blob:any) {
    saveAs(blob, "qr_code.png"+linkToSendToDatabase);
    });

    setQrCodeBg("transparent")

  }

  
  
  
  const reference = ref(db, 'ShortenedLinksDatabase/'  + idToSendToDatabase);

  
      //set to lowercase !!!!! .toLowerCase();
  set(reference, {
  link:linkToSendToDatabase
  });

  


  return(
  <body className="createBody">
        
  <div className="elements">


    <div className="navbar">
      <img id ="logo" src="https://svgshare.com/i/nc7.svg"/>
      <div className="Login_button"><a className="Login_text">Features</a></div>
      <div className="Login_button"><a href="https://www.google.com" className="Login_text">Login</a></div>
      <div className="Signup_button"><img id="signup_logo" src="https://i.ibb.co/5T9GvzB/Nice-Png-my-account-png-5010656.png"/><a className="Signup_text">Sign up</a></div>
      


    </div> 

    <div className="main_head">
      <span id="main_title" style={{color:"#071160"}}>Your shortened link :</span>
      <QRCodeCanvas id="qr_code_image"value={linkToSendToDatabase} style={{width:'45%', height:'45%'}} bgColor={qrCodeBg} onClick={saveQrCode}/>
      <button className="roundedButton" type='button'>{shortenedLink}
                        <svg  className="linkSvg" xmlns="http://www.w3.org/2000/svg" viewBox="-10 -30 170 170">
              <path d="M143.209,105.968c0,6.25-5.113,11.364-11.363,11.364H18.203c-6.25 0-11.363-5.113-11.363-11.364v-86.37c0-6.25,5.113-11.363 11.363-11.363h113.643c6.25,0,11.363,5.113,11.363,11.363V105.968z M18.203,17.326c-1.207,0-2.271,1.068-2.271,2.271v86.37c0,1.207,1.065 2.271,2.271,2.271h113.643c1.203,0,2.274-1.064 2.274-2.271v-86.37c0-1.203-1.071-2.271-2.274-2.271H18.203z M38.661,53.691c-7.529,0-13.641-6.108-13.641-13.635s6.112-13.638,13.641-13.638 c7.526,0,13.632,6.111,13.632,13.638S46.188,53.691,38.661,53.691z M125.025,99.15H25.02V85.51l22.73-22.724l11.363,11.36l36.365-36.361l29.547,29.547V99.15z"/>
              </svg>
      </button>
    </div>

    





  </div>


</body>);
}

export default App;
