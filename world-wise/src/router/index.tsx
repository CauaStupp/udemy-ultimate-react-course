import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Pricing } from "../pages/Pricing";
import { Product } from "../pages/Product";
import { Login } from "../pages/Login";
import { NotFound } from "../pages/NotFound";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/product" element={<Product />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
