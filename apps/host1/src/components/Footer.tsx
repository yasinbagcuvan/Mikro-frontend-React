import React from "react";
import { Layout } from "antd";

const { Footer } = Layout;

const AppFooter: React.FC = () => {
  return (
    <Footer style={{ textAlign: "center" }}>
      ©2025 Kayra Export | Tüm hakları saklıdır.
    </Footer>
  );
};

export default AppFooter;
