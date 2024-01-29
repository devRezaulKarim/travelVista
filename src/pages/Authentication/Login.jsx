/* eslint-disable no-unused-vars */
import { Link, Navigate } from "react-router-dom";
import classes from "./Login.module.css";
import { useForm } from "react-hook-form";
import {
  useSignInWithEmailAndPassword,
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
  const errorMsg = "*This field is required";

  //react firebase hooks contents ***********************

  const [signInWithEmailAndPassword, emailUser, emailLoading, emailError] =
    useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);
  const [signInWithGithub, githubUser, githubLoading, githubError] =
    useSignInWithGithub(auth);

  //handling the user login *********************
  const successToastMsg = () =>
    toast.success("logged in successfully", {
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

  if (googleLoading || githubLoading || emailLoading) {
    return <Loading />;
  }
  if (googleError || githubError || emailError) {
    if (emailError.message.includes("invalid-credential")) {
      toast.error("Password wrong!", {
        autoClose: 2000,
        theme: "colored",
        toastId: "",
      });
    } else if (googleError?.message?.includes("closed-by-user")) {
      toast.error("You refuse to login", {
        autoClose: 2000,
        theme: "colored",
        toastId: "",
      });
    } else {
      toast.error("something went wrong", {
        autoClose: 2000,
        theme: "colored",
        toastId: "",
      });
    }
  }
  if (googleUser || githubUser || emailUser) {
    return <Navigate to={"/"} />;
  }

  //handling sign in with google *********************

  const handleGoogleSignIn = async () => {
    const res = await signInWithGoogle();
    if (res.user.accessToken) {
      successToastMsg();
    }
  };
  //handling sign in with email and pass *********************
  //handling sign in with email and pass *********************
  const onSubmit = async (data) => {
    const res = await signInWithEmailAndPassword(data.email, data.password);
    if (res) {
      if (res.user.accessToken) {
        successToastMsg();
      }
    }
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
              <div onClick={handleGoogleSignIn} className={classes.googleBtn}>
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
