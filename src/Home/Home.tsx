import React, {useState} from 'react';
import { BrowserRouter as Router, Routes , Route, Link, BrowserRouter, useLocation, useNavigate } from "react-router-dom";
import './Home.css';











function App() {

  const [linkToShorten, setLinkToShorten] = useState('')


  

  function generateId(length: any) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  function isUrl(s:any) {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return regexp.test(s);
 }

  let navigate = useNavigate();



  function shorten(){
  
    if(isUrl(linkToShorten)){

      //alert(linkToShorten)

      navigate("/create", { state: { link: linkToShorten, id:generateId(7) } });
    
      

      //location.state.claimedLink.toLowerCase()
    }else if(linkToShorten === ""){
      alert("Please enter a valid link")
    }
    else{
      navigate("/create", { state: { link: "http://"+ linkToShorten, id:generateId(7) } });



    }

    //var id = generateId(7);
    //const reference = ref(db, 'LinksDatabase/'  + id);
    //set to lowercase !!!!! .toLowerCase();
    //set(reference, {
    //link:linkToShorten
    //});

    
    

  }

  

  
  


  

  
  

  
 
  return (
    
    
    
    

        
    <div className="homeBody">


      <div className="navbar">
        <img id ="logo" src="https://svgshare.com/i/nc7.svg"/>
        <div className="Login_button"><a className="Login_text">Features</a></div>
        <div className="Login_button"><a href="https://www.google.com" className="Login_text">Login</a></div>
        <button className="Signup_button"><img id="signup_logo" src="https://i.ibb.co/5T9GvzB/Nice-Png-my-account-png-5010656.png"/><a className="Signup_text">Sign up</a></button>
        


      </div> 

      <div className="main_head">
        <span id="main_title" style={{color:"#071160"}}>Short. </span>
        <span id="main_title" style={{color:"#5237f3"}}>Share. </span>
        <span id="main_title" style={{color:"#0e99ec"}}>Track.</span>
        <h2 id="paragraph">SmartClick is a link management platform to shorten and track your links. It enables you to know which links are driving the best results and improve your marketing.</h2>
      </div>

      <div className="form_elements">
        <div id="form_div">
          
          <input id="link_input" type="text" placeholder="Paste a link and shorten it" onChange={event => setLinkToShorten(event.target.value)} >

          </input>
          <button id="button" type="button" onClick={shorten}>Shorten</button>

        </div>
      </div>

      <img className="img_header" src="https://i.ibb.co/BKThTrd/imgggggg.png"></img>





    </div>
  







//<input id="link_input" type="text" placeholder="yourname" onChange={event => setclaimedLink(event.target.value.toLowerCase())} /> 

// <Route path="" element={<p>Create your LinkStock now</p>}/>
//<Route path="*" element={<p>Welcome to {useLocation().pathname.replace("/", "")}'s LinkStock</p>}/>
//<li><img id ="logo" src="https://svgshare.com/i/nc7.svg"></img></li>
//<img id ="logo" src="https://svgshare.com/i/nc7.svg"/>



  // <Route path="" element={<p>Create your LinkStock now</p>}/>
  //<Route path="*" element={<p>Welcome to {useLocation().pathname.replace("/", "")}'s LinkStock</p>}/>
    
    
  );
}

export default App;
