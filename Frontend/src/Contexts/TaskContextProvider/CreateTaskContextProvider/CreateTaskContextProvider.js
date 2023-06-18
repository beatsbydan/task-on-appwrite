import axios from "axios";
import { useState, useEffect } from "react";
import ValidateCreateTask from "../../../Components/Pages/Create/CreateTask/ValidateCreateTask";
import CreateTaskContext from "./CreateTaskContext";

const CreateTaskContextProvider = (props) => {
    const user = JSON.parse(localStorage.getItem('user')) 
    const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')) 
    const categories_api = 'https://task-on-production.up.railway.app/api/categories'
    const createTask_api = 'https://task-on-production.up.railway.app/api/tasks'
    
    const [open, setOpen] = useState(false)
    const [categories, setCategories] = useState([])
    const [myCategory, setMyCategory] = useState('')
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        deadline: '',
    })
    const [createTaskErrors, setCreateTaskErrors] = useState({})
    useEffect(()=>{
        isLoggedIn && axios.get(categories_api, {
            headers: {
                'Authorization': `Bearer ${user.myToken}`
            }
        })
        .then(res=>{
            console.log(res)
            if(res.status === 200){
                setCategories(res.data.data)
            }
        })
        .catch(error=>{
            return error
        })
    },[open])
    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData(prev=>{
            return(
                {...prev, [name]:value}
            )
        })
    }
    const handleMyCategory = (value) => {
        setMyCategory(value)
        handleOpen()
    }
    const handleOpen = () => {
        setOpen(!open)
    }
    const handleSubmit = async () => {
        let success = {}
        let createData = {}
        if(myCategory === ""){
            createData = {
                title:formData.title,
                description:formData.description,
                deadline:formData.deadline,
            }
        }
        else{
            createData = {
                title:formData.title,
                description:formData.description,
                deadline:formData.deadline,
                category: myCategory
            }
        }        
        const formErrors = ValidateCreateTask(createData)
        setCreateTaskErrors(formErrors)
        if(formErrors.all === ""){
            await axios.post(createTask_api, {...createData},{
                headers: {
                    'Authorization': `Bearer ${user.myToken}`
                }
            })
            .then(res=>{
                if(res.status === 200){
                    setFormData({
                        title: '',
                        description: '',
                        deadline: '',
                    })
                    setMyCategory('')
                    setOpen(false)
                    success.createSuccess = true
                }
                else{
                    alert('SOMETHING WENT WRONG!')
                    localStorage.clear()
                }
            })
            .catch(error=>{
                return error
            })
        }
        return success
    }
    const updatedContext = {
        formData: formData,
        createTaskErrors: createTaskErrors,
        categories: categories,
        myCategory: myCategory,
        open: open,
        handleSubmit: handleSubmit,
        handleChange: handleChange,
        handleOpen: handleOpen,
        handleMyCategory:handleMyCategory
    }
    return (
        <CreateTaskContext.Provider value={updatedContext}>
            {props.children}
        </CreateTaskContext.Provider>
    );
}
 
export default CreateTaskContextProvider;