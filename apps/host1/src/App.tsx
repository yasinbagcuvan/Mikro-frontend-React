import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductList from "./components/ProductList";
import AppFooter from "./components/Footer";
import Navbar from "./components/Navbar";
import { Layout } from "antd";
import AuthProvider from "./auth/auth0-provider";
import Callback from "./components/Callback";
import { MainLayout } from "./components/MainLayout";
import BasketPage from "./components/BasketPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <AuthProvider>
      <Layout style={{ minHeight: "100vh" }}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<MainLayout />} />
            <Route path="/BasketPage" element={<BasketPage />} />
            <Route path="/callback" element={<Callback />} />
          </Routes>
          <AppFooter />
        </Router>
        <Toaster position="top-right" />
      </Layout>
    </AuthProvider>
  );
}
export default App;
