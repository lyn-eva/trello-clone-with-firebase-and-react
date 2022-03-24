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
      await(normalSignUp(email, pwd))
      await Promise.all([updateDisplayName(username), createProfile(username)])
      setLoading(false);
      setError("");
      navigate(`../${username}`);
    } catch (err) {
      setLoading(false);
      console.log({err})
      const errMsg =  err.code?.split("-").join(" ") || err.message; 
      setError(errMsg);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-clr-cyan">
      {loading && <LoadingCircle msg="creating your account..." />}
      {!loading && (
        <div className="text-dense-blue px-4 sm:px-12 rounded-md py-10 my-8 text-left bg-white shadow-lg  w-11/12 max-w-[24rem]">
          {error && <p className="auth-error">{error}</p>}
          <h3 className="text-sm-md sm:text-2xl text-center tracking-wide font-medium">
            Sign up your account
          </h3>
          <form onSubmit={submitHandler}>
            <InputField id='username' value={username} placeholder="killer queen?" error={usernameError} onChange={handleUsername}/>
            <InputField id='email' value={email} placeholder="username@company.domain" error={emailError} onChange={handleEmail}/>
            <InputField id='password' value={pwd} placeholder="Password" type='password' error={pwdError} onChange={handlePwd}/>
            <InputField id='Confirm Password' value={pwdConfirm} placeholder="Password" type='password' error={pwdConfirmError} onChange={handlePwdConfirm}/>
            <div className="flex flex-wrap gap-2 items-baseline justify-between mt-6">
              <button className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-clr-cyan duration-300">
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
