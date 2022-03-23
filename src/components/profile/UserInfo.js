import { useAuth } from "../context/AuthContext";
import Button from "../utility/Button";

function UserInfo() {
  const { currentUser } = useAuth();
  const {email, createdAt, lastLoginAt} = currentUser.reloadUserInfo ?? {};
  const signedUpAt = new Date(+createdAt).toString()
  const lastLoggedIn = new Date(+lastLoginAt).toString()

  return (
    <section className="animate-info-anime overflow-hidden border-[1px] rounded-md shadow-white p-3 mb-4">
      <p className='mb-3'>email: {email}</p>
      <p className='mb-3'>signed up at: {signedUpAt}</p>
      <p>last logged in: {lastLoggedIn}</p>
      <div className='flex flex-wrap text-black gap-4 mt-4 sm:mt-8'>
        <Button className='bg-white rounded-md py-1'>Reset Password</Button>
        <Button className='bg-white rounded-md py-1'>Delete Account</Button>
      </div>
    </section>
  );
}

export default UserInfo;
