import React from "react";
import {
  useGetProductByIdQuery,
  useGetProductsQuery,
} from "../store/fakeStoreApi";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { toast } from "react-hot-toast";
import { Card, Button, Typography, Spin, Row, Col, Image, Result } from "antd";
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
    toast.success(`${item?.title} sepete eklendi`);
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
          <Button type="primary" href="/">
            Ana Sayfa
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
      <Card>
        {/* İçeriklerin duyarlı bir şekilde yan yana/alt alta gelmesini sağlar */}
        <Row gutter={[32, 32]}>
          {/* Ekran boyutuna göre resim kolonunu ayarlar */}
          <Col xs={24} md={10}>
            <Image
              src={product.image}
              alt={product.title}
              // Resmin orantılı şekilde alana sığmasını sağlar
              style={{ width: "100%", objectFit: "contain" }}
            />
          </Col>
          {/* Ekran boyutuna göre detay kolonunu ayarlar */}
          <Col xs={24} md={14}>
            <Title level={2}>{product.title}</Title>
            <Title level={4} style={{ color: "green" }}>
              <DollarOutlined /> {product.price.toFixed(2)}
            </Title>
            <Paragraph>{product.description}</Paragraph>
            <Button
              type="primary"
              size="large"
              icon={<ShoppingCartOutlined />}
              onClick={() => handleAddToCart(product)}
              style={{ marginTop: "1rem" }}
            >
              Sepete Ekle
            </Button>
          </Col>
        </Row>
      </Card>

      {relatedProducts.length > 0 && (
        <div style={{ marginTop: "40px" }}>
          <Title level={3}>
            <ShoppingOutlined /> Sık Alınan Ürünler
          </Title>
          {/* Benzer ürünler için duyarlı grid düzeni */}
          <Row gutter={[16, 16]}>
            {relatedProducts.map((p) => (
              // Farklı ekranlarda kolon sayısını belirler
              <Col key={p.id} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  onClick={() => handleRelatedProductClick(p.id)}
                  cover={
                    <img
                      alt={p.title}
                      src={p.image}
                      // Resim boyutlandırması
                      style={{
                        height: "200px",
                        objectFit: "contain",
                        padding: "10px",
                      }}
                    />
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
