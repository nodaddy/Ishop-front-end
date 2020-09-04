import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class NavigationBar extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-sm-6">
                    <table>
                        <tr>
                            <td>
                                <Link style={{textDecoration:"none", color:"black"}} to="/">||<b> iShop </b>|| dunnhumby</Link>
                            </td>
                            <th>
                                
                            </th>
                            {localStorage.getItem("LoginId")?<th style={{paddingLeft:"50px"}}>
                                <Link style={{textDecoration:"none"}} to="/admin">Admin Page</Link>
                            </th>:<th></th>
                            }
                            
                        </tr>
                    </table>
                </div>

                <div className="col-sm-6" align="right">
                    <table>
                        <tr>
        <th title={`Your Login id is '${localStorage.getItem("LoginId")}'`}> {localStorage.getItem("UserName")?`Hi! ${localStorage.getItem("UserName")}`:<span></span>}</th>
        {localStorage.getItem("LoginId")?
        <th style={{paddingLeft:"50px"}}>
                            <a style={{textDecoration:"none"}} href="#" onClick={()=>{
                                localStorage.removeItem("LoginId");
                                localStorage.removeItem("UserName");
                                document.location.reload();
                            }}>Logout</a>
                            </th>:<th></th>
                            }
                        </tr>
                    </table>
                </div>
            </div>
        );
    }
}

export default NavigationBar;