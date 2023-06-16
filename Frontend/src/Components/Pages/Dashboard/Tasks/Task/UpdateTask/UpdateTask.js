import axios from 'axios';
import { useState } from 'react';
import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UpdateTaskContext from '../../../../../../Contexts/UpdateTaskContextProvider/UpdateTaskContext';
import Header from '../../../../../Header/Header';
import './UpdateTask.css'
import ValidateUpdateTask from './ValidateUpdateTask';
import DeleteModal from './DeleteModal/DeleteModal';
import React from 'react'
const UpdateTask = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const editTask_api = 'https://task-on-production.up.railway.app/api/tasks/'
    const ctx = useContext(UpdateTaskContext)
    const navigate = useNavigate()
    const [updateTaskErrors, setUpdateTaskErrors] = useState({})
    const [readyToDelete, setReadyToDelete] = useState(false)
    const {id} = useParams()
    
    useEffect(()=>{
        const getMyTask = async () =>{ 
            await axios.get(editTask_api + id,{
                headers: {
                    'Authorization': `Bearer ${user.myToken}`
                }
            })
            .then(res=>{
                const taskData = res.data.data
                setFormData({
                    title: taskData.title,
                    description:taskData.description,
                    deadline: taskData.deadline.substr(0,10)
                })
            })
            .catch(err=>{
                console.log(err)
                return;
            })
        }
        getMyTask()
    },[])
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        deadline: ''
    })
    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData(prev=>{
            return(
                {...prev, [name]:value}
            )
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const updateData = {
            title:formData.title,
            description:formData.description,
            deadline:formData.deadline,
            status: ctx.status
        }
        const formErrors = ValidateUpdateTask(updateData)
        setUpdateTaskErrors(formErrors)
        if(formErrors.all === ""){
            await axios.patch((ctx.update_api + id), {...updateData},{
                headers: {
                    'Authorization': `Bearer ${user.myToken}`
                }
            })
            .then(res=>{
                if(res.status === 200){
                    navigate('/dashboard')
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
    const handleDeleteModal = () => {
        setReadyToDelete(!readyToDelete)
    }
    const handleDelete = () => {
        ctx.deleteTask(id).then(res=>{
            if(res.deleteSuccess){
                navigate('/dashboard')
            }
        })
    }
    return ( 
        <React.Fragment>
            <section className='updateTask'>
                <Header/>
                <div className="card updateCard">
                    <div className="background update-bg"></div>
                    <div className="formBlock">
                        <div className="div">
                            <div className="updateForm">
                                <h2>Update Task</h2>
                                <form className='myForm update' onSubmit={handleSubmit}>
                                    <div className="formElement">
                                        <label htmlFor="title">
                                            Title
                                            <small>{updateTaskErrors.title}</small>
                                        </label>
                                        <input type="text" className={updateTaskErrors.title ? 'error': ''} name='title' onChange={handleChange} value={formData.title}/>
                                    </div>
                                    <div className="formElement">
                                        <label htmlFor="description">
                                            Description
                                            <small>{updateTaskErrors.description}</small>
                                        </label>
                                        <textarea name="description" className={updateTaskErrors.description ? 'error': ''} id="" cols="30" rows="10" onChange={handleChange} value={formData.description}></textarea>
                                    </div>
                                    <div className="formElement">
                                        <label htmlFor="date">
                                            Deadline
                                            <small>{updateTaskErrors.deadline}</small>
                                        </label>
                                        <input type="date" name='deadline' className={updateTaskErrors.deadline ? 'error': ''} onChange={handleChange} value={formData.deadline} />
                                    </div>
                                    <div className="formActions">
                                        <div className="updateActions">
                                            <button className='animated bounce' type='submit'>Update</button>
                                            <button className='updateTaskBtn animated bounce' onClick={ctx.handleStatus} type='button'>Mark as Completed</button>    
                                        </div>  
                                        <button onClick={handleDeleteModal} className='removeBtn animated bounce' type='button'>Delete</button>
                                        {readyToDelete && <DeleteModal
                                            name={'Task'}
                                            onClick={handleDeleteModal}
                                            handleDelete={handleDelete}
                                        />}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
}
export default UpdateTask;