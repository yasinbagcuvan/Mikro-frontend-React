import {
  Layout,
  Menu,
  Button,
  Space,
  Avatar,
  Badge,
  Typography,
  Drawer,
  Grid,
} from "antd";
import {
  UserOutlined,
  LoginOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import React, { useState } from "react";

const { Header } = Layout;
const { Title } = Typography;
const { useBreakpoint } = Grid;

const Navbar: React.FC = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const cartItemsCount = useSelector(
    (state: RootState) => state.cart.items.length
  );
  const [drawerVisible, setDrawerVisible] = useState(false);
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const menuItems = [
    { key: "products", label: <Link to="/products">Products</Link> },
    { key: "collections", label: <Link to="/collections">Collections</Link> },
    { key: "accessories", label: <Link to="/accessories">Accessories</Link> },
    { key: "gift-cards", label: <Link to="/gift-cards">Gift Cards</Link> },
  ];

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onCloseDrawer = () => {
    setDrawerVisible(false);
  };

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
      <div style={{ marginRight: 20 }}>
        <Link to="/">
          <Title level={4} style={{ margin: 0 }}>
            Kayra Export
          </Title>
        </Link>
      </div>

      {/* Masaüstü Menü */}
      {!isMobile && (
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={["products"]}
          style={{ flex: 1, minWidth: 0, borderBottom: "none" }}
          items={menuItems}
        />
      )}

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

        {/* Mobil Hamburger İkonu */}
        {isMobile && (
          <Button
            type="text"
            icon={<MenuOutlined style={{ fontSize: 24 }} />}
            onClick={showDrawer}
          />
        )}
      </Space>

      {/* Mobil Çekmecesi (Drawer) */}
      <Drawer
        title="Menü"
        placement="right"
        onClose={onCloseDrawer}
        open={drawerVisible}
      >
        <Menu
          mode="vertical"
          defaultSelectedKeys={["products"]}
          style={{ borderRight: 0 }}
          items={menuItems}
        />
      </Drawer>
    </Header>
  );
};

export default Navbar;
