import './Category.css'
import {useState} from 'react'
import {AiFillDelete} from 'react-icons/ai'
import DeleteModal from '../../Tasks/Task/UpdateTask/DeleteModal/DeleteModal'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Category = (props) => {
    const user = JSON.parse(localStorage.getItem('user'))
    const navigate = useNavigate()
    const categories_api = 'https://task-on-production.up.railway.app/api/categories/'
    const [readyToDelete, setReadyToDelete] = useState(false)
    const handleDeleteModal = () =>{
        setReadyToDelete(!readyToDelete)
    }
    const handleDelete = () =>{
        axios.delete(categories_api + props.category.$id, {
            headers: {
                'Authorization': `Bearer ${user.myToken}`
            }
        })
        .then(res=>{
            if(res.status === 200){
                navigate('/dashboard')
                setReadyToDelete(false)
                props.controlOpen()
            }
            else{
                alert('SOMETHING WENT WRONG!')
                localStorage.clear()
                navigate('/login')
            }
        })
        .catch(error=>{
            return;
        })
    }
    const handleClick = () => {
        props.handleMyCategory(props.category.name)
    }
    return ( 
        <li className='category'>
            <em onClick={handleClick}>{props.category.name}</em>
            <AiFillDelete size={20} color='gray' cursor={'pointer'} onClick={handleDeleteModal}/>
            {readyToDelete && <DeleteModal
                name = {'Category'}
                onClick = {handleDeleteModal}
                handleDelete={handleDelete}
            />}
        </li>
    );
}
export default Category;