import axios from "axios";
import { useContext, useState } from "react";
import ValidateResetPassword from "../../../Components/Pages/Authentication/ForgotPassword/ResetPassword/ValidateResetPassword";
import ConfirmForgotPasswordContext from "../ForgotPasswordContext/ConfirmForgotPasswordContext/ConfirmForgotPasswordContext";
import ForgotPasswordContext from "../ForgotPasswordContext/ForgotPasswordContext";
import ResetPasswordContext from "./ResetPasswordContext";

const ResetPasswordContextProvider = (props) => {
    const reset_api = 'https://task-on-production.up.railway.app/api/auth/change-password'
    const ctx = useContext(ForgotPasswordContext)
    const otpCtx = useContext(ConfirmForgotPasswordContext)
    const [formData, setFormData] = useState({
        newPassword: '',
        confirmPassword: ''
    })
    const [visible, setVisible] = useState(false)
    const [confirmIsVisible, setConfirmIsVisible] = useState(false)
    const handleVisibility = () => {
        setVisible(!visible)
    }
    const handleConfirmVisibility = () => {
        setConfirmIsVisible(!confirmIsVisible)
    }
    const [resetErrors, setResetErrors] = useState({})
    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData(prev=>{
            return(
                {...prev, [name]: value}
            )
        })
    }
    const handleSubmit = async () => {
        let successes = {}
        const resetData = {
            password: formData.newPassword,
            confirmPassword: formData.confirmPassword,
            email: ctx.formData.email,
            otp: otpCtx.otp
        }
        const formErrors = ValidateResetPassword(resetData)
        setResetErrors(formErrors)
        if(formErrors.all === ""){
            await axios.post(reset_api, {...resetData})
            .then(res=>{
                if(res.status === 200){
                    setFormData({
                        newPassword: '',
                        confirmPassword: ''
                    })
                    successes.resetSuccess = true
                }
            })
            .catch(error=>{
                return error
            })
        }
        return successes
    }
    const updatedContext = {
        visible: visible,
        confirmIsVisible: confirmIsVisible,
        formData: formData,
        resetPasswordErrors: resetErrors,
        handleVisibility: handleVisibility,
        handleConfirmVisibility: handleConfirmVisibility,
        handleChange: handleChange,
        handleSubmit: handleSubmit

    }
    return ( 
        <ResetPasswordContext.Provider value={updatedContext}>
            {props.children}
        </ResetPasswordContext.Provider>
     );
}
 
export default ResetPasswordContextProvider;