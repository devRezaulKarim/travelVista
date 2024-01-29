/* eslint-disable no-unused-vars */
import { Link, Navigate } from "react-router-dom";
import classes from "./Registration.module.css";
import { useForm } from "react-hook-form";

import { toast } from "react-toastify";
import Navbar from "../../components/navbar/Navbar";
import auth from "../../firebase.init";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import Loading from "../Loading/Loading";
import { useEffect } from "react";

export default function Registration() {
  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors: { email, password, confirmPass },
    },
  } = useForm();

  const [createUserWithEmailAndPassword, user, signUpLoading, signUpError] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile, updating, error] = useUpdateProfile(auth);

  const errorMsg = "*This field is required";


  //handling the user sign up*********************
  if (signUpLoading || updating) {
    return <Loading />;
  }

  if (signUpError || error) {
    toast.error("something went wrong", {
      toastId: "",
    });
  }

  if (user) {
    return <Navigate to={"/"} />;
  }

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPass) {
      toast.error("Password doesn't match!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        toastId: "",
      });
    } else {
      let res = await createUserWithEmailAndPassword(data.email, data.password);
      await updateProfile({ displayName: data.name });
      if (res.user.accessToken) {
        toast.success("Sign up successful!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          toastId: "",
        });
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className={classes.container}>
        <div className={classes.wrapper}>
          <fieldset>
            <legend>Sign up</legend>
            <form
              className={classes.signUpForm}
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                {...register("name")}
                placeholder="Full name"
                type="text"
              />

              <input
                className={email && classes.error}
                {...register("email", { required: true })}
                placeholder="*Your email"
                type="email"
              />
              {email && (
                <span className={`${email && classes.error} ${classes.span}`}>
                  {errorMsg}
                </span>
              )}

              <input
                className={password && classes.error}
                {...register("password", { required: true })}
                placeholder="*Your password"
                type="password"
              />
              {password && (
                <span
                  className={`${password && classes.error} ${classes.span}`}
                >
                  {errorMsg}
                </span>
              )}

              <input
                className={confirmPass && classes.error}
                {...register("confirmPass", { required: true })}
                placeholder="*Confirm Password"
                type="password"
              />
              {confirmPass && (
                <span
                  className={`${confirmPass && classes.error} ${classes.span}`}
                >
                  {errorMsg}
                </span>
              )}

              <input type="submit" value="Sign up" />
              <p className={classes.loginText}>
                Already have an account? <Link to="/login">Login</Link>.
              </p>
            </form>
          </fieldset>
        </div>
      </div>
    </>
  );
}
