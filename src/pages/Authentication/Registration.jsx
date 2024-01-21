/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import classes from "./Registration.module.css";
import { useForm } from "react-hook-form";

import { toast } from "react-toastify";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";

export default function Registration() {
  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors: { email, password, confirmPass },
    },
  } = useForm();

  const errorMsg = "*This field is required";
  const navigate = useNavigate();

  const onSubmit = (data) => {
    delete data.confirmPass;

    axios
      .post("http://localhost:8800/api/auth/register", {
        ...data,
        username: data.name + Date.now(),
      })
      .then((res) => {
        if (res.status === 200) {
          reset();
          navigate("/");
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
