import React, { Component } from 'react';
import "./Login.css";
import { connect } from 'react-redux';
import { login } from '../../apis/session';
import 'bulma/css/bulma.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faUserLock, faKey, faAddressCard } from '@fortawesome/free-solid-svg-icons';
library.add(faEnvelope, faUserLock, faKey, faAddressCard);

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }

    updateUsername = (e) => {
        this.setState({
            username: e.target.value
        });

    }
    updatePassword = (e) => {
        this.setState({
            password: e.target.value
        });
    }

    login = () => {
        this.props.onLogin(this.state, async (object) => {
            this.props.history.push('/dashboard')
        });
    }

    render() {
        return (
            <div className="outer notification background-light">
                <div className="center titleContainer has-background-dark">
                    <p className="has-text-white title">Sign In</p>
                </div>
                <div className="vessel">
                    <div className="columns">
                        <div className="column is-one-third">
                            <FontAwesomeIcon className="right" icon="user-lock" size="2x" />
                        </div>
                        <div className="column is-one-third">
                            <input className={this.state.username === '' ? 'input' : 'input is-success'}
                                type="text"
                                name={this.state.username}
                                placeholder="Username"
                                onChange={this.updateUsername} />
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column is-one-third">
                            <FontAwesomeIcon className="right" icon="key" size="2x" />
                        </div>
                        <div className="column is-one-third">
                            <input className={this.state.password === '' ? 'input' : 'input is-success'}
                                type="password"
                                name={this.state.password}
                                placeholder="Password"
                                onChange={this.updatePassword} />
                        </div>
                    </div>
                </div>
                <div className="vessel">
                    <button
                        className={(this.state.username === '' || this.state.password === '') ? 'button submit-button' : 'button is-danger submit-button'} onClick={this.login}
                        disabled={this.state.username === '' || this.state.password === ''}>Submit</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isLoggedIn: state.session.isLoggedIn,
        session: state.session,
        error: state.error,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (userData, cb) => { dispatch(login(userData, cb)); },
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
