import axios from "axios";
import ProfileContext from "./ProfileContext";
const ProfileContextProvider = (props) => {
    const user = JSON.parse(localStorage.getItem('user'))
    const user_api = 'https://task-on-production.up.railway.app/api/users/'
    const getUser = async(id) =>{
        await axios.get(user_api + id, {
            headers: {
                'Authorization': `Bearer ${user.myToken}`
            }
        })
        .then(res=>{
            if(res.status === 200){
                const myData = res.data.data
                const myUserData = {
                    email:myData.email,
                    firstname: myData.firstname,
                    lastname:myData.lastname,
                    profileImage: myData.profile_image
                }
                localStorage.setItem('userProps', JSON.stringify(myUserData))
            }
            else{
                alert('SOMETHING WENT WRONG')
                localStorage.clear()
            }
        })
        .catch(err=>{
            return err
        })
    }
    const updatedContext ={
        getUser: getUser
    }
    return ( 
        <ProfileContext.Provider value={updatedContext}>
            {props.children}
        </ProfileContext.Provider>
    );
}

export default ProfileContextProvider;