import { Layout, Menu, Button, Space, Avatar, Badge, Typography } from "antd";
import {
  UserOutlined,
  LoginOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const { Header } = Layout;
const { Title } = Typography;

const Navbar: React.FC = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const cartItemsCount = useSelector(
    (state: RootState) => state.cart.items.length
  );

  const menuItems = [
    { key: "products", label: <Link to="/products">Products</Link> },
    { key: "collections", label: <Link to="/collections">Collections</Link> },
    { key: "accessories", label: <Link to="/accessories">Accessories</Link> },
    { key: "gift-cards", label: <Link to="/gift-cards">Gift Cards</Link> },
  ];

  return (
    <Header
      style={{
        position: "fixed",
        zIndex: 1,
        width: "100%",
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
        backgroundColor: "#fff",
        borderBottom: "1px solid #e8e8e8",
      }}
    >
      {/* Logo ve Ana Sayfa Linki */}
      <div style={{ marginRight: 20 }}>
        <Link to="/">
          <Title level={3} style={{ margin: 0 }}>
            Kayra Export
          </Title>
        </Link>
      </div>

      {/* Menü Öğeleri */}
      <Menu
        theme="light"
        mode="horizontal"
        defaultSelectedKeys={["products"]}
        style={{ flex: 1, minWidth: 0, borderBottom: "none" }}
        items={menuItems} // 👈 `items` prop'u kullanıldı
      />

      {/* Sağ Taraf: İkonlar ve Butonlar */}
      <Space size="middle" style={{ marginLeft: "auto" }}>
        {/* Sepet İkonu */}
        <Link to="/BasketPage" style={{ color: "black" }}>
          <Badge count={cartItemsCount} offset={[-5, 5]}>
            <ShoppingCartOutlined style={{ fontSize: 24 }} />
          </Badge>
        </Link>

        {/* Auth0 ile kullanıcı kimlik doğrulama durumuna göre dinamik render */}
        {isAuthenticated && user ? (
          <>
            <Avatar
              src={user.picture}
              icon={<UserOutlined />}
              style={{ marginRight: 8 }}
            />
            <Button
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
              icon={<LogoutOutlined />}
            >
              Çıkış Yap
            </Button>
          </>
        ) : (
          <Button onClick={() => loginWithRedirect()} icon={<LoginOutlined />}>
            Giriş Yap
          </Button>
        )}
      </Space>
    </Header>
  );
};

export default Navbar;
