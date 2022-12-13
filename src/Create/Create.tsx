import React, {useEffect, useState} from 'react';
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
  const [copyButtonColour, setCopyButtonColour] = useState("#4d90fb");
  const [copyButtonText, setCopyButtonText] = useState("Copy");


  let navigate = useNavigate();
  let location = useLocation();


  
  if  (location.state){

  }else{
    window.location.href = "http://127.0.1:3000/";
    //window.location.href = "http://linkshortener.netlify.app/";


    return (null)
  }


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

  

  




  

  var linkToSendToDatabase = location.state.link;
  

  var idToSendToDatabase = location.state.id;

  const shortenedLink = "https://linkshortenerapp.netlify.app/" + idToSendToDatabase




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

  


  

  QRCode.toDataURL(shortenedLink)
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
    saveAs(blob, "qr_code.png" +shortenedLink);
    });

    setQrCodeBg("transparent")

  }

  
  
  
  const reference = ref(db, 'ShortenedLinksDatabase/'  + idToSendToDatabase);

  
      //set to lowercase !!!!! .toLowerCase();
  set(reference, {
  link:linkToSendToDatabase
  });

  function copyToClipboard(){
    //alert("Link copied to clipboard")
    console.log("Link copied to clipboard")
    setCopyButtonColour("#38c15e")
    setCopyButtonText("Copied")
    navigator.clipboard.writeText(shortenedLink);
    
  }

  


  return(
        
  <div className="createBody">


    <div className="navbar">
      <img id ="logo" src="https://svgshare.com/i/nc7.svg"/>
      <div className="Login_button"><a className="Login_text">Features</a></div>
      <div className="Login_button"><a href="https://www.google.com" className="Login_text">Login</a></div>
      <button className="Signup_button"><img id="signup_logo" src="https://i.ibb.co/5T9GvzB/Nice-Png-my-account-png-5010656.png"/><a className="Signup_text">Sign up</a></button>
      


    </div> 

    <div className="main_head">
      <p id="main_title" style={{color:"#071160"}}>Your shortened link :</p>
      <QRCodeCanvas id="qr_code_image"value={shortenedLink} style={{width:'45%', height:'45%'}} bgColor={qrCodeBg} onClick={saveQrCode}/>
      <div id="link_container" style={{color:"#071160"}}><p id="link">{"linkshortener.app/"+ idToSendToDatabase}</p><button id="copy_button" type="button" style={{backgroundColor:copyButtonColour}} onClick={copyToClipboard}>{copyButtonText}</button></div>
      <button id="button" type="button" onClick={()=>navigate("/")}>New link</button>

      
    </div>

    





  </div>);
}

export default App;
