import Navbar from '../../Header/Navbar/Navbar';
import {CgProfile} from 'react-icons/cg'
import {MdEmail} from 'react-icons/md'
import './Profile.css'
import {useNavigate} from 'react-router-dom'
import {useState} from 'react'
import axios from 'axios';
import ValidateProfile from './ValidateProfile';
const Profile = () => {
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'))
    const user_api = 'https://task-on-production.up.railway.app/api/users/'
    const uploadUrl = 'https://task-on-production.up.railway.app/api/users/update-profile/'
    const [myImage, setMyImage] = useState('')
    const [error, setError] = useState({})
    const handleImage = (e) => {
        setMyImage(e.target.files[0])
    }
    const getUser = async() =>{
        await axios.get(user_api + user.myId, {
            headers: {
                'Authorization': `Bearer ${user.myToken && user.myToken}`
            }
        })
        .then(res=>{
            console.log(res)
            if(res.status === 200){
                const myData = res.data.data
                const myUserData = {
                    email:user.email,
                    firstname: user.firstname,
                    lastname:user.lastname,
                    myToken: user.myToken,
                    myId: user.myId,
                    profileImage: myData.user.profile_image
                }
                localStorage.setItem('user', JSON.stringify(myUserData))
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
    const handleUpload = async () =>{
        const fileError = ValidateProfile(myImage.name)
        setError(fileError)
        if(fileError.all === ""){
            const data = {
                profile_image: myImage,
                firstname: user.firstname
            }
            await axios.patch(uploadUrl + user.myId, {...data}, {
                headers : {
                    'Authorization': `Bearer ${user.myToken}`,
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(res=>{
                if(res.status === 200){
                    getUser()
                    navigate('/dashboard')
                }
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }
    return ( 
        <section className='profile'>
            <Navbar/>
            <div className="profileBody">
                <h2>Hey there!</h2>
                <div className="userProfile">
                    <div className="displayPicture">
                        <img src="" alt="" />
                    </div>
                    <div className="elementBlock">
                        <CgProfile size={25}/>:
                        <h4>{user.lastname} {user.firstname}</h4>
                    </div>
                    <div className="elementBlock">
                        <MdEmail size={25}/>:
                        <h4>{user.email}</h4>
                    </div>
                </div>
                <div className="userActions">
                    <form>
                        <div className="formElement">
                            <label htmlFor="image">
                                Add a display picture!
                                {<small>{error.fileError}</small>}
                            </label>
                            <input type="file" name="myFile" onChange={handleImage} />
                        </div>
                    </form>
                    <button onClick={handleUpload} className='animated bounce'>Upload</button>
                </div>
            </div>
        </section>
    );
}
 
export default Profile;