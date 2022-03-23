import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

import useValidate from "../customHooks/use-validate";
import { useAuth } from "../context/AuthContext";
import LoadingCircle from "../utility/LoadingCircle";
import InputField from "./InputField";

function Login() {
  const {
    email,
    pwd,
    handleEmail,
    handlePwd,
    emailIsVaild,
    pwdIsValid,
    emailError,
    pwdError,
  } = useValidate();

  const { currentUser: user, normalSignIn } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.displayName) return;
    navigate(`../${user.displayName}`, { replace: true });
  }, [user, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    setError("");
    if (!emailIsVaild() || !pwdIsValid()) {
      return;
    }
    setLoading(true);
    normalSignIn(email, pwd)
      .then(() => {
        setLoading(false);
        setError("");
      })
      .catch((err) => {
        setLoading(false);
        setError(err.code.slice(5).split("-").join(" "));
      });
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[#40af9b]">
      {loading && <LoadingCircle msg="Logging in..." />}
      {!loading && (
        <div className="text-dense-blue px-4 sm:px-8 py-6 my-8 text-left bg-white shadow-lg rounded-md w-11/12 max-w-[22rem]">
          {error && <p className="auth-error">{error}</p>}
          <h3 className="text-sm-md sm:text-2xl font-bold text-center ">Login to your account</h3>
          <form onSubmit={submitHandler}>
            <InputField
              id="email"
              value={email}
              placeholder="username@company.domain"
              error={emailError}
              onChange={handleEmail}
            />
            <InputField
              id="password"
              value={pwd}
              placeholder="Password"
              error={pwdError}
              onChange={handlePwd}
            />
            <div className="flex flex-wrap gap-4 items-baseline justify-between mt-6 mb-3">
              <button className="px-6 py-2 text-white bg-blue-600 rounded-lg duration-300 hover:bg-[#40af9b]">
                Login
              </button>
              <a href="" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>
            <Link
              to="../SignUp"
              className="text-sm text-blue-600 hover:border-blue-400 hover:underline"
            >
              New here? Create an account.
            </Link>
          </form>
        </div>
      )}
    </main>
  );
}

export default Login;
