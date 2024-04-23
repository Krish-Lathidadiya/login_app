import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import avatar from "../assets/profile.png";

function Register() {
  const [userAvatar, setUserAvatar] = useState(null);
  const [userAvatarPreview, setUserAvatarPreview] = useState(null);
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    password: "",
    gender: "",
  });

  const setData = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    setUserAvatar(file);
    setUserAvatarPreview(URL.createObjectURL(file));
  };

  const navigate=useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("firstName", input.firstName);
      formData.append("lastName", input.lastName);
      formData.append("email", input.email);
      formData.append("phone", input.phone);
      formData.append("dob", input.dob);
      formData.append("password", input.password);
      formData.append("gender", input.gender);
      formData.append("avatar", userAvatar); // Assuming userAvatar is the file object

      console.log(input.firstName);

      const response = await fetch(
        "http://localhost:5000/api/v1/users/register",
        {
          method: "POST",
          body: formData,
        }
      );

      const responseData = await response.json();
      console.log(responseData);
      if (response.ok) {
        toast.success(responseData.message)
        navigate('/')

      } else {
        toast.error(
          responseData.extraDetails
            ? responseData.extraDetails
            : responseData.message
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-cover bg-center">
      {/* Register title */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Register an account
        </h2>
      </div>
      {/* Register title end */}

      {/* Register form */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={submitHandler}>
            <div className="profile flex justify-center py-4">
              <img
                src={userAvatarPreview || avatar}
                alt="avatar"
                className="h-20 w-20 rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <input
                type="file"
                onChange={handleAvatar}
                className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
              <div className="flex flex-col">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={input.firstName}
                  onChange={setData}
                  className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="lastName">Last Name:</label>
                <input
                  type="text"
                  name="lastName"
                  value={input.lastName}
                  onChange={setData}
                  className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
              <div className="flex flex-col">
                <label htmlFor="email">Email:</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={input.email}
                  onChange={setData}
                  className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="phone">Phone:</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={input.phone}
                  onChange={setData}
                  className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="dob">DOB:</label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={input.dob}
                onChange={setData}
                className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
              <div className="flex flex-col">
                <label htmlFor="gender">Gender:</label>
                <select
                  id="gender"
                  name="gender"
                  value={input.gender}
                  onChange={setData}
                  className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={input.password}
                  onChange={setData}
                  className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Register
              </button>
            </div>
            <div className="text-center py-4">
              <span className="text-gray-500">
                You Have Already Account?{" "}
                <Link className="text-red-500" to="/">
                  {" "}
                  Login Now
                </Link>
              </span>
            </div>

            {/* Rest of the form inputs */}
            {/* ... */}
          </form>
        </div>
      </div>
      {/* Register form end */}

      <ToastContainer />
    </div>
  );
}

export default Register;
