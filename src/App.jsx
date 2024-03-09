import { Routes, Route } from "react-router-dom";
import SignUp from "./component/SignUp";
import Login from "./component/Login";
import Homepage from "./component/Homepage";
import BlogPAge from "./component/BlogPage";
import BlogPost from "./component/BlogPost";
import { useEffect } from "react";
// import Homepage from "./component/Homepage";

const App = () => {
  useEffect(() => {
    window.process = {
      ...window.process,
    };
  }, []);
  return (
    <div>
      <Routes>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/" exact element={<Login />}></Route>
        {/* <Route path="/" element={<Homepage />}></Route> */}
        {/* <Route path="/post" element={<BlogPAge />}></Route> */}
        <Route path="/post" element={<BlogPAge />}></Route>
      </Routes>
    </div>
  );
};

export default App;
