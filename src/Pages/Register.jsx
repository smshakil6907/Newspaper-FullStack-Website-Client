import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../Hoks/useAxiosPublic";
import { AuthContext } from "../Provider/AuthProvider";

export default function Register() {
  const { createNewUser, setUser, updateUserProfile, signInWithGoogle } =
    useContext(AuthContext);
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const name = form.get("name");
    const email = form.get("email");
    const photo = form.get("photo");
    const password = form.get("password");

    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);

    if (password.length < 6) {
      setError({
        ...error,
        password: "Password must be at least 6 characters long.",
      });
      toast.error("Password must be at least 6 characters long.");
      return;
    }
    if (!hasUppercase) {
      setError({
        ...error,
        password: "Password must contain at least one uppercase letter.",
      });
      toast.error("Password must contain at least one uppercase letter.");
      return;
    }
    if (!hasLowercase) {
      setError({
        ...error,
        password: "Password must contain at least one lowercase letter.",
      });
      toast.error("Password must contain at least one lowercase letter.");
      return;
    }
    // console.log({ name, email, photo, password });

    createNewUser(email, password)
      .then((result) => {
        const user = result.user;
        // console.log(user);
        setUser(user);
        updateUserProfile({ displayName: name, photoURL: photo })
          .then(() => {
            // fetch data
            const userInfo = {
              name: name,
              email: email,
            };
            axiosPublic.post("/users", userInfo).then((res) => {
              if (res.data.insertedId) {
                // console.log("object");
                // reset();
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "User Create successfully",
                  showConfirmButton: false,
                  timer: 1500,
                });
                navigate("/");
              }
            });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
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
    <div className=" flex justify-center items-center p-6">
      <div className="card bg-base-200 w-full max-w-lg shrink-0 rounded-none">
        <h2 className="text-xl font-bold text-center mt-4">Register Now!</h2>
        <form onSubmit={handleSubmit} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              name="name"
              type="text"
              placeholder="name"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo-URL</span>
            </label>
            <input
              name="photo"
              type="text"
              placeholder="photo-URL"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              name="email"
              type="email"
              placeholder="email"
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
              // type={showPassword ? "text" : "password"}
              type="password"
              placeholder="password"
              className="input input-bordered"
              required
            />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-neutral rounded-none ">Register</button>
          </div>
        </form>
        <div className="form-control">
          <button
            onClick={handleGoogleSignIn}
            className="btn btn-neutral rounded-none mb-3 lg:w-[87%] w-80 mx-auto"
          >
            Sign in with Google
          </button>
        </div>
        <h1 className="text-center mb-4">
          Already Have an account?{" "}
          <Link to="/login" className="text-red-500 font-semibold">
            Login
          </Link>
        </h1>
      </div>
    </div>
  );
}
