import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db, provider } from "../config/firebase";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";

function RegisterGoogleButton() {
  const navigate = useNavigate();

  const onGoogleCLick = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log(user);
      //check if user already exists
      const docRef = doc(db, "users", user.uid);
      console.log(docRef, "docRef");
      const docSnap = await getDoc(docRef);
      console.log(docSnap, "docSnap");

      if (docSnap.exists()) {
        toast.error("User already exists");
        throw new Error("User already exists");
      } else {
        setDoc(doc(db, "users", user.uid), {
          fullname: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
        navigate("/");
        toast.success("Successfully signed in");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while signing in");
    }
  };

  return (
    <Button onClick={onGoogleCLick} color="danger">
      CONTINUE WITH GOOGLE
    </Button>
  );
}
export default RegisterGoogleButton;
