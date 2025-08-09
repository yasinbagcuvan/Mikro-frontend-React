import React from "react";
import { List, Button, Card, Typography, Space, Image } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
interface Product {
  id: number;
  title: string;
  price: number;
  image?: string;
}
export interface BasketProps {
  items: Product[];
  onRemove?: (id: number) => void;
}

const { Title, Text } = Typography;

const Basket: React.FC<BasketProps> = ({ items, onRemove }) => {
  const totalPrice = items.reduce((acc, item) => acc + item.price, 0);

  return (
    <Card style={{ width: "100%", paddingTop: "20px" }}>
      <List
        itemLayout="horizontal"
        dataSource={items}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Space>
                {/* Miktar kontrolü eklenebilir */}
                {/* <InputNumber 
                  min={1} 
                  defaultValue={1} 
                  onChange={(value) => onQuantityChange?.(item.id, value)} 
                /> */}
                <Button
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => onRemove?.(item.id)}
                >
                  Kaldır
                </Button>
              </Space>,
            ]}
          >
            <List.Item.Meta
              avatar={<Image width={60} src={item.image} />}
              title={<Text strong>{item.title}</Text>}
              description={`$${item.price.toFixed(2)}`}
            />
          </List.Item>
        )}
      />

      <div style={{ marginTop: "20px", textAlign: "right" }}>
        <Title level={4}>
          Toplam: <Text type="success">${totalPrice.toFixed(2)}</Text>
        </Title>
        <Button type="primary" size="large" style={{ marginTop: "10px" }}>
          Alışverişi Tamamla
        </Button>
      </div>
    </Card>
  );
};

export default Basket;
