import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import googleButton from "../assets/images/google-login.png";

class Login extends Component {
    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return (
                    <a href="/auth/google"><img src={googleButton} /></a>
                );
            default:
                return <a className="landing-login-text" href="/api/logout"><button className="btn logoutBtn">LOGOUT</button></a>
        }
    }

    render() {
        // console.log(this.props);
        return (
            <div>   
                <span>
                    {this.renderContent()}
                </span>
                <br/>
                <a href="https://docs.google.com/document/d/1m0GuxA6sBuDxuvYBVvk0rvynnn6jfVuN9AFvxeNqS9Q/edit?usp=sharing" target="_blank">Our Privacy Policy</a>
            </div>

        );
    }
}
function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Login); 
