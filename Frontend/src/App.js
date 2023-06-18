import './App.css';
import Home from './Components/Pages/Home/Home';
import { Route, Routes } from 'react-router-dom';
import LogIn from './Components/Pages/Authentication/LogIn/LogIn';
import SignUp from './Components/Pages/Authentication/SignUp/SignUp';
import ForgotPassword from './Components/Pages/Authentication/ForgotPassword/ForgotPassword';
import CreateTask from './Components/Pages/Create/CreateTask/CreateTask';
import DashBoard from './Components/Pages/Dashboard/DashBoard';
import Profile from './Components/Pages/Profile/Profile';
import SignUpContextProvider from './Contexts/AuthContextProvider/SignUpContext/SignUpContextProvider';
import LogInContextProvider from './Contexts/AuthContextProvider/LogInContext/LogInContextProvider';
import ConfirmEmail from './Components/Pages/Authentication/SignUp/ConfirmEmail/ConfirmEmail';
import CreateTaskContextProvider from './Contexts/TaskContextProvider/CreateTaskContextProvider/CreateTaskContextProvider';
import UpdateTask from './Components/Pages/Dashboard/Tasks/Task/UpdateTask/UpdateTask';
import UpdateTaskContextProvider from './Contexts/UpdateTaskContextProvider/UpdateTaskContextProvider';
import SignUpSuccess from './Components/Pages/Authentication/SignUp/SignUpSuccess/SignUpSuccess';
import CreateCategoryContextProvider from './Contexts/CreateCategoryContext/CreateCategoryContextProvider';
import ResetPassword from './Components/Pages/Authentication/ForgotPassword/ResetPassword/ResetPassword';
import ForgotPasswordContextProvider from './Contexts/AuthContextProvider/ForgotPasswordContext/ForgotPasswordContextProvider';
import ResetPasswordContextProvider from './Contexts/AuthContextProvider/ResetPasswordContext/ResetPasswordContextProvider';
import ConfirmForgotPassword from './Components/Pages/Authentication/ForgotPassword/ConfirmForgotPassword/ConfirmForgotPassword';
import ConfirmForgotPasswordContextProvider from './Contexts/AuthContextProvider/ForgotPasswordContext/ConfirmForgotPasswordContext/ConfirmForgotPasswordContextProvider';
import LogOut from './Components/Pages/Authentication/LogOut/LogOut';
function App() {
  return (
    <SignUpContextProvider>
      <LogInContextProvider>
        <ForgotPasswordContextProvider>
          <ConfirmForgotPasswordContextProvider>
            <ResetPasswordContextProvider>
              <CreateTaskContextProvider>
                <UpdateTaskContextProvider>
                  <CreateCategoryContextProvider>
                    <div className="App"> 
                        <Routes>
                          <Route exact path='/' element={<Home/>}/>
                          <Route path='/signup' element={<SignUp/>}/>
                          <Route path='/login' element={<LogIn/>}/>
                          <Route path='/forgot' element={<ForgotPassword/>}/>
                          <Route path='/reset' element={<ResetPassword/>}/>
                          <Route path='/create' element={<CreateTask/>}/>
                          <Route path='/dashboard' element={<DashBoard/>}/>
                          <Route path='/profile' element={<Profile/>}/>
                          <Route path='/confirmEmail' element={<ConfirmEmail/>}/>
                          <Route path='/confirmReset' element={<ConfirmForgotPassword/>}/>
                          <Route path='/tasks/:id' element={<UpdateTask/>}/>
                          <Route path='/success' element={<SignUpSuccess/>}/>
                          <Route path='/logout' element={<LogOut/>}/>
                        </Routes>
                    </div>
                  </CreateCategoryContextProvider>
                </UpdateTaskContextProvider>
              </CreateTaskContextProvider>
            </ResetPasswordContextProvider>
          </ConfirmForgotPasswordContextProvider>
        </ForgotPasswordContextProvider>
      </LogInContextProvider>
    </SignUpContextProvider>
  );
}

export default App;
