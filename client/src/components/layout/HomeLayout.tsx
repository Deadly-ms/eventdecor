import HomeNav from "../HomeNav";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <>
      <HomeNav />
      <Outlet />
    </>
  );
};

export default HomeLayout;
