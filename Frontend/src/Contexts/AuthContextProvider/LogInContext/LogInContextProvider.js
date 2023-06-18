import axios from "axios";
import { useState } from "react";
import ValidateLogin from "../../../Components/Pages/Authentication/LogIn/ValidateLogIn";
import LogInContext from "./LogInContext";
const LogInContextProvider = (props) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [visible, setVisible] = useState(false)
    const handleVisibility = () => {
        setVisible(!visible)
    }
    const logIn_api = 'https://task-on-production.up.railway.app/api/auth/login'
    const [logInErrors, setLogInErrors] = useState({})
    const handleSubmit = async () => {
        let success = {};
        const logInDetails = {
            email: formData.email,
            password: formData.password
        }
        const formErrors = ValidateLogin(logInDetails)
        setLogInErrors(formErrors)
        if(formErrors.all === ""){
            await axios.post(logIn_api, {...formData})
            .then(res=>{
                if(res.status === 200){
                    setFormData({
                        email: '',
                        password: ''
                    })
                    const myData = res.data.data
                    const userData = {
                        email:myData.user.email,
                        firstname: myData.user.firstname,
                        lastname:myData.user.lastname,
                        profileImage: myData.user.profile_image,
                        myToken: myData.token,
                        myId: myData.user.$id
                    }
                    localStorage.setItem('user', JSON.stringify(userData)) 
                    localStorage.setItem('isLoggedIn', JSON.stringify(true))
                    success.logInSuccess = true
                }
                if(res.status === 401){
                    success.logInSuccess = false
                }
            })
            .catch(error=>{
                if(error.code === "ERR_NETWORK"){
                    success.logInSuccess = null
                }
            })
        }
        else{
            success.logInSuccess = null
        }
        return success
    }
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev)=>{
            return {...prev, [name]: value}
        })
    }
    const updatedContext = {
        visible:visible,
        formData: formData,
        formErrors: logInErrors,
        handleVisibility: handleVisibility,
        handleChange: handleChange,
        handleSubmit: handleSubmit
    }
    return(
        <LogInContext.Provider value={updatedContext}>
            {props.children}
        </LogInContext.Provider>
    )
}

export default LogInContextProvider;