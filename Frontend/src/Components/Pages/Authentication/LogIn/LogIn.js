import { useState } from 'react';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai'
import LogInContext from '../../../../Contexts/AuthContextProvider/LogInContext/LogInContext';
import React from 'react'
import './LogIn.css'
const LogIn = () => {
    const ctx = useContext(LogInContext)
    const [responseErr, setResponseErr] = useState('')
    const navigate = useNavigate()
    const handleLogin = () => {
        ctx.handleSubmit().then(res=>{
            if(res.logInSuccess === true){
                navigate('/dashboard')
            }
            else if (res.logInSuccess === null){
                alert('SOMETHING WENT WRONG')
                navigate('/login')
                return
            }
            else{
                setResponseErr('Invalid credentials')
            }
        })
    }
    return ( 
        <React.Fragment>
            <div className="card">
            <div className="background login-bg"></div>
            <div className="formBlock">
                <div className="div">
                    <div className="logInForm">
                        <h2>Log In</h2>
                        <form className='myForm login'>
                            <div className="formElement">
                                <label htmlFor="username">
                                    Email
                                    <small>{ctx.formErrors.email}</small>
                                </label>
                                <input className={ctx.formErrors.email ?'error' : ''} type="email" name='email' placeholder='example@example.com' value={ctx.formData.email} autoComplete="on" onChange={ctx.handleChange} />
                            </div>
                            <div className="formElement">
                                <label htmlFor="password">
                                    Password
                                    <small>{responseErr !== "" ? responseErr :''} {ctx.formErrors.password}</small>
                                </label>
                                <div className="passwordBlock">
                                    <input className={ctx.formErrors.password || responseErr ?'error' : ''} type={ctx.visible? "text":"password"} name='password' value={ctx.formData.password} autoComplete="on" onChange={ctx.handleChange} />
                                    {ctx.visible ? <AiOutlineEyeInvisible className='visibility' onClick={ctx.handleVisibility} size={25}/> : <AiOutlineEye  onClick={ctx.handleVisibility} size={25} className='visibility'/>}
                                </div>
                            </div>
                            <div className="formActions">
                                <button type='button' className='animated bounce' onClick={handleLogin}>Login</button>
                            </div>
                        </form>
                        <p className='logInText'>Forgot Password? Click <span><Link to={'/forgot'}>here</Link></span></p>
                    </div>
                </div>
            </div>
        </div>
        </React.Fragment>
        
    );
}

export default LogIn;