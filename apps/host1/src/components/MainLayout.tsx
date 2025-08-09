// src/components/MainLayout.tsx
import React from "react";
import { Col, Layout, Row } from "antd";

import ProductDetail from "./ProductDetail";
import BasketWrapper from "./BasketWrapper";

export const MainLayout = () => {
  return (
    <Layout>
      <Layout.Content style={{ padding: "0 50px", marginTop: 64 }}>
        <Row gutter={[24, 24]}>
          {/* Sol Kolon: Ürün Detay Sayfası */}
          <Col xs={24} lg={16}>
            <ProductDetail />
          </Col>

          {/* Sağ Kolon: Sabit Sepet */}
          <Col xs={24} lg={8}>
            <div
              style={{
                position: "sticky",
                top: "80px",
                height: "calc(100vh - 100px)",
                overflowY: "auto",
                padding: "16px",
                backgroundColor: "#fff",
                border: "1px solid #e8e8e8",
                borderRadius: "4px",
              }}
            >
              <BasketWrapper />
            </div>
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  );
};
