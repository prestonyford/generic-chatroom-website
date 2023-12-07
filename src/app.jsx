import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { RoomSelection } from './room_selection/room_selection';
import { Chatroom } from './chatroom/chatroom';

import './app.css';

export default function App() {
    return (
        <BrowserRouter>
            <div className='body bg-dark text-light'>
                <header className="sticky-top border-bottom">
                    <div className="navbar navbar-expand-sm navbar-light green-header" style={{ padding: '0.8em' }}>
                        <div className="container-fluid">
                            <a className="navbar-brand">
                                <h2>Harmony</h2>
                            </a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-lg-0">
                                    <li className="nav-item active">
                                        <NavLink className='nav-link' to=''>Home</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className='nav-link' to='room-selection'>Rooms</NavLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </header>

                <Routes>
                    <Route path='/' element={<Login />} exact />
                    <Route path='/room-selection' element={<RoomSelection />} />
                    <Route path='/chatroom' element={<Chatroom />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>

                <footer className="green-footer">
                    <nav className="border-top">
                        <div className="container-fluid">
                            <span className="text-muted">Preston Ford •</span>
                            <a className="text-muted" href="https://github.com/prestonyford/startup">GitHub repo</a>
                        </div>
                    </nav>
                </footer>
            </div>
        </BrowserRouter>
    );
}

function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}