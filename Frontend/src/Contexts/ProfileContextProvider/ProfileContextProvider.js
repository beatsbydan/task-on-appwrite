import axios from "axios";
import {useState} from 'react'
import ProfileContext from "./ProfileContext";
const ProfileContextProvider = (props) => {
    const token = localStorage.getItem('myToken')
    const user_api = 'https://task-on-production.up.railway.app/api/users/'
    const [userData, setUserData] = useState({})
    const getUser = async(id) =>{
        axios.get(user_api + id, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res=>{
            if(res.status === 200){
                const myData = res.data.data
                setUserData({
                    email:myData.email,
                    firstname: myData.firstname,
                    lastname:myData.lastname,
                    prfileImage: myData.profile_image
                })
            }
            else{
                alert('SOMETHING WENT WRONG')
                localStorage.clear()
            }
        })
    }
    const updatedContext ={
        userData: userData,
        getUser: getUser
    }
    return ( 
        <ProfileContext.Provider value={updatedContext}>
            {props.children}
        </ProfileContext.Provider>
    );
}

export default ProfileContextProvider;