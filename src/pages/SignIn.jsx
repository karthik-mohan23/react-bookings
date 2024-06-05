import { Input } from "@nextui-org/input";
import { Button, Divider } from "@nextui-org/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import LoginGoogleButton from "../components/LoginGoogleButton";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    console.log({ email, password });
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);
      if (!user) {
        toast.error("user doesn't exist");
        throw new Error("user doesn't exist");
      }
      navigate("/");
      toast.success("Successfully logged in");
    } catch (error) {
      toast.error("Error logging in");
      console.log(error);
    }
  };

  return (
    <section className="pt-9">
      <h2 className="text-center text-2xl font-bold pb-9">
        Log in to your account.
      </h2>
      <form
        onSubmit={handleLogin}
        className="flex flex-col max-w-sm mx-auto  gap-4">
        <Input
          type="email"
          variant="bordered"
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          variant="bordered"
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="px-2 flex justify-between">
          <p>
            <span>Not yet registered? </span>
            <Link
              to="/sign-up"
              className="underline text-blue-500 hover:text-blue-600 duration-250">
              register
            </Link>
          </p>
          <span className="  hover:text-blue-600 duration-250 cursor-pointer">
            <Link to="/forgot-password"> Forgot Password?</Link>
          </span>
        </div>
        <Button onClick={handleLogin} type="submit" color="primary">
          SIGN IN
        </Button>
        <Divider className="my-4" />
        <LoginGoogleButton />
      </form>
    </section>
  );
}
export default SignIn;
