import React from "react";
import {
  useGetProductByIdQuery,
  useGetProductsQuery,
} from "../store/fakeStoreApi";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { toast } from "react-hot-toast";
import {
  Card,
  Button,
  Typography,
  Spin,
  Row,
  Col,
  Image,
  Result,
  Divider,
} from "antd";
import {
  ShoppingCartOutlined,
  DollarOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";

const { Meta } = Card;
const { Title, Paragraph } = Typography;

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: product, isLoading, error } = useGetProductByIdQuery(id!);
  const { data: allProducts, isLoading: isProductsLoading } =
    useGetProductsQuery();

  const handleAddToCart = (item: any) => {
    dispatch(addToCart(item));
    toast.success(`${item?.title} sepete eklendi`, {
      position: "bottom-center",
    });
  };

  const handleRelatedProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  // Yükleme durumu
  if (isLoading || isProductsLoading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" tip="Ürün detayları yükleniyor..." />
      </div>
    );
  }

  // Hata durumu
  if (error || !product) {
    return (
      <Result
        status="404"
        title="404"
        subTitle="Ürün bulunamadı veya bir hata oluştu."
        extra={
          <Button type="primary" onClick={() => navigate("/")}>
            Ana Sayfaya Dön
          </Button>
        }
      />
    );
  }

  const relatedProducts = allProducts
    ? allProducts
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 4)
    : [];

  return (
    <div style={{ padding: "20px" }}>
      <Card
        style={{ borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}
      >
        <Row gutter={[32, 32]} justify="center" align="middle">
          {/* Ürün Resim Alanı */}
          <Col xs={24} md={10} style={{ textAlign: "center" }}>
            <Image
              src={product.image}
              alt={product.title}
              style={{
                width: "100%",
                maxWidth: "400px",
                height: "auto",
                objectFit: "contain",
                borderRadius: "8px",
              }}
            />
          </Col>
          {/* Ürün Detayları Alanı */}
          <Col xs={24} md={14}>
            <Title level={2}>{product.title}</Title>
            <Paragraph type="secondary" style={{ fontSize: "16px" }}>
              Kategori:{" "}
              <span style={{ textTransform: "capitalize" }}>
                {product.category}
              </span>
            </Paragraph>
            <Title level={4} style={{ color: "#389e0d", margin: "16px 0" }}>
              <DollarOutlined /> {product.price.toFixed(2)}
            </Title>
            <Paragraph style={{ fontSize: "16px", lineHeight: "1.6" }}>
              {product.description}
            </Paragraph>
            <Button
              type="primary"
              size="large"
              icon={<ShoppingCartOutlined />}
              onClick={() => handleAddToCart(product)}
              style={{ marginTop: "1rem", width: "100%", maxWidth: "300px" }}
            >
              Sepete Ekle
            </Button>
          </Col>
        </Row>
      </Card>

      {/* İlgili Ürünler Bölümü */}
      {relatedProducts.length > 0 && (
        <div style={{ marginTop: "40px" }}>
          <Divider orientation="left">
            <Title level={3} style={{ margin: 0 }}>
              <ShoppingOutlined /> Benzer Ürünler
            </Title>
          </Divider>
          <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
            {relatedProducts.map((p) => (
              <Col key={p.id} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  onClick={() => handleRelatedProductClick(p.id)}
                  style={{ borderRadius: "8px" }}
                  cover={
                    <div
                      style={{
                        height: "200px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "10px",
                      }}
                    >
                      <img
                        alt={p.title}
                        src={p.image}
                        style={{
                          maxHeight: "100%",
                          maxWidth: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  }
                  actions={[
                    <Button
                      type="primary"
                      icon={<ShoppingCartOutlined />}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(p);
                      }}
                    >
                      Sepete Ekle
                    </Button>,
                  ]}
                >
                  <Meta
                    title={p.title}
                    description={`$${p.price.toFixed(2)}`}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
