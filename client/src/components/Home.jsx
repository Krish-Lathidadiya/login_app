import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer,toast } from "react-toastify";

function Home() {
  const navigate = useNavigate();

  const logoutHandler = async () => {

    const accessToken=localStorage.getItem("accessToken")
    try {
      const response = await fetch("http://localhost:5000/api/v1/users/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const responseData = await response.json();

      if (response.ok) {
        toast.success(responseData.message);
        //clear all items
        localStorage.clear();
        navigate('/');
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Home Page</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={logoutHandler}
        >
          Logout
        </button>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default Home;
