import React from "react";
import { useForm } from "react-hook-form";

function LoginUser() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submitForm = (data) => {
    // console.log(data);

    const url = "http://127.0.0.1:5000/login";

    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    };

    fetch(url, options)
      .then((resp) => resp.json())
      .then((resp) => console.log(resp))
      .catch((e) => console.log(e));
    reset();
  };
  return (
    <form className="sign-in-htm">
      <div className="group">
        <label htmlFor="user" className="label">
          Email
        </label>
        <input
          style={{ border: errors.email ? "1px solid red" : "" }}
          id="user"
          type="email"
          className="input"
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
