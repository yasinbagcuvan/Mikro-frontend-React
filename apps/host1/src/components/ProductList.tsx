import { useGetProductsQuery } from "../store/fakeStoreApi";
import { useNavigate } from "react-router-dom";
import { Card, Row, Col, Spin, Empty, Typography } from "antd";

const { Meta } = Card;
const { Title, Text } = Typography;

const ProductList = () => {
  const { data, isLoading, isError } = useGetProductsQuery();
  const navigate = useNavigate();

  const handleCardClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  // Yükleme durumu
  if (isLoading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Spin size="large" /> {/* tip prop'u kaldırıldı */}
        <Text style={{ marginTop: "10px", display: "block" }}>
          Ürünler yükleniyor...
        </Text>
      </div>
    );
  }

  // Hata durumu
  if (isError) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Empty description="Ürünler yüklenirken bir hata oluştu." />
      </div>
    );
  }

  // Veri yoksa durumu
  if (!data || data.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Empty description="Gösterilecek ürün bulunmamaktadır." />
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", marginTop: 64 }}>
      <Title level={2}>Tüm Ürünlerimizi Keşfedin</Title>
      {/* grid sistemiyle duyarlı düzen */}
      <Row gutter={[16, 16]}>
        {data.map((product) => (
          // Ekran boyutuna göre kolon genişliği
          <Col key={product.id} xs={24} sm={12} md={8} lg={6} xl={4}>
            <Card
              hoverable
              onClick={() => handleCardClick(product.id)}
              cover={
                <img
                  alt={product.title}
                  src={product.image}
                  // Görselin oranını bozmadan alana sığdırır
                  style={{
                    height: "200px",
                    objectFit: "contain",
                    padding: "10px",
                  }}
                />
              }
            >
              <Meta
                title={
                  <div
                    // Uzun başlıklartaşmaz
                    style={{
                      height: "3em",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {product.title}
                  </div>
                }
                description={
                  <span
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "#1890ff",
                    }}
                  >
                    ${product.price.toFixed(2)}
                  </span>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductList;
