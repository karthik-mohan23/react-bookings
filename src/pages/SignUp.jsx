import { Input } from "@nextui-org/input";
import { Button, Divider } from "@nextui-org/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

function SignUp() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    let user;
    if (!fullname || !email || !password) return;
    console.log({ fullname, email, password });
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        user = userCredential.user;
      })
      .then(() =>
        updateProfile(auth.currentUser, {
          displayName: fullname,
        }).then(() => {
          const userData = { fullname, email, timestamp: serverTimestamp() };
          if (user !== null) {
            setDoc(doc(db, "users", user.uid), userData);
          } else {
            throw new Error("user not found");
          }
        })
      )
      .catch((error) => {
        console.log(error);
      });
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
          type="text"
          variant="bordered"
          label="Full Name"
          placeholder="Enter your full name"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />
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
            <span>Already a member? </span>
            <Link
              to="/sign-in"
              className="underline text-blue-500 hover:text-blue-600 duration-250">
              login
            </Link>
          </p>
          <span className="  hover:text-blue-600 duration-250 cursor-pointer">
            <Link to="/forgot-password"> Forgot Password?</Link>
          </span>
        </div>
        <Button type="submit" color="primary">
          SIGN UP
        </Button>
        <Divider className="my-4" />
        <Button color="danger">CONTINUE WITH GOOGLE</Button>
      </form>
    </section>
  );
}
export default SignUp;
