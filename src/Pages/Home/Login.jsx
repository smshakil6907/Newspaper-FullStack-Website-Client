import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hoks/useAxiosPublic";
import { AuthContext } from "../../Provider/AuthProvider";

export default function Login() {
  const { userLogin, setUser, signInWithGoogle } = useContext(AuthContext);
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    userLogin(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        const redirectPath = location?.state?.from || "/";
        navigate(redirectPath, { replace: true });
        toast.success("Login successful!");
      })
      .catch((err) => {
        setError("Password or email is incorrect");
        toast.error("Login failed: Password or email is incorrect");
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        setUser(user);

        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName,
        };
        axiosPublic.post("users", userInfo).then((res) => {
          // console.log(res.data);
          navigate("/");
        });
        toast.success("Logged in with Google!");
      })
      .catch((error) => {
        toast.error(`Google Sign-In failed: ${error.message}`);
      });
  };

  return (
    <div className="flex justify-center items-center p-6">
      <div className="card bg-base-200 w-full max-w-lg shrink-0 rounded-none">
        <h2 className="text-xl font-bold text-center mt-4">Login Now!</h2>
        <form onSubmit={handleLogin} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              className="input input-bordered"
              required
            />
            {error && (
              <label className="label text-sm text-red-500">{error}</label>
            )}
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-neutral rounded-none">Login</button>
          </div>
        </form>
        <div className="form-control mt-6">
          <button
            onClick={handleGoogleSignIn}
            className="btn btn-neutral rounded-none mb-3 lg:w-[87%] w-80 mx-auto"
          >
            Sign in with Google
          </button>
        </div>
        <h1 className="text-center mb-4">
          Don't Have an account?{" "}
          <Link to="/register" className="text-red-500 font-semibold">
            Register
          </Link>
        </h1>
      </div>
    </div>
  );
}
