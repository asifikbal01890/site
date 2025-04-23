import React from 'react';
import Navbar from '../Common/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Common/Footer/Footer';

const Mainlayouts = () => {
    return (
        <div>
            <div>
                <Navbar></Navbar></div>
            <div>
                <Outlet></Outlet></div>
            <div>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default Mainlayouts;