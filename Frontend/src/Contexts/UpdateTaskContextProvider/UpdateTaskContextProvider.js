import axios from "axios";
import { useState} from "react";
import UpdateTaskContext from "./UpdateTaskContext";

const UpdateTaskContextProvider = (props) => {
    const user = JSON.parse(localStorage.getItem('user'))
    const editTask_api = 'https://task-on-production.up.railway.app/api/tasks/'
    const [status, setStatus] = useState('PENDING')
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
    const handlePendingStatus = () => {
        setStatus('PENDING')
    }
    const handleStatusDone = () => {
        setStatus('DONE')
    }
    const getTask = async (id) =>{ 
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
    const deleteTask = async (id) => {
        let success = {}
        await axios.delete(editTask_api + id, {
            headers: {
                'Authorization': `Bearer ${user.myToken}`
            }
        })
        .then(res=>{
            if(res.status === 200){
                success.deleteSuccess = true
            }
        })
        return success
    }
    const updatedContext = {
        formData: formData,
        update_api: editTask_api,
        status: status,
        handleStatus: handleStatusDone,
        handlePendingStatus: handlePendingStatus,
        getTask: getTask,
        handleChange: handleChange,
        deleteTask: deleteTask,
    }
    return ( 
        <UpdateTaskContext.Provider value={updatedContext}>
            {props.children}
        </UpdateTaskContext.Provider>
    );
}
export default UpdateTaskContextProvider;