import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useDB } from '../context/DbContext';
import useValidate from '../customHooks/use-validate';
import InputField from './InputField';
import Button from '../utility/Button';

function DeleteAccount() {
  const [success, setSuccess] = useState(false);
  const [timer, setTimer] = useState(10);
  const [error, setError] = useState(false);
  const [cancel, setCancel] = useState(false);

  const {currentUser, normalSignIn, signOutUser, deleteAccount} = useAuth(); 
  const {pwd, handlePwd, pwdIsValid, pwdError} = useValidate();
  const {deleteUserData} = useDB();
  const navigate = useNavigate();

  useEffect(() => {
    if (!success) return;
    const unsub = setInterval(() => {
      setTimer(prev => prev === 0 ? 0 : cancel ? prev : prev-1);
    }, 1000);

    const unsubTime = setTimeout(async () => {
      if(cancel) return setTimer(10);
      await deleteUserData();
      await deleteAccount();
      await signOutUser();// why don't I use Promise.all() ? it can't be here
      navigate('../../login');
    }, 10000);

    return () => {
      clearInterval(unsub);
      clearTimeout(unsubTime);
    }
  }, [success, cancel])
  

  const submitHandler = async(e) => {
    e.preventDefault();
    setCancel(false);
    if (!pwdIsValid()) return;
    try {
      await normalSignIn(currentUser.email, pwd);
      setSuccess(true);
    } catch (err) {
      setError(err.code.slice(5).split("-").join(" "));
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-clr-cyan">
      {success && !cancel && <p className="text-center bg-slate-200 w-full">
        Your account will be deleted in <span className='text-orange-500'>{timer}</span>s.
        <br />
        You can cancel it now. <span onClick={() => setCancel(true)} className='text-blue-600 underline underline-offset-1 ml-2 cursor-pointer'>cancel</span>.
      </p>}
      <div className="text-dense-blue px-4 sm:px-8 py-6 my-8 text-left bg-white shadow-lg rounded-md w-11/12 max-w-[22rem]">
        {error && <p className="auth-error">{error}</p>}
        <h3 className="text-sm-md sm:text-2xl font-bold text-center ">
          Confirm your deletion
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
            Delete account
          </Button>
        </form>
      </div>
    </main>
  );
}

export default DeleteAccount