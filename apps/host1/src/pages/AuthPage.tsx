import { useAuth0 } from "@auth0/auth0-react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const AuthPage = () => {
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } =
    useAuth0();

  // Yükleme sırasında Spin
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Spin
          indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />}
          tip="Yükleniyor..."
          size="large"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md text-center">
        {isAuthenticated ? (
          <>
            <h2 className="text-xl font-semibold mb-4">
              Hoş geldin, {user?.name}
            </h2>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
            >
              Çıkış Yap
            </button>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4">Giriş Yap</h2>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => loginWithRedirect()}
            >
              Auth0 ile Giriş Yap
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
