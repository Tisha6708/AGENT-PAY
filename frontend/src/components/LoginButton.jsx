import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

export default function LoginButton() {

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button
      onClick={handleLogin}
      className="bg-white text-black px-4 py-2 rounded-xl shadow hover:bg-gray-100"
    >
      Continue with Google
    </button>
  );
}