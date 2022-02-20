import { useRef, useState } from "react";

function useValidate() {
  const emailRef = useRef();
  const pwdRef = useRef();

  const emailIsValid = (email) => {
    return !/[a-z0-9!#$%&'*+/=?^_‘{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_‘{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(email)
  };

  const pwdIsValid = (pwd) => {
    return pwd.length > 5;
  };

  return { emailIsValid, pwdIsValid, emailRef, pwdRef };
}

export default useValidate;
