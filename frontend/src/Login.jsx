import React from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addUser } from './userSlice'
import { useNavigate } from 'react-router'


const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [emailId, setEmailId] = React.useState('rajan@gmail.com')
  const [password, setPassword] = React.useState('Gaurav@123')

  const handleSubmit = async (e) => {
    e.preventDefault()  // Prevent default form submission
    console.log("Email:", emailId, "Password:", password)
    try {
      const response = await axios.post('http://localhost:3000/login', {
        emailId,
        password
      }, {
        withCredentials: true  // optional if using cookies
      })
      console.log("✅ Login success:")
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
          <h2 className="card-title text-shadow-black">Login</h2>

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

          <div className="card-actions justify-end">
            <button 
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login





// import React, { useState } from 'react'
// import axios from 'axios'

// const Login = () => {
//   const [emailId, setEmailId] = useState('rajan@gmail.com')
//   const [password, setPassword] = useState('Gaurav@123')
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState(null)
//   const [loginSuccess, setLoginSuccess] = useState(false)

//   const handleSubmit = async (e) => {
//     e.preventDefault()  // Prevent default form submission
//     setIsLoading(true)
//     setError(null)
    
//     try {
//       const response = await axios.post('http://localhost:3000/login', {
//         emailId,
//         password
//       }, {
//         withCredentials: true  // for cookies
//       })
      
//       // Check if we got a response with data
//       if (response.data) {
//         console.log("✅ Login success:", response.data)
//         setLoginSuccess(true)
//       } else {
//         // Handle 204 No Content response
//         console.log("✅ Login successful, but no data returned")
//         setLoginSuccess(true)
//       }
//     } catch (error) {
//       console.log("❌ Login failed:", error.response?.data || error.message)
//       setError(error.response?.data?.message || "Login failed. Please try again.")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="flex flex-col items-center justify-center my-10">
//       <div className="card bg-base-300 w-96 shadow-lg">
//         <div className="card-body">
//           <h2 className="card-title text-xl font-bold mb-4">Login</h2>
          
//           {loginSuccess && (
//             <div className="alert alert-success mb-4">
//               Login successful!
//             </div>
//           )}
          
//           {error && (
//             <div className="alert alert-error mb-4">
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleSubmit}>
//             <fieldset className="mb-4">
//               <legend className="text-sm font-medium mb-1">Email Id</legend>
//               <input
//                 type="email"
//                 value={emailId}
//                 className="input input-bordered w-full"
//                 placeholder="Enter your email"
//                 onChange={(e) => setEmailId(e.target.value)}
//                 required
//               />
//             </fieldset>

//             <fieldset className="mb-6">
//               <legend className="text-sm font-medium mb-1">Password</legend>
//               <input
//                 type="password"
//                 value={password}
//                 className="input input-bordered w-full"
//                 placeholder="Enter your password"
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </fieldset>

//             <div className="card-actions justify-end">
//               <button
//                 type="submit"
//                 className="btn btn-primary"
//                 disabled={isLoading}
//               >
//                 {isLoading ? 'Logging in...' : 'Login'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Login





// import React, { useState } from 'react'
// import axios from 'axios'

// // Create a configured instance of axios
// const api = axios.create({
//   baseURL: 'http://localhost:3000',
//   withCredentials: true,
//   headers: {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json'
//   }
// });

// const Login = () => {
//   const [emailId, setEmailId] = useState('rajan@gmail.com')
//   const [password, setPassword] = useState('Gaurav@123')
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState(null)
//   const [loginSuccess, setLoginSuccess] = useState(false)
//   const [userData, setUserData] = useState(null)

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setIsLoading(true)
//     setError(null)
//     setUserData(null)
    
//     try {
//       // Use the configured axios instance
//       const response = await api.post('/login', {
//         emailId,
//         password
//       });
      
//       console.log("Full axios response:", response);
      
//       if (response.data && response.data.success) {
//         console.log("✅ Login success:", response.data);
//         setLoginSuccess(true);
//         setUserData(response.data.user);
        
//         // In a real app, you might store user info in context or redirect
//         // window.location.href = '/dashboard';
//       } else {
//         // This should not normally happen with proper error handling
//         setError("Login failed - unexpected response format");
//         console.log("Unexpected response format:", response);
//       }
//     } catch (error) {
//       console.log("❌ Login failed:", error);
      
//       const errorMessage = error.response?.data?.message || 
//                           error.message || 
//                           "Login failed. Please try again.";
                          
//       setError(errorMessage);
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   return (
//     <div className="flex flex-col items-center justify-center my-10">
//       <div className="card bg-base-300 w-96 shadow-lg">
//         <div className="card-body">
//           <h2 className="card-title text-xl font-bold mb-4">Login</h2>
          
//           {loginSuccess && (
//             <div className="alert alert-success mb-4">
//               <div>
//                 <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
//                 <span>Login successful!</span>
//               </div>
//             </div>
//           )}
          
//           {error && (
//             <div className="alert alert-error mb-4">
//               <div>
//                 <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
//                 <span>{error}</span>
//               </div>
//             </div>
//           )}
          
//           {userData && (
//             <div className="bg-base-200 p-4 rounded-lg mb-4">
//               <h3 className="font-bold text-lg mb-2">Welcome, {userData.firstName}!</h3>
//               <p className="text-sm">You have successfully logged in.</p>
//             </div>
//           )}

//           <form onSubmit={handleSubmit}>
//             <fieldset className="mb-4">
//               <legend className="text-sm font-medium mb-1">Email Id</legend>
//               <input
//                 type="email"
//                 value={emailId}
//                 className="input input-bordered w-full"
//                 placeholder="Enter your email"
//                 onChange={(e) => setEmailId(e.target.value)}
//                 required
//               />
//             </fieldset>

//             <fieldset className="mb-6">
//               <legend className="text-sm font-medium mb-1">Password</legend>
//               <input
//                 type="password"
//                 value={password}
//                 className="input input-bordered w-full"
//                 placeholder="Enter your password"
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </fieldset>

//             <div className="card-actions justify-end">
//               <button
//                 type="submit"
//                 className="btn btn-primary"
//                 disabled={isLoading}
//               >
//                 {isLoading ? 'Logging in...' : 'Login'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Login