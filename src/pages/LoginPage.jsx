import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // reset error before trying again

    try {
      const res = await axios.post("https://reqres.in/api/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/users");
    } catch (err) {
      setError("Invalid credentials. Please try again!");
    }
  };

  return (
    <div
      className="bg-cover bg-no-repeat min-h-screen flex justify-center items-center"
      style={{ backgroundImage: "url('/bg.png')" }}
    >
      <div className="flex flex-col text-center text-white space-y-10 text-sm p-8 bg-[#202020] rounded-2xl md:space-y-5 md:text-base lg:space-y-6 lg:text-lg">
        <div className="flex flex-col space-y-5 mb-5">
          <h1 className="text-lg lg:text-lg">Sign in</h1>
          <p className="text-[#DDDDDD]">Get started with your existing account</p>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <form className="flex flex-col space-y-10" onSubmit={handleSubmit}>
          <input
            id="emailid"
            type="text"
            name="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border bg-[#252525] text-[#9C9C9C] rounded-md border-3 border-[#434343] text-sm md:p-2 md:text-base lg:p-3 lg:text-lg"
          />
          <input
            id="passid"
            type="password"
            name="pass"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border bg-[#252525] text-[#9C9C9C] rounded-md border-3 border-[#434343] text-sm md:p-2 md:text-base lg:p-3 lg:text-lg"
          />
          <button
            type="submit"
            className="bg-[#7019FF] text-white rounded-md py-1 md:py-2 lg:p-3 lg:text-lg"
          >
            Get Started
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
