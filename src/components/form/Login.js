import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import useValidate from "../customHooks/use-validate";
import { useAuth } from "../context/AuthContext";
import LoadingCircle from "../utility/LoadingCircle";

function Login() {
  const { emailRef, pwdRef, emailIsVaild, pwdIsValid, emailError, pwdError } =
    useValidate();

  const { currentUser, normalSignIn } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if(currentUser) {
    navigate(-1) // lol
    return null;
  }

  const errorMsg = (msg) => {
    return <small className="text-red-400">{msg}</small>;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setError("");
    if (!emailIsVaild() || !pwdIsValid()) {
      return;
    }
    setLoading(true);
    normalSignIn(emailRef.current.value, pwdRef.current.value)
      .then(() => {
        setLoading(false);
        setError("");
        navigate("../profile", { replace: true });
      })
      .catch((err) => {
        setLoading(false);
        setError(err.code.slice(5).split("-").join(" "));
      });
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {loading && <LoadingCircle msg="Logging in..." />}
      {error && (
        <span className="bg-orange-100 border-2 border-red-300 w-[18rem] px-[1.9rem] box-content py-3 shadow-lg">
          {error}
        </span>
      )}
      {!loading && (
        <div className="text-dense-blue px-8 py-6 text-left bg-white shadow-lg">
          <h3 className="text-2xl font-bold text-center ">
            Login to your account
          </h3>
          <form onSubmit={submitHandler} className="w-[18rem] mt-6">
            <div>
              <label className="block" htmlFor="email">
                Email
              </label>
              {emailError && errorMsg(emailError)}
              <input
                id="email"
                ref={emailRef}
                placeholder="username@company.domain"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div className="mt-8">
              <label className="block" htmlFor="password">
                Password
              </label>
              {pwdError && errorMsg(pwdError)}
              <input
                id="password"
                type="password"
                ref={pwdRef}
                placeholder="Password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div className="flex items-baseline justify-between mt-6 mb-3">
              <button className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-900">
                Login
              </button>
              <a href="" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>
            <Link
              to="../SignUp"
              className="text-sm text-blue-600 hover:border-blue-400 hover:border-b-[2px]"
            >
              <span className="mr-2">New here?</span> Create an account.
            </Link>
          </form>
        </div>
      )}
    </main>
  );
}

export default Login;
