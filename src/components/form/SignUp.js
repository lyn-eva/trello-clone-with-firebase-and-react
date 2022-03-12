import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import useValidate from "../customHooks/use-validate";
import { useAuth } from "../context/AuthContext";
import LoadingCircle from "../utility/LoadingCircle";
import { useDB } from "../context/DbContext";

function SignUp() {
  const { normalSignUp, updateUserProfile } = useAuth();
  const { checkIfUserExists, createProfile } = useDB();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentUser, setcurrentUser] = useState("");

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

  const handleChange = () => {
    // onChange is not too bad
    setcurrentUser(usernameRef.current.value);
  };

  const errorMsg = (msg) => {
    return <small className="text-red-400 block -mb-1">{msg}</small>;
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
        updateUserProfile(currentUser.trim());
        navigate(`../${currentUser}`);
        return checkIfUserExists(currentUser);
      })
      .then((res) => {
        if (res.data()) return;
        createProfile(currentUser.trim());
      })
      .catch((err) => {
        setLoading(false);
        setError(err.code.slice(5).split("-").join(" "));
      });
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[#40af9b]">
      {loading && <LoadingCircle msg="creating your account..." />}
      {!loading && (
        <div className="absolute text-dense-blue px-12 rounded-md py-10 my-8 text-left bg-[#fff] shadow-lg">
          {error && (
            <span className="bg-orange-100 absolute w-full left-0 -top-4 py-3 text-center rounded-t-md">
              {error}
            </span>
          )}
          <h3 className="text-2xl text-center tracking-wide font-medium">
            Sign up your account
          </h3>
          <form onSubmit={submitHandler} className="w-[19rem] mt-6">
            <div>
              <label className="block" htmlFor="username">
                Username
              </label>
              {usernameError && errorMsg(usernameError)}
              <input
                onChange={handleChange}
                value={currentUser}
                id="username"
                ref={usernameRef}
                placeholder="man of culture?"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#40af9b]"
              />
            </div>
            <div className="mt-6">
              <label className="block" htmlFor="email">
                Email
              </label>
              {emailError && errorMsg(emailError)}
              <input
                id="email"
                ref={emailRef}
                placeholder="username@company.domain"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#40af9b]"
              />
            </div>
            <div className="mt-6">
              <label className="block" htmlFor="password">
                Password
              </label>
              {pwdError && errorMsg(pwdError)}
              <input
                id="password"
                type="password"
                ref={pwdRef}
                placeholder="Password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#40af9b]"
              />
            </div>
            <div className="mt-6">
              <label className="block" htmlFor="confirmPwd">
                Confirm password
              </label>
              {pwdConfirmError && errorMsg(pwdConfirmError)}
              <input
                id="confirmPwd"
                type="password"
                ref={pwdConfirmRef}
                placeholder="Password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#40af9b]"
              />
            </div>
            <div className="flex items-baseline justify-between mt-6">
              <button className="px-6 py-2 text-white bg-[#c46f3e] rounded-lg hover:bg-[#40af9b] duration-500">
                SignUp
              </button>
              <Link
                to="../login"
                className="text-sm text-[#c46f3e] hover:underline"
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
