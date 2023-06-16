import axios from "axios";
import { useState } from "react";
import ValidateCreateCategory from "../../Components/Pages/Create/CreateCategory/ValidateCreateCategory";
import CreateCategoryContext from "./CreateCategoryContext";

const CreateCategoryContextProvider = (props) => {
    const user = JSON.parse(localStorage.getItem('user'))
    const category_api = 'https://task-on-production.up.railway.app/api/categories'
    const [formData, setFormData] = useState({
        category: ''
    })
    const [createCategoryErrors, setCreateCategoryErrors] = useState({})
    const [ready,setReady] = useState(false)
    const handleCreate = () => {
        setReady(!ready)
    }
    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData((prev)=>{
            return (
                {...prev, [name]:value}
            )
        })
    }
    const handleSubmit = async () => {
        const categoryData = {
            name: formData.category
        }
        const formErrors = ValidateCreateCategory(categoryData)
        setCreateCategoryErrors(formErrors)
        if(formErrors.all === ""){
            await axios.post(category_api, {...categoryData},{
                headers: { 
                    'Authorization': `Bearer ${user.myToken}`
                }
            })
            .then(res=>{
                if(res.status === 200){
                    handleCreate()
                    setFormData({
                        category: ''
                    })
                }
                else{
                    alert('SOMETHING WENT WRONG!')
                    localStorage.clear()
                }
            })
            .catch(error=>{
                return
            })
        }
    }
    const updatedContext = {
        formData:formData,
        createCategoryErrors: createCategoryErrors,
        ready:ready,
        handleChange: handleChange,
        handleCreate:handleCreate,
        handleSubmit: handleSubmit
    }
    return (  
        <CreateCategoryContext.Provider value={updatedContext}>
            {props.children}
        </CreateCategoryContext.Provider>
    );
}
 
export default CreateCategoryContextProvider;