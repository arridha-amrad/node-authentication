import AppBar from "../components/Navbar";
import { RootState } from "../redux/Store";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/reduxActions/AuthActions";
import { Button } from "../elements/button.element";
import { Link } from "react-router-dom";

const Home = () => {
  document.title = "Home";
  const dispatch = useDispatch();
  const { username, loadingUser, isLogin } = useSelector(
    (state: RootState) => state.user
  );

  return (
    <>
      <AppBar />
      <Link to="/test">Test Page</Link>
      <Button onClick={() => dispatch(logout())} aa_bg="#333" aa_height="50px">
        Logout
      </Button>
      {!loadingUser && isLogin && <p>{username}</p>}
    </>
  );
};

export default Home;
