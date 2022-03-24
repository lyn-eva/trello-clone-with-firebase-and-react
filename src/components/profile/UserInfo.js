import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext"

function UserInfo() {
  const { currentUser } = useAuth();
  const { email, createdAt, lastLoginAt } = currentUser.reloadUserInfo ?? {};
  const signedUpAt = new Date(+createdAt).toString();
  const lastLoggedIn = new Date(+lastLoginAt).toString();

  return (
    <section className="animate-info-anime overflow-hidden border-[1px] rounded-md shadow-white p-3 mb-4">
      <p className="mb-3">
        <span className="font-bold tracking-wide">email</span> : {email}
      </p>
      <p className="mb-3">
        <span className="font-bold tracking-wide">signed up at</span> : {signedUpAt}
      </p>
      <p>
        <span className="font-bold tracking-wide">last logged in</span> : {lastLoggedIn}
      </p>
      <div className="flex flex-wrap text-black gap-4 mt-4 sm:mt-6">
        <NavLink to="reset_pwd" className="px-2 bg-white rounded-md py-1">
          Change Password
        </NavLink>
        <NavLink to="delete_account" className="px-2 bg-white rounded-md py-1">
          Delete Account
        </NavLink>
      </div>
    </section>
  );
}

export default UserInfo;
