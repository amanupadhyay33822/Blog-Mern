import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false); // State to track checkbox status
  const navigate = useNavigate();

  const BASE_URl = import.meta.env.VITE_URl;
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${BASE_URl}/login`, {
        email,
        password,
      });
      const token = response.data.token;
      localStorage.setItem("token", token);

      Cookies.set("token", token, { expires: 7 });

      toast.success("Success");
      navigate("/post");
      return;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center h-screen bg-indigo-600">
        <div className="w-96 p-6 shadow-lg bg-white rounded-md">
          <h1 className="text-3xl block text-center font-semibold">
            <i className="fa-solid fa-user"></i> Login
          </h1>
          <form onSubmit={handleSubmit}>
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
                required={true} // Ensure email field is required
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
                required={true} // Ensure password field is required
              />
            </div>
            <div className="mt-3 flex justify-between items-center">
              <div className="gap-12 ">
                <input
                  className=""
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                  required={true} // Ensure checkbox is required
                />
                <label className="mx-1">Term and condition</label>
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
                className="border-2 border-indigo-700 bg-indigo-700 text-white py-1 w-full rounded-md hover:bg-transparent hover:text-indigo-700 font-semibold"
                onClick={() => {
                  handleSubmit();
                }}
              >
                <i className="fa-solid fa-right-to-bracket"></i>
                &nbsp;&nbsp;Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
