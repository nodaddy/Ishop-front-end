import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import UserAuthentication from './UserAuthentication';
import NavigationBar from "./NavigationBar";
class Home extends Component {
    render() {
        return (
            <div className="Container-fluid" style={{padding:"20px"}}>
                <NavigationBar></NavigationBar><br/><br/>
                {localStorage.getItem("LoginId")?<div>
                
                </div>: <UserAuthentication></UserAuthentication>}
            </div>
        );
    }
}

export default Home;