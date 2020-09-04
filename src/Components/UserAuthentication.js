import React, { Component } from 'react';
import $ from 'jquery';
import Axios from 'axios';
import {API_BASE} from '../universal.js';
import './UserAuthentication.css';
let passStatus = function(){
  document.getElementById("password_match_status").innerHTML = $("#signup_password1").val() === $("#signup_password2").val() ? "Good match":"Passwords don't match";
 }

class UserAuthentication extends Component {
    render() {
        return (
          
                <div className="row">
                    <div className="col-sm-3"></div>
                    <div className="col-sm-6" style={{borderRadius:"10px", border:"1px solid silver", padding:"20px", width:"100%"}}>
                        <div id="login_form">
                             
                        <input type="text" id="login_userId" placeholder="User Id" style={{padding:"10px", border:"0px", width:"100%"}}></input>
                        <input type="password" id="login_password" placeholder="Password" style={{padding:"10px", border:"0px",width:"100%"}}></input>
                        <br/><br/>
                        {/*got to signup form*/}
                       <button type="submit" onClick = {()=>{
                           let id = document.getElementById("login_userId").value;
                           Axios.get(API_BASE+"api/users/"+id)
                           .then((response)=>{
                               let pass = document.getElementById("login_password").value;
                                
                               if(response.data.HashedPassword == pass){
                                   localStorage.setItem("LoginId", id);
                                   localStorage.setItem("UserName", response.data.FirstName);
                                   document.location.reload();
                               }}).catch((err)=>{
                                    alert(err);
                               })
                       }} style={{border:"1px solid silver",borderRadius:"10px", padding:"10px", backgroundColor:"white"}}>Log in</button>
                       <p><br/> or click <span className="hover_over" style={{color:"#007bff"}} onClick={()=>{
                           $("#signup_form").fadeIn();
                           $("#login_form").fadeOut();
                        }} >here</span> to register </p>
                        </div>

                        <div id="signup_form" style={{display:"none"}}>

                        <input type="text" id="first_name" placeholder="First Name" style={{padding:"10px", border:"0px",width:"100%"}}></input>
                        <input type="text" id="last_name" placeholder="Last Name" style={{padding:"10px", border:"0px",width:"100%"}}></input>  
                        <input type="password" id="signup_password1" placeholder="Password" style={{padding:"10px", border:"0px",width:"100%"}}></input>
                        <input type="password" onKeyUp={passStatus} id="signup_password2" placeholder="Confirm Password" style={{padding:"10px", border:"0px",width:"100%"}}></input>
                        <span id="password_match_status"></span>
                        <input type="text" id="address" placeholder="Address" style={{padding:"10px", border:"0px",width:"100%"}}></input>
                        <input type="radio" style={{marginLeft:'10px',border:"0px", marginBottom:"7px", paddingLeft:"5px"}} id="is_vendor" name="vendor"></input>
                        <lable for="is_vendor"> I'm a vendor too</lable>
                        <input type="radio" style={{marginLeft:'10px',border:"0px", marginBottom:"7px", paddingLeft:"5px"}} id="is_not_vendor" name="vendor"></input>
                        <lable for="is_vendor"> No, I'm not a vendor</lable>
                         
                        
                        <br/><br/>
                        {/*go to login form*/}
                       <button onClick={()=>{
                           var userName = "";
                           var password = $("#signup_password1").val();
                           var firstName = $("#first_name").val();
                           var lastName = $("#last_name").val();
                           var email = "";
                           var contactNumber = "";
                           var address = $("#address").val();
                           var isVendor = document.getElementById("is_vendor").checked?true:false;
                            
                           Axios.post(API_BASE + "api/users",{
                               Username : userName,
                               HashedPassword : password,
                               FirstName : firstName,
                               LastName : lastName,
                               Email : email,
                               ContactNumber : contactNumber,
                               Address : address,
                               IsVendor : isVendor
                           })
                           .then((response)=>{
                            console.log(response.data.UserId);
                            alert(`your UserId is '${response.data.UserId}', please remember it as it will be asked for logging in`);
                            localStorage.setItem("LoginId", response.data.UserId);
                            localStorage.setItem("UserName", response.data.FirstName);
                            document.location.reload();
                           // localStorage.setItem("UserId",response.data.UserId);
                           }).catch((err)=>{
                               alert("something went wrong" + err);
                           })
                       }} type="submit" style={{border:"1px solid silver",borderRadius:"10px", padding:"10px", backgroundColor:"white"}}>Sign up</button>
                       <p><br/> or click <span className="hover_over" style={{color:"#007bff"}} onClick={()=>{
                           $("#signup_form").fadeOut();
                           $("#login_form").fadeIn();
                       }}>here</span> to log in </p>
                        </div>
                        <div id="signup_form"></div>
                    </div>
                    <div className="col-sm-3"></div>
                </div>
             
        );
    }
}

export default UserAuthentication;