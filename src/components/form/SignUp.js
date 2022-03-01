import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import useValidate from "../customHooks/use-validate";
import { useAuth } from "../context/AuthContext";
import LoadingCircle from "../utility/LoadingCircle";

function SignUp() {
  const {
    emailRef,
    pwdRef,
    pwdConfirmRef,
    usernameRef,
    emailIsVaild,
    pwdIsValid,
    pwdConfirmIsValid,
    usernameIsValid,
    emailError,
    pwdError,
    pwdConfirmError,
    usernameError,
  } = useValidate();

  const { normalSignUp, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentUsername, setCurrentUsername] = useState('')

  const handleChange = () => { // onChange is not too bad
    setCurrentUsername(usernameRef.current.value);
  }

  const errorMsg = (msg) => {
    return <small className="text-red-400">{msg}</small>;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setError("");
    if (
      !usernameIsValid() ||
      !emailIsVaild() ||
      !pwdIsValid() ||
      !pwdConfirmIsValid()
    ) {
      return;
    }
    setLoading(true);
    normalSignUp(emailRef.current.value, pwdRef.current.value)
      .then(() => {
        setLoading(false);
        setError("");
        return updateUserProfile(currentUsername.trim());
      })
      .then(() => {
        navigate(`../${currentUsername}`);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.code.slice(5).split("-").join(" "));
      });
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {loading && <LoadingCircle msg="creating your account..." />}
      {error && (
        <span className="bg-orange-100 border-2 border-red-300 w-[18rem] px-[1.9rem] box-content py-3 shadow-lg">
          {error}
        </span>
      )}
      {!loading && (
        <div className="text-dense-blue px-8 py-6 text-left bg-white shadow-lg">
          <h3 className="text-2xl font-bold text-center ">
            Sign up your account
          </h3>
          <form onSubmit={submitHandler} className="w-[18rem] mt-6">
            <div>
              <label className="block" htmlFor="username">
                Username
              </label>
              {usernameError && errorMsg(usernameError)}
              <input
                onChange={handleChange}
                id="username"
                ref={usernameRef}
                placeholder="man of culture?"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div className="mt-8">
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
            <div className="mt-8">
              <label className="block" htmlFor="confirmPwd">
                Confirm password
              </label>
              {pwdConfirmError && errorMsg(pwdConfirmError)}
              <input
                id="confirmPwd"
                type="password"
                ref={pwdConfirmRef}
                placeholder="Password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div className="flex items-baseline justify-between mt-6">
              <button className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-900">
                SignUp
              </button>
              <Link
                to="../login"
                className="text-sm text-blue-600 hover:underline"
              >
                Log In
              </Link>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}

export default SignUp;
