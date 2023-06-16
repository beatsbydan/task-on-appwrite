import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai'
import ResetPasswordContext from '../../../../../Contexts/AuthContextProvider/ResetPasswordContext/ResetPasswordContext';
import './ResetPassword.css'
import React from 'react'
const ResetPassword = () => {
    const ctx = useContext(ResetPasswordContext)
    const navigate = useNavigate()
    const handleSubmit = () =>{
        ctx.handleSubmit().then(res=>{
            if(res.resetSuccess){
                navigate('/success')
            }
        })
    }
    return ( 
        <React.Fragment>
            <div className="card">
                <div className="background reset-bg"></div>
                <div className="formBlock">
                    <div className="div">
                        <div className="resetForm">
                            <h2>Reset Password</h2>
                            <form className="myForm reset">
                                <div className="formElement">
                                    <label htmlFor="password">
                                        New Password:
                                        <small>{ctx.resetPasswordErrors.password}</small>
                                    </label>
                                    <div className="passwordBlock">
                                        <input type={ctx.visible ?"text":"password"} name="newPassword" placeholder='Enter new password' autoComplete='on' value={ctx.formData.newPassword} onChange = {ctx.handleChange} />
                                        {ctx.visible ? <AiOutlineEyeInvisible className='visibility' onClick={ctx.handleVisibility} size={25}/> : <AiOutlineEye  onClick={ctx.handleVisibility} size={25} className='visibility'/>}
                                    </div>
                                </div>
                                <div className="formElement">
                                    <label htmlFor="password">
                                        Confirm Password:
                                        <small>{ctx.resetPasswordErrors.confirmPassword}</small>
                                    </label>
                                    <div className="passwordBlock">
                                        <input type={ctx.confirmIsVisible ? "text":"password"} name='confirmPassword' placeholder='Make sure passwords match' autoComplete='on' value={ctx.formData.confirmPassword} onChange = {ctx.handleChange} />
                                        {ctx.confirmIsVisible ? <AiOutlineEyeInvisible className='visibility' onClick={ctx.handleConfirmVisibility} size={25}/> : <AiOutlineEye  onClick={ctx.handleConfirmVisibility} size={25} className='visibility'/>}
                                    </div>                            </div>
                                <div className="formActions">
                                    <button onClick={handleSubmit} className='animated bounce' type="button">Reset</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
export default ResetPassword;