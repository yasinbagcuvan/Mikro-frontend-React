import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Auth0Provider
      domain="https://dev-b2q0ymhk4l7fx7gj.us.auth0.com"
      clientId="NB3BjxXMx1fJANI5m7F0Bng0bNGkMrsa"
      authorizationParams={{
        redirect_uri: `${window.location.origin}/callback`,
      }}
    >
      {children}
    </Auth0Provider>
  );
};

export default AuthProvider;
