import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import useValidate from "../customHooks/use-validate";
import { useAuth } from "../context/AuthContext";
import LoadingCircle from "../utility/LoadingCircle";
import { useDB } from "../context/DbContext";
import InputField from "./InputField";

function SignUp() {
  const { normalSignUp, updateDisplayName } = useAuth();
  const { userAlreadyExists, createProfile } = useDB();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    email,
    pwd,
    pwdConfirm,
    username,
    handleEmail,
    handlePwd,
    handlePwdConfirm,
    handleUsername,
    emailIsVaild,
    pwdIsValid,
    pwdConfirmIsValid,
    usernameIsValid,
    emailError,
    pwdError,
    pwdConfirmError,
    usernameError,
  } = useValidate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    if (!usernameIsValid() || !emailIsVaild() || !pwdIsValid() || !pwdConfirmIsValid()) {
      return;
    }
    setLoading(true);
    try {
      const alreadyExists = await userAlreadyExists(username);
      if (alreadyExists) throw new Error("username is already in use");
      const resolve = await Promise.all([normalSignUp(email, pwd), updateDisplayName(username), createProfile(username)]);
      setLoading(false);
      setError("");
      navigate(`../${username}`);
    } catch (err) {
      setLoading(false);
      const errMsg =  err.code?.split("-").join(" ") || err.message; 
      setError(errMsg);
    }
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
            <InputField id='username' value={username} placeholder="killer queen?" error={usernameError} onChange={handleUsername}/>
            <InputField id='email' value={email} placeholder="username@company.domain" error={emailError} onChange={handleEmail}/>
            <InputField id='password' value={pwd} placeholder="Password" error={pwdError} onChange={handlePwd}/>
            <InputField id='Confirm Password' value={pwdConfirm} placeholder="Password" type='password' error={pwdConfirmError} onChange={handlePwdConfirm}/>
            <div className="flex items-baseline justify-between mt-6">
              <button className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-[#40af9b] duration-300">
                SignUp
              </button>
              <Link to="../login" className="text-sm text-blue-600 hover:underline">
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
