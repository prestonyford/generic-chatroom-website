import React from 'react';
import { AuthState } from './authState';

import './login.css';

export function Login({ username, authState, onAuthChange }) {
    const [usernameInput, setUsernameInput] = React.useState('');
    const [passwordInput, setPasswordInput] = React.useState('');
    const [loadingScreen, setLoadingScreen] = React.useState(false);

    React.useEffect(() => {
        setLoadingScreen(false);
    });

    async function create_account() {
        if (usernameInput === "" || passwordInput === "") {
            alert("Please enter a valid username and password")
            return;
        }
    
        // Call endpoint
        const response = await fetch('/api/auth/create', {
            method: 'post',
            body: JSON.stringify({ username: usernameInput, password: passwordInput }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
    
        if (response.ok) {
            attempt_login();
        }
        else {
            alert("An account with this username already exists");
        }
    }

    async function attempt_login() {
        setLoadingScreen(true);
        const response = await fetch('/api/auth/login', {
            method: 'post',
            body: JSON.stringify({ username: usernameInput, password: passwordInput }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
    
        if (response.ok) {
            localStorage.setItem("username", usernameInput);
            onAuthChange(usernameInput, AuthState.Authenticated);
        }
        else {
            alert("Incorrect login credentials");
        }
    }

    function logout() {
        setLoadingScreen(true);
        fetch(`/api/auth/logout`, {
            method: 'delete',
        }).then(() => {
            localStorage.removeItem('username');
            onAuthChange(usernameInput, AuthState.Unauthenticated)
        });
    }

    function handle_enter(e, target) {
        if (e.key === 'Enter') {
            target();
        }
    }

    return (
        <main className='container-fluid text-center'>
            {(authState === AuthState.Unknown || loadingScreen) && <p className="loading text-secondary">Loading</p>}
            {!loadingScreen && authState === AuthState.Unauthenticated && (
                <div id="login-window">
                    <nav>
                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                            <button className="nav-link active" id="nav-login-tab" data-bs-toggle="tab" data-bs-target="#nav-login" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Login</button>
                            <button className="nav-link" id="nav-create-tab" data-bs-toggle="tab" data-bs-target="#nav-create" type="button" role="tab" aria-controls="nav-create" aria-selected="false">Sign up</button>
                        </div>
                    </nav>
                    <div className="tab-content" id="nav-tabContent">
                        <div className="tab-pane fade show active" id="nav-login" role="tabpanel" aria-labelledby="nav-login-tab">
                            <div className="card" id="login-form">
                                <h2 className="form-title">Log in</h2>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="username-input">Username</label>
                                    <input type="text" id="username-login-field" className="username-input form-control" onChange={(e) => setUsernameInput(e.target.value)} onKeyDown={(e) => handle_enter(e, attempt_login)} />
                                </div>

                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="password-input">Password</label>
                                    <input type="password" id="password-login-field" className="password-input form-control" onChange={(e) => setPasswordInput(e.target.value)} onKeyDown={(e) => handle_enter(e, attempt_login)} />
                                </div>

                                <div className="d-flex justify-content-end">
                                    <button type="submit" className="btn btn-primary" id="submit-btn-login" onClick={attempt_login}>Log in</button>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="nav-create" role="tabpanel" aria-labelledby="nav-create-tab">
                            <div className="card" id="login-form">
                                <h2 className="form-title">Create Account</h2>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="username-input">Username</label>
                                    <input type="text" id="username-create-field" className="username-input form-control" onChange={(e) => setUsernameInput(e.target.value)} onKeyDown={(e) => handle_enter(e, create_account)}/>
                                </div>

                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="password-input">Password</label>
                                    <input type="password" id="password-create-field" className="password-input form-control" onChange={(e) => setPasswordInput(e.target.value)} onKeyDown={(e) => handle_enter(e, create_account)}/>
                                </div>

                                <div className="d-flex justify-content-end">
                                    <button type="submit" className="btn btn-primary" id="submit-btn-create" onClick={create_account}>Sign up</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {!loadingScreen && authState === AuthState.Authenticated && (<div id="logout-window" className="card">
                <h2 id="username-logout-window">{username}</h2>
                <div>
                    <a type="button" className="btn btn-primary" style={{marginRight: '10px'}}>View Rooms</a>
                    <button type="button" id="logout-button" className="btn btn-secondary" onClick={logout}>Logout</button>
                </div>
            </div>
            )}
        </main>
    );
}