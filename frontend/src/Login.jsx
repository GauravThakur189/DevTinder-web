import React from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addUser } from './userSlice'
import { useNavigate } from 'react-router'


const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [emailId, setEmailId] = React.useState('')
  const [password, setPassword] = React.useState('Gaurav@123')
  const [isLogin, setIsLogin] = React.useState(false)

  const handleLogin = ()=>{
   if (isLogin) {
    setIsLogin(false)
   } else {
     setIsLogin(true)
   }
  }
  const handleSignUp = async ()=>{
    try {
        const response = await axios.post('http://localhost:3000/signup', {
          firstName,
           lastName,
           emailId,
           password
        }, {
          withCredentials: true  
        })  
        //console.log("✅ SignUp success:", response?.data)
        dispatch(addUser(response.data.data))
       return navigate('/profile')
    } catch (error) {
      console.log("❌ SignUp failed:", error.response?.data || error.message)
      
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()  // Prevent default form submission
   // console.log("Email:", emailId, "Password:", password)
    try {
      const response = await axios.post('http://localhost:3000/login', {
        emailId,
        password
      }, {
        withCredentials: true  // optional if using cookies
      })
     // console.log("✅ Login success:", response?.data)
      dispatch(addUser(response.data))
      return navigate('/')
    } catch (error) {
      console.log("❌ Login failed:", error.response?.data || error.message)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center my-10">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title text-shadow-black">{isLogin ? "Login" : "SignUp"}</h2>
          {!isLogin &&  <><fieldset className="fieldset">
            <legend className="fieldset-legend">First Name</legend>
            <input 
              type="text" 
               value={firstName}
              className="input" 
              placeholder="Type here"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Last Name</legend>
            <input 
              type="text" 
              value={lastName}
              className="input" 
              placeholder="Type here" 
              onChange={(e) => setLastName(e.target.value)}
            />
          </fieldset> </>}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email Id</legend>
            <input 
              type="text" 
               value={emailId}
              className="input" 
              placeholder="Type here"
              onChange={(e) => setEmailId(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input 
              type="password" 
              value={password}
              className="input" 
              placeholder="Type here" 
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
          <div className="flex card-actions items-center justify-center">
            {isLogin ?<button 
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}>
              Login
            </button> : <button 
              type="button"
              className="btn btn-primary"
              onClick={handleSignUp}>
              SignUp
            </button>}
            <p className=' mx-5 cursor-pointer' onClick={handleLogin}>{isLogin ? "Don't have an account? SignUp" : "Already have an account? Login"}</p>
          </div>
         

        </div>
      </div>
    </div>
  )
}

export default Login




