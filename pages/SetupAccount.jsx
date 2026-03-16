import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "../src/ThemeContext";

export default function SetupAccount() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    const updatedUser = {
      ...storedUser,
      firstName: data.firstName,
      lastName: data.lastName,
      profilePhoto: data.profilePhoto[0]?.name
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    localStorage.setItem("isLoggedIn", "true");

    navigate("/home");
  };

  return (
    <div className="app-shell">
      <div className="card">
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <h2 className="card-title">Setup Account</h2>
          <ThemeToggle />
        </div>

        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="profilePhoto">Profile Photo</label>
            <input
              id="profilePhoto"
              type="file"
              className={errors.profilePhoto ? "input input-error" : "input"}
              {...register("profilePhoto", {
                required: "Profile photo is required"
              })}
            />
            {errors.profilePhoto && (
              <span className="error-text">{errors.profilePhoto.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              className={errors.firstName ? "input input-error" : "input"}
              placeholder="First name"
              {...register("firstName", {
                required: "First name is required"
              })}
            />
            {errors.firstName && (
              <span className="error-text">{errors.firstName.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              className={errors.lastName ? "input input-error" : "input"}
              placeholder="Last name"
              {...register("lastName", {
                required: "Last name is required"
              })}
            />
            {errors.lastName && (
              <span className="error-text">{errors.lastName.message}</span>
            )}
          </div>

          <button type="submit" className="btn btn-primary">
            Complete Setup
          </button>
        </form>
      </div>
    </div>
  );
}