import { useState } from "react";

function useValidate() {
  const [emailError, setEmailError] = useState("");
  const [pwdError, setPwdError] = useState("");
  const [pwdConfirmError, setpwdConfirmError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [pwdConfirm, setPwdConfirm] = useState('');
  const [username, setUsername] = useState('');

  const handleEmail = e => {
    setEmail(e.target.value);
  }
  const handlePwd = e => {
    setPwd(e.target.value);
  }
  const handlePwdConfirm = e => {
    setPwdConfirm(e.target.value);
  }
  const handleUsername = e => {
    setUsername(e.target.value.trim());
  }
  
  const emailIsVaild = () => {
    if (email.length === 0) {
      setEmailError("email must not be empty");
      return false;
    }
    if (
      !/[a-z0-9!#$%&'*+/=?^_‘{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_‘{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
        email
      )
    ) {
      setEmailError("please enter a valid email");
      return false;
    }
    setEmailError("");
    return true;
  };

  const pwdIsValid = () => {
    if (pwd.length === 0) {
      setPwdError("pwd must not be empty");
      return false;
    }
    if (pwd.length < 5) {
      setPwdError("must contain at least 6 characters");
      return false;
    }
    setPwdError("");
    return true;
  };

  const pwdConfirmIsValid = () => {
    if (pwd !== pwdConfirm) {
      setpwdConfirmError("passwords don't match");
      return false;
    }
    setpwdConfirmError("");
    return true;
  };

  const usernameIsValid = () => {
    if (username.length === 0) {
      setUsernameError("username must not be empty");
      return false;
    }
    if (/^_|\W+/gi.test(username)) {
      setUsernameError("must only contain a to z, 0 to 9, _");
      return false;
    }

    setUsernameError("");
    return true;
  };

  return {
    emailIsVaild,
    pwdIsValid,
    pwdConfirmIsValid,
    usernameIsValid,
    emailError,
    pwdError,
    pwdConfirmError,
    usernameError,
    email,
    pwd,
    pwdConfirm,
    username,
    handleEmail,
    handlePwd,
    handlePwdConfirm,
    handleUsername,
  };
}

export default useValidate;
