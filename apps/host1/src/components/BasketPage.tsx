import { Layout, Space } from "antd";

import BasketWrapper from "./BasketWrapper";

const { Content } = Layout;

const BasketPage = () => {
  return (
    <Layout style={{ minHeight: "100vh", paddingTop: 64 }}>
      <Content style={{ padding: "20px" }}>
        <Space direction="vertical" style={{ width: "100%" }}>
          <BasketWrapper />
        </Space>
      </Content>
    </Layout>
  );
};

export default BasketPage;
