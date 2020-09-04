import $ from "jquery";
import React, { Component } from 'react';
import 'axios';
import Axios from 'axios';
import {API_BASE} from '../universal.js'
import NavigationBar from "./NavigationBar.js";
import UserAuthentication from "./UserAuthentication.js";
var AdminCSS = {
        marginTop:"20px",
        padding:"20px",
        border:"3px solid grey",
        borderRadius:"10px",
        backgroundColor:"",
        color:"black"
}


class Admin extends Component {

    componentWillMount(){
       
    }

    render() {
        return (

            <div className="container-fluid" style={{padding:"20px"}}>
                <NavigationBar></NavigationBar>
                {localStorage.getItem("LoginId")?
        <div>     
        <div className="row" align="center" style={{border:"0px solid olive",borderRadius:"10px", backgroundColor:"white", color:"black",padding:"15px", marginTop:"20px"}}>
            <div className="col-sm-12">
            <h3><sup></sup> Inventory Management <sub></sub></h3>
            </div>
        </div>
            <div className="row" align="center" style={AdminCSS}>
                <div className="col-sm-4">
                   <span id="ask_password" style={{color:"black"}}>Please re-enter your password to continue</span> <br/><br/>
                   

                    <div id="login_space" style={{borderRadius:"10px", border:"1px solid silver", padding:"20px", width:"100%"}}>
                       <input type="password" id="login_password" placeholder="Password" style={{padding:"10px", border:"0px",width:"100%"}}></input>
                        <br/>
                        <br/>
                        <button onClick={()=>{

//we are not using token authentication by using local storage, it shall be done in later iterations, as the page reloads, the user gets logged out
                           
                            let id = localStorage.getItem("LoginId");
                            Axios.get(API_BASE+"api/users/"+id)
                            .then((response)=>{
                                let pass = document.getElementById("login_password").value;
                                console.log(response.data);
                                if((response.data.HashedPassword == pass && response.data.IsVendor == true) || (response.data.HashedPassword == pass && response.data.IsVendor == true)){
                                    $(".vendor_only").fadeIn(1000);
                                    $("#login_space").fadeOut(1000);
                                    $("#ask_password").text("You are a vendor, you can add products.");
                                   // $("#logout_button").fadeIn();
                                } else {
                                    if(response.data.HashedPassword != pass){
                                        alert("Wrong Password");
                                    } else {
                                        alert("You are not registered as a Vendor");
                                    }
                                }
                            }).catch((err)=>{
                                alert(err);
                            })
                            
                        }} style={{padding:"10px", border:"0px", width:"100%"}}>Login</button>
                    </div>
                </div>
                <div align="left" className="col-sm-4 vendor_only" style={{display:"none",borderLeft:"1px solid black",borderRight:"1px solid black", width:"100%",borderRadius:"0px"}}>
                <h4 align="center"> Add Product</h4><br/>
                {/*add vendor id*/}
                 
                    
                    <span align="left">
                      
                        <input type="text" style={{border:"0px", marginBottom:"7px", paddingLeft:"5px"}} id="p_name" placeholder=" Product Name"></input> <br/><br/>
                        <input required type="text" style={{border:"0px", marginBottom:"7px", paddingLeft:"5px"}} id="p_price" placeholder=" Price in € (Integer)"></input> <br/><br/>
                      <input type="textarea" style={{border:"0px", marginBottom:"7px", paddingLeft:"5px"}} id="p_description" placeholder=" Description"></input> <br/><br/>
                         
                        <input type="radio" style={{border:"0px", marginBottom:"7px", marginLeft:"10px"}} id="p_in_stock" name="stock"></input>
                            <lable for="p_in_stock"> In stock </lable>  
                        <input type="radio" style={{border:"0px", marginBottom:"7px", marginLeft:"10px"}} id="p_not_in_stock" name="stock"></input>
                            <lable for="p_not_in_stock"> Not in stock </lable> 
                            <br/>
                       
                    </span><br/>

                    
                    
                    <button onClick = {
                        ()=>{
                            var name = document.getElementById('p_name').value;
                            var price = document.getElementById('p_price').value;
                            var description = document.getElementById('p_description').value;
                            var inStock;
                            document.getElementById('p_in_stock').checked?inStock=true:inStock=null;

                            Axios.post( API_BASE + "api/products",
                                 
                                {
                                    Name: name,
                                    Price: price,
                                    UserId: localStorage.getItem("LoginId"),
                                    Description: description,
                                    InStock:inStock
                                }
                            )
                            .then((response)=>{
                                console.log(response);
                                alert('Product has been added');
                            }).catch((err)=>{
                                alert("Please fill in the required info. correctly, also, Please check your internet connection and make sure you are connected to the server");
                            })
                        }
                    } style={{border:"0px", borderRadius:'5px'}}>Submit</button>
                </div>
                <div className="col-sm-4 vendor_only" style={{display:"none"}}>
                <h4>Data Info.</h4>
                <br/>
                  
                <div className="row" align="center">
                    
                    {/*List of all products*/}
                    <div className="col-sm-12"><button style={{padding:"9px",border:"0px", borderRadius:'5px'}}
                    onClick = {()=>{
                        Axios
                        .get(API_BASE + "api/products")
                        .then((response)=>{
                            document.getElementById('listing').innerHTML = JSON.stringify(response.data);
                        })
                    }}
                    >List of Products</button></div>

                    
                </div><br/>
                <div id="listing" align="left" style={{width:"100%", backgroundColor:"white", borderRadius:"5px", color:"black", overflowX:'scroll', padding:'15px', fontSize:'13px'}}></div>
                </div>
            </div>
            </div>:<UserAuthentication></UserAuthentication>
    }
            </div>
        );
    }
}

export default Admin;