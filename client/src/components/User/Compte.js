import React, { useState } from "react";
import { useForm } from "react-hook-form";
import MessageFlash from "../UI/MessageFlash";

function Compte() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [message, setMessage] = useState(null);
  const [type, setType] = useState(null);

  const submitForm = (data) => {
    // console.log(data);

    const url = "http://127.0.0.1:5000/user";

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

    if (data.password === data.confirmPassword) {
      fetch(url, options)
        .then((resp) => resp.json())
        .then((resp) => {
          // L'alert disparait après 3s
          setTimeout(() => {
            setMessage(null);
          }, 5000);
          setMessage(resp.message);
          setType("success");
        })
        .catch((e) => console.log(e));
      reset();
    } else {
      // L'alert disparait après 3s
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      setMessage("Les deux mots de passe doivent correspondre!");
      setType("error");
    }
  };
  // console.log(watch("email"));

  return (
    <form className="sign-up-htm">
      {message ? (
        <MessageFlash message={message} setMessage={setMessage} type={type} />
      ) : (
        ""
      )}

      <div className="group">
        <label htmlFor="email" className="label">
          Email Address
        </label>
        <input
          style={{ border: errors.email ? "1px solid red" : "" }}
          id="email"
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
        <label htmlFor="password" className="label">
          Password
        </label>
        <input
          style={{ border: errors.password ? "1px solid red" : "" }}
          id="password"
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
        <label htmlFor="Password1" className="label">
          Repeat Password
        </label>
        <input
          style={{ border: errors.confirmPassword ? "1px solid red" : "" }}
          id="Password1"
          type="password"
          className="input"
          data-type="password"
          {...register("confirmPassword", { required: true, minLength: 6 })}
        />
        {errors.confirmPassword && (
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
          style={{ cursor: "pointer" }}
          type="submit"
          className="button"
          value="S'enregistrer"
          onClick={handleSubmit(submitForm)}
        />
      </div>
      <div className="hr"></div>
    </form>
  );
}

export default Compte;
