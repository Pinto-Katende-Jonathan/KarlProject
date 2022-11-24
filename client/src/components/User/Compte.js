import React from "react";
import { useForm } from "react-hook-form";

function Compte() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitForm = (data) => {
    console.log(data);
  };
  console.log(watch("email"));

  return (
    <form className="sign-up-htm">
      <div className="group">
        <label htmlFor="email" className="label">
          Email Address
        </label>
        <input
          style={{ border: errors.email ? "1px solid red" : "" }}
          id="email"
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
