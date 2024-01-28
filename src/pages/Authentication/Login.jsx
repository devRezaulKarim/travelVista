/* eslint-disable no-unused-vars */
import { Link, Navigate } from "react-router-dom";
import classes from "./Login.module.css";
import { useForm } from "react-hook-form";
import {
  useSignInWithGithub,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import Navbar from "../../components/navbar/Navbar";
import auth from "../../firebase.init";
import Loading from "../Loading/Loading";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: {
      errors: { email, password },
    },
  } = useForm();
  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);
  const [signInWithGithub, githubUser, githubLoading, githubError] =
    useSignInWithGithub(auth);

  const errorMsg = "*This field is required";

  //handling the user *********************
  if (googleLoading || githubLoading) {
    return <Loading />;
  }
  if (googleError || githubError) {
    if (googleError.message.includes("closed-by-user")) {
      toast.error("You refuse to login", {
        toastId: "",
      });
    } else {
      toast.error("something went wrong", {
        toastId: "",
      });
    }
  }
  if (googleUser || githubUser) {
    return <Navigate to={"/"} />;
  }

  //handling sign in with email and pass *********************
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <Navbar />
      <div className={classes.container}>
        <div className={classes.wrapper}>
          <fieldset>
            <legend>Login</legend>
            <form
              className={classes.loginForm}
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                className={email && classes.error}
                {...register("email", { required: true })}
                placeholder="Enter your email"
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
                placeholder="Enter your password"
                type="password"
              />
              {password && (
                <span
                  className={`${password && classes.error} ${classes.span}`}
                >
                  {errorMsg}
                </span>
              )}

              <input type="submit" value="Login" />

              <p className={classes.signUpText}>
                New here? <Link to="/registration">Sign up</Link> with email.
              </p>
            </form>
            <div className={classes.socialBtns}>
              <div
                onClick={() => signInWithGoogle()}
                className={classes.googleBtn}
              >
                <img
                  width={"36px"}
                  height={"36px"}
                  src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-vector-graphic-pixabay-15.png"
                  alt=""
                />
                <button>Continue with google</button>
              </div>
              <div
                onClick={() => signInWithGithub()}
                className={classes.githubBtn}
              >
                <img
                  width={"42px"}
                  height={"36px"}
                  src="https://www.freepnglogos.com/uploads/512x512-logo/512x512-transparent-logo-github-logo-24.png"
                  alt=""
                />
                <button>Continue with github</button>
              </div>
            </div>
          </fieldset>
        </div>
      </div>
    </>
  );
}
