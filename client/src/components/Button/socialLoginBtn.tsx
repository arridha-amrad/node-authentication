import React, { useEffect } from "react";
import FBIcon from "../../icons/auth/fb.png";
import GoogleIcon from "../../icons/auth/g.png";
import GoogleLogin, { GoogleLoginResponse } from "react-google-login";
import { SocialButton } from "../../elements/button.element";
import SecretKey from "../../secret.json";
import { useDispatch, useSelector } from "react-redux";
import { googleAuth } from "../../redux/reduxActions/AuthActions";
import { useHistory } from "react-router-dom";
import { RootState } from "../../redux/store";

interface SocialLoginButtonProps {
  loadingAuth?: boolean;
}

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({
  loadingAuth,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const responseGoogle = (gRes: GoogleLoginResponse) => {
    dispatch(googleAuth(gRes.tokenId));
  };

  const responseFailure = (error: any) => {
    console.log(error);
  };

  useEffect(() => {
    if (!loadingAuth && isAuthenticated) {
      history.push("/");
    }
    // eslint-disable-next-line
  }, [isAuthenticated, loadingAuth, history]);

  return (
    <div style={{ margin: "10px auto" }}>
      <button
        disabled={loadingAuth}
        style={{
          border: "none",
          background: "none",
          cursor: loadingAuth ? "unset" : "pointer",
        }}
      >
        <img
          src={FBIcon}
          alt="fb icon"
          style={{
            background: "#eee",
            padding: "8px",
            borderRadius: "50%",
            width: "40px",
            marginRight: "5px",
          }}
        />
      </button>

      <GoogleLogin
        clientId={SecretKey.googleOAuthClientID}
        onFailure={responseFailure}
        disabled={loadingAuth}
        cookiePolicy={"single_host_origin"}
        render={(renderProps) => (
          <button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            style={{
              border: "none",
              background: "none",
              outline: "none",
              cursor: loadingAuth ? "unset" : "pointer",
            }}
          >
            <SocialButton src={GoogleIcon} />
          </button>
        )}
      />
    </div>
  );
};

export default SocialLoginButton;
