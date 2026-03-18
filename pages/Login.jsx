import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../src/firebase";
import { ThemeToggle } from "../src/ThemeContext";

export default function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((result) => {
        const user = result.user;
        localStorage.setItem(
          "user",
          JSON.stringify({
            uid: user.uid,
            email: user.email
          })
        );
        localStorage.setItem("isLoggedIn", "true");
        navigate("/home");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleGoogleLogin = () => {
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
        localStorage.setItem("isLoggedIn", "true");
        navigate("/home");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="app-shell">
      <div className="card">
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <h2 className="card-title">Login</h2>
          <ThemeToggle />
        </div>

        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
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
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className={errors.password ? "input input-error" : "input"}
              placeholder="Enter your password"
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

          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>

        <div style={{ marginTop: "12px" }}>
          <button
            type="button"
            className="btn btn-secondary"
            style={{ width: "100%" }}
            onClick={handleGoogleLogin}
          >
            Continue with Google
          </button>
        </div>

        <p className="card-footer-text">
          No account?{" "}
          <Link className="link" to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}