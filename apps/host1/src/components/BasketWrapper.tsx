import React, { Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../store/cartSlice";
import { RootState } from "../store/store";
import { Spin, Empty, Button } from "antd"; // Yeni komponentler import edildi
import { useNavigate } from "react-router-dom"; // Yönlendirme için import edildi
import { ShoppingCartOutlined, ArrowLeftOutlined } from "@ant-design/icons"; // İkonlar import edildi
import { toast } from "react-hot-toast";
interface BasketProps {
  items: any[];
  onRemove?: (id: number) => void;
}

const BasketRemote = React.lazy(
  () =>
    import("basketRemote/Basket") as Promise<{
      default: React.ComponentType<BasketProps>;
    }>
);

export default function BasketWrapper() {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (id: number, title?: string) => {
    dispatch(removeFromCart(id));
    toast.error(`${title ?? "Ürün"} sepetten kaldırıldı`, {
      icon: "🗑️",
    });
  };

  // Eğer sepet boşsa
  if (items.length === 0) {
    return (
      <div style={{ textAlign: "center", paddingTop: "100px" }}>
        <Empty
          image={
            <ShoppingCartOutlined style={{ fontSize: 60, color: "#ccc" }} />
          }
          imageStyle={{ height: 120 }}
          description={
            <span style={{ fontSize: 18 }}>
              Sepetinizde ürün bulunmamaktadır.
            </span>
          }
        >
          <Button type="primary" onClick={() => navigate("/")}>
            <ArrowLeftOutlined /> Alışverişe Devam Et
          </Button>
        </Empty>
      </div>
    );
  }

  // Sepet yüklenirken spin
  const loadingFallback = (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <Spin size="large" tip="Sepetiniz yükleniyor..." />
    </div>
  );

  return (
    <Suspense fallback={loadingFallback}>
      <div style={{ padding: "20px" }}>
        <h2 style={{ marginBottom: "20px" }}>Sepetim</h2>
        <Button type="primary" className="mb-4" onClick={() => navigate("/")}>
          <ArrowLeftOutlined /> Geri Dön
        </Button>
        <BasketRemote items={items} onRemove={handleRemove} />
      </div>
    </Suspense>
  );
}
