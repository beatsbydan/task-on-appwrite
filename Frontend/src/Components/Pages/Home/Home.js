import { Link } from 'react-router-dom';
import './Home.css'
import React, { useEffect } from 'react'
const Home = () => {
    useEffect(()=>{
        localStorage.setItem('isLoggedIn', false)
    },[])
    return ( 
        <React.Fragment>
            <section className='home'>
                <div className="bg-section"></div>
                <div className="welcome">
                    <div className="welcome-contents">
                        <h1>Welcome to <span>Task<span>On</span>!</span></h1>
                        <p>Never lose track of your <span>daily <span>SCHEDULE.</span></span></p>
                        <button className='animated bounce'><Link to={'/signup'}>GET STARTED!</Link></button>
                    </div>
                </div>
            </section>
        </React.Fragment>    
    );
}

export default Home;