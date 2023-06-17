import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import Task from './Task/Task.js';
import './Tasks.css'
import Categories from '../Categories/Categories.js';
import { useNavigate } from 'react-router-dom';
const Tasks = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'))
    const categories_api = 'https://task-on-production.up.railway.app/api/categories'
    const categoryTasks_api = 'https://task-on-production.up.railway.app/api/tasks/category/'
    const tasks_api = 'https://task-on-production.up.railway.app/api/tasks'
    const [myTasks, setMyTasks] = useState([])
    const [categories, setCategories] = useState([])
    const [myCategory, setMyCategory] = useState('')
    const [myFilteredTasks, setMyFilteredTasks] = useState([])
    const noCategory = categories.length === 0 || myCategory === '' || myCategory === 'All'
    const [taskIsEmpty, setTaskIsEmpty] = useState(true)
    const [myFilteredTaskIsEmpty, setMyFilteredTaskIsEmpty] = useState(true)
    const [categoryIsEmpty, setCategoryIsEmpty] = useState(true)
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    useEffect(()=>{
         (axios.get(categories_api, {
            headers: {
                'Authorization': `Bearer ${user.myToken}`
            }
        })
        .then(res=>{
            console.log(res)
            if(res.status === 200){
                setCategories(res.data.data)
                setCategoryIsEmpty(false)
            }
            else{
                alert('SOMETHING WENT WRONG!')
                localStorage.clear()
                navigate('/login')
            }
        })
        .catch(error=>{
            return error;
        }))
    },[open])
    useEffect(()=>{
        const filterTasks = (category) => {
            setMyFilteredTasks([])
            if(noCategory){
                axios.get(tasks_api,{
                    headers: {
                        'Authorization': `Bearer ${user.myToken}`
                    }
                })
                .then(response=>{
                    console.log(response)
                    if(response.status === 200){
                        setTaskIsEmpty(false)
                        setMyTasks(response.data.data)
                    }
                    else{
                        alert('SOMETHING WENT WRONG!')
                        localStorage.clear()
                        navigate('/login')
                    }
                })
                .catch(error=>{
                    return error;
                })
            }
            else{
                axios.get(categoryTasks_api + category,{
                    headers: {
                        'Authorization': `Bearer ${user.myToken}`
                    }
                })
                .then(response=>{
                    console.log(response)
                    if(response.status === 200){
                        setMyFilteredTasks(response.data.data)
                        setMyFilteredTaskIsEmpty(false)
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
            
        }
         filterTasks(myCategory)
    },[myCategory, noCategory])
    
    const handleOpen = () => {
        setOpen(!open)
    }
    const handleMyCategory = (value) => {
        setMyCategory(value)
        setOpen(false)
    }
    return (
        <div className="tasksBlock">
            <div className="categoriesHandler">
                <Categories
                    isEmpty={categoryIsEmpty}
                    open = {open}
                    handleOpen={handleOpen}
                    myCategory = {myCategory}
                    categories = {categories}
                    handleMyCategory = {handleMyCategory}
                />
            </div>
            <div className='tasks'>
                {taskIsEmpty? <h1 className='defaultStatement'>Loading...</h1>:myTasks.length === 0?<h1 className='defaultStatement'>Add a Task!</h1>: <ul className='tasksList'>
                    {noCategory ? myTasks.map(task=>{
                        return(
                            <Task task={task} key={task.$id}/>
                        )
                    }):
                        myFilteredTaskIsEmpty?<h1 className='defaultStatement'>Loading...</h1>:myFilteredTasks.length === 0 ? <h1 className='defaultStatement'>No Task in this Category!</h1> : myFilteredTasks.map(task=>{
                            return(
                                <Task task={task} key={task.$id}/>
                            )
                        })                    
                    }
                </ul>}
            </div>
        </div> 
    );
}
export default Tasks;