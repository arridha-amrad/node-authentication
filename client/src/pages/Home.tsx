import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../store";
import { Button, Text } from "@chakra-ui/react";
import { FC } from "react";
import Logout from "../components/Logout";
import getGoogleOauthURL from "../utils/GetGoogleOAuthURL";

const Home: FC<{ isLoading: boolean }> = ({ isLoading }) => {
  const { authenticatedUser, isLoadingAuth } = useSelector(
    (state: RootState) => state.auth
  );
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {!isLoadingAuth && authenticatedUser && (
        <>
          <Text>{authenticatedUser.username}</Text>
          <Text>{authenticatedUser.email}</Text>
          <Logout />
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </>
      )}
    </div>
  );
};

export default Home;
