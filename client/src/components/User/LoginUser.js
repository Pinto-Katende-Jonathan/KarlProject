// import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import MessageFlash from "../UI/MessageFlash";
import axios from "./api/axios";
import useAuth from "./hooks/useAuth";

const LOGIN_URL = "/login";

function LoginUser() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const submitForm = async (dat) => {
    // console.log(data);

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email: dat.email, password: dat.password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.access_token; //on vérifie si le backend a l'access_token
      if (accessToken) {
        setAuth({ user: dat.email, accessToken });
        navigate(from, { replace: true });
      }
      // Error
      setMessage(response.data?.message);
      setType("error");
    } catch (err) {
      console.log(err);
    }

    reset();
  };
  return (
    <form className="sign-in-htm">
      {message ? (
        <MessageFlash message={message} setMessage={setMessage} type={type} />
      ) : (
        ""
      )}
      <div className="group">
        <label htmlFor="user" className="label">
          Email
        </label>
        <input
          style={{ border: errors.email ? "1px solid red" : "" }}
          id="user"
          type="email"
          className="input"
          autoComplete="off"
          {...register("email", { required: true, maxLength: 30 })}
        />
        {errors.email && (
          <p
            style={{
              color: "#de7886",
              margin: 5,
              fontSize: 14,
              textAlign: "center",
              fontFamily: "verdana",
            }}
          >
            L'email est obligatoire
          </p>
        )}
        {errors.email?.type === "maxLength" && (
          <p
            style={{
              color: "#de7886",
              margin: 5,
              fontSize: 14,
              textAlign: "center",
              fontFamily: "verdana",
            }}
          >
            La taille maximale de l'email doit être 30
          </p>
        )}
      </div>
      <div className="group">
        <label htmlFor="password2" className="label">
          Password
        </label>
        <input
          style={{ border: errors.email ? "1px solid red" : "" }}
          id="password2"
          type="password"
          className="input"
          data-type="password"
          {...register("password", { required: true, minLength: 6 })}
        />
        {errors.password && (
          <p
            style={{
              color: "#de7886",
              margin: 5,
              fontSize: 14,
              textAlign: "center",
              fontFamily: "verdana",
            }}
          >
            La taille minimale du mot de Passe doit être 6
          </p>
        )}
      </div>

      <div className="group">
        <input
          type="submit"
          className="button"
          value="Login"
          style={{ cursor: "pointer" }}
          onClick={handleSubmit(submitForm)}
        />
      </div>
      <div className="hr"></div>
    </form>
  );
}

export default LoginUser;
