import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../src/firebase";
import { ThemeToggle } from "../src/ThemeContext";

export default function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((result) => {
        const user = result.user;
        localStorage.setItem(
          "user",
          JSON.stringify({
            uid: user.uid,
            email: user.email
          })
        );
        navigate("/setup");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleGoogleRegister = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        localStorage.setItem(
          "user",
          JSON.stringify({
            uid: user.uid,
            email: user.email
          })
        );
        navigate("/setup");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="app-shell">
      <div className="card">
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <h2 className="card-title">Register</h2>
          <ThemeToggle />
        </div>

        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="reg-email">Email</label>
            <input
              id="reg-email"
              type="email"
              className={errors.email ? "input input-error" : "input"}
              placeholder="you@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format"
                }
              })}
            />
            {errors.email && (
              <span className="error-text">{errors.email.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="reg-password">Password</label>
            <input
              id="reg-password"
              type="password"
              className={errors.password ? "input input-error" : "input"}
              placeholder="Create a password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters"
                }
              })}
            />
            {errors.password && (
              <span className="error-text">{errors.password.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="reg-confirm-password">Confirm Password</label>
            <input
              id="reg-confirm-password"
              type="password"
              className={
                errors.confirmPassword ? "input input-error" : "input"
              }
              placeholder="Re-enter your password"
              {...register("confirmPassword", {
                required: "Confirm password required",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match"
              })}
            />
            {errors.confirmPassword && (
              <span className="error-text">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>

        <div style={{ marginTop: "12px" }}>
          <button
            type="button"
            className="btn btn-secondary"
            style={{ width: "100%" }}
            onClick={handleGoogleRegister}
          >
            Continue with Google
          </button>
        </div>

        <p className="card-footer-text">
          Already have an account?{" "}
          <Link className="link" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}