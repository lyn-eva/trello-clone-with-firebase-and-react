import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import useValidate from "../customHooks/use-validate";
import Button from "../utility/Button";
import InputField from "./InputField";

function ResetPwd() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [timer, setTimer] = useState(5);
  const { pwd, handlePwd, pwdIsValid, pwdError } = useValidate();
  const { normalSignIn, currentUser, resetPwd, signOutUser } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!success) return;
    const unsub = setInterval(() => {
      setTimer((prev) => (prev === 0 ? 0 : prev - 1));
    }, 1000);
    const unsubTime = setTimeout(() => navigate('../../login'), 5000);
    return () => {
      clearInterval(unsub);
      clearTimeout(unsubTime)
    };
  }, [success]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!pwdIsValid()) return;
    try {
      await normalSignIn(currentUser.email, pwd);
      setSuccess(true);
      await resetPwd();
      signOutUser();
    } catch (err) {
      setError(err.code.slice(5).split("-").join(" "));
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-clr-cyan">
      {success && <p className="text-center bg-slate-200 w-full">
        The email was sent.
        <br />
        You will be redirected in <span className='text-orange-500'>{timer}</span>.
      </p>}
      <div className="text-dense-blue px-4 sm:px-8 py-6 my-8 text-left bg-white shadow-lg rounded-md w-11/12 max-w-[22rem]">
        {error && <p className="auth-error">{error}</p>}
        <h3 className="text-sm-md sm:text-2xl font-bold text-center ">
          Change your password
        </h3>
        <form onSubmit={submitHandler}>
          <InputField
            id="please enter your current password"
            type="password"
            value={pwd}
            placeholder="Password"
            error={pwdError}
            onChange={handlePwd}
          />
          <Button className="px-6 mt-6 block mx-auto py-2 text-white bg-blue-600 rounded-lg duration-300 hover:bg-clr-cyan">
            get password reset email
          </Button>
        </form>
      </div>
    </main>
  );
}

export default ResetPwd;
