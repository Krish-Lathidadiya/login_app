import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {

  const [input,setInput]=useState({
    email:"",
    password:"",
  })

  const setData=(e)=>{
    let name=e.target.name;
    let value=e.target.value;

    setInput({
      ...input,
      [name]:value,
    })
  }

  const navigate=useNavigate()
  const submitHandler= async (e)=>{
    e.preventDefault();

    const response=await fetch( "http://localhost:5000/api/v1/users/login",{
      method: "POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input)
    })

    try {
      const responseData=await response.json()
      // console.log(responseData);
      if(response.ok){
        toast.success(responseData.message);
        const accessToken=responseData.data.accessToken;
        localStorage.setItem("accessToken", accessToken);
        navigate('/Home')
      }else{
        toast.error(responseData.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form onSubmit={submitHandler} className="mt-8 space-y-6" >
          {/* Your form inputs */}

          <div className="rounded-md shadow-sm space-y-2">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={input.email}
                onChange={setData}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={input.password}
                onChange={setData}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link
                to="/EmailVerify"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              > Forgot your password?</Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>

        <div className="flex items-center justify-center">
          <p className="text-sm">
            Not registered?{" "}
            <Link className="text-red-500 font-medium" to="/register">
              {" "}
              Register Now
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}

export default Login;
