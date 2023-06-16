import Navbar from '../../Header/Navbar/Navbar';
import {CgProfile} from 'react-icons/cg'
import {MdEmail} from 'react-icons/md'
import './Profile.css'
import {useState} from 'react'
import axios from 'axios';
import ValidateProfile from './ValidateProfile';
const Profile = () => {
    const token = localStorage.getItem('myToken')
    const user = JSON.parse(localStorage.getItem('user'))
    const myId = localStorage.getItem('myId')
    const uploadUrl = 'https://task-on-production.up.railway.app/api/users/update-profile/'
    const [myImage, setMyImage] = useState('')
    const [error, setError] = useState({})
    const handleImage = (e) => {
        setMyImage(e.target.files[0])
    }
    const handleUpload = async () =>{
        const fileError = ValidateProfile(myImage.name)
        console.log(uploadUrl + myId)
        setError(fileError)
        if(fileError.all === ""){
            const data = {
                profile_image: myImage,
                firstname: user.firstname
            }
            console.log(data)
            axios.patch(uploadUrl + myId, {...data}, {
                headers : {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(res=>{
                console.log(res.data.data.profile_image)
                console.log(typeof(res.data.data.profile_image))
                localStorage.setItem('profileImage', res.data.data.profile_image )
            })
            .catch(err=>{
                console.log(err)
            })
            console.log('Valid')
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