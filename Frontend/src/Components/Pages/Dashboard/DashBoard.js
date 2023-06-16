import Header from '../../Header/Header';
import './DashBoard.css'
import {useContext, useEffect} from 'react'
import Tasks from './Tasks/Tasks';
import React from 'react'
import ProfileContext from '../../../Contexts/ProfileContextProvider/ProfileContext'
const DashBoard = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const ctx = useContext(ProfileContext)
    useEffect(()=>{
        ctx.getUser(user.myId)
    },[])
    
    return ( 
        <React.Fragment>
            <section className='dashboard'>
                <Header/>
                <div className="intro">
                    <h1>Welcome <span>{user.firstname}</span>!</h1>
                    <p> 
                        Create categories to help structure your 
                        <span><span className='taskText'>TASKS</span> and <span className='schedules'>SCHEDULES</span>!</span>
                    </p>
                </div>
                <div className="tasksSection">
                    <Tasks/>
                </div>
            </section>
        </React.Fragment>
        
    );
}
export default DashBoard;