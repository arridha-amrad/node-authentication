import React from "react";
import Appbar from "../components/Navbar";
import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/auth/auth.actions";
import { Button } from "../elements/button.element";
import { Link } from "react-router-dom";

const Home = () => {
  document.title = "Home";
  const dispatch = useDispatch();
  const { user, loadingUser } = useSelector((state: RootState) => state.user);

  return (
    <>
      <Appbar />
      <Link to="/test">Test Page</Link>
      <Button onClick={() => dispatch(logout())} aa_bg="#333" aa_height="50px">
        Logout
      </Button>
      {!loadingUser && user.isLogin && <p>{user.username}</p>}
    </>
  );
};

export default Home;
