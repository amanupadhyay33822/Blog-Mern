import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [Username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const BASE_URl = import.meta.env.VITE_URl;
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${BASE_URl}/signup`, {
        Username,
        email,
        password,
        confirmPassword,
      });
      console.log(response);
      toast.success("Success");
      navigate("/post");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center h-screen bg-indigo-600">
        <div className="w-96 p-6 shadow-lg bg-white rounded-md">
          <h1 className="text-3xl block text-center font-semibold">
            <i className="fa-solid fa-user"></i> Sign Up
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mt-3">
              <label htmlFor="username" className="block text-base mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={Username}
                onChange={(e) => setUsername(e.target.value)}
                className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                placeholder="Enter Username..."
              />
            </div>
            <div className="mt-3">
              <label htmlFor="email" className="block text-base mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                placeholder="Enter Email..."
              />
            </div>
            <div className="mt-3">
              <label htmlFor="password" className="block text-base mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                placeholder="Enter Password..."
              />
            </div>
            <div className="mt-3">
              <label htmlFor="confirmPassword" className="block text-base mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                placeholder="Confirm Password..."
              />
            </div>
            <div className="mt-3 flex justify-between items-center">
              <div className="gap-12">
                <input type="checkbox" />
                <label className="mx-1">Term and Condition</label>
              </div>
              <div>
                <a href="#" className="text-indigo-800 font-semibold">
                  Forgot Password?
                </a>
              </div>
            </div>
            <div className="mt-5">
              <button
                type="submit"
                className="border-2 border-indigo-700 bg-indigo-700 text-white py-1 w-full rounded-md hover:bg-transparent hover:text-indigo-700 font-semibold relative"
              >
                <i className="fa-solid fa-right-to-bracket"></i>&nbsp;&nbsp;Sign
                Up
              </button>
              <div className="text-center mt-2">
                <button
                  type="button"
                  className="border-2 border-indigo-700   py-1 px-2 rounded-md hover:bg-transparent hover:text-indigo-700 font-semibold"
                  onClick={() => navigate("/")}
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
