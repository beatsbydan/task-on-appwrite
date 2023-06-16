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
    const user_api = 'https://task-on-production.up.railway.app/api/users/'
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
                console.log(res)
                if(res.status === 200){
                    setFormData({
                        email: '',
                        password: ''
                    })
                    localStorage.setItem('myToken', res.data.data.token)
                    localStorage.setItem('myId', res.data.data.user.$id)
                    success.logInSuccess = true
                    axios.get(user_api + res.data.data.user.$id, {
                        headers: {
                            'Authorization': `Bearer ${res.data.data.token}`
                        }
                    })
                    .then(res=>{
                        console.log(res)
                        if(res.status === 200){
                            const myData = res.data.data.user
                            console.log(myData)
                            const userData = {
                                email:myData.email,
                                firstname: myData.firstname,
                                lastname:myData.lastname,
                                profileImage: myData.profile_image
                            }
                            console.log(userData)
                            localStorage.setItem('user', JSON.stringify(userData))
                        }
                        else{
                            alert('SOMETHING WENT WRONG')
                            localStorage.clear()
                            success.logInSuccess = false
                        }
                    })
                    .catch(error=>{
                        console.log(error)
                    })
                }
                if(res.status === 401){
                    success.logInSuccess = false
                }
            })
            .catch(error=>{
                console.log(error)
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