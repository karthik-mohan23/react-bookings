import { Outlet } from "react-router-dom";
import NavigationBar from "../components/Navbar";

function Home() {
  return (
    <div>
      <NavigationBar />
      <Outlet />
    </div>
  );
}
export default Home;
