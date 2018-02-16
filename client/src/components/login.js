import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import googleButton from "../assets/images/google-login.png";
import Privacy from './privacy_policy'; 

class Login extends Component {
    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return (
                    <div>
                        <span>
                            <a href="/auth/google"><img src={googleButton} /></a>
                        </span>
                        <br/>
                        <Link to="/privacy" target="_blank">Privacy Policy</Link>
                    </div>
                );
            default:
                return(
                    <span>
                        <a className="landing-login-text" href="/api/logout"><button className="btn logoutBtn">LOGOUT</button></a>
                    </span>


                ) 
        }
    }

    render() {
        // console.log(this.props);
        return (
            <div>   
                {this.renderContent()}
            </div>

        );
    }
}
function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Login); 
