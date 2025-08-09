import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Spin, Result, Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;

const Callback = () => {
  const { isLoading, error, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", paddingTop: "100px" }}>
        <Spin
          indicator={antIcon}
          tip="Giriş yapılıyor, lütfen bekleyin..."
          size="large"
        />
      </div>
    );
  }

  if (error) {
    return (
      <Result
        status="error"
        title="Giriş Yapılamadı"
        subTitle={`Bir hata oluştu: ${error.message}`}
        extra={
          <Button type="primary" onClick={() => navigate("/")}>
            Ana Sayfaya Dön
          </Button>
        }
      />
    );
  }

  return (
    <Result
      status="info"
      title="İşlem Tamamlanıyor"
      subTitle="Kısa bir süre içinde yönlendirileceksiniz..."
    />
  );
};

export default Callback;
