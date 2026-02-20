import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "@/pages/Home";
import { Pricing } from "@/pages/Pricing";
import { Product } from "@/pages/Product";
import { Login } from "@/pages/Login";
import { NotFound } from "@/pages/NotFound";
import { MapApp } from "@/pages/MapApp";
import { Cities } from "@/pages/Cities";
import { Countries } from "@/pages/Countries";
import { Form } from "@/pages/Form";
import { City } from "@/pages/City";
import { PrivateRoute } from "@/pages/PrivateRoute";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/product" element={<Product />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/app"
        element={
          <PrivateRoute>
            <MapApp />
          </PrivateRoute>
        }
      >
        <Route index element={<Navigate replace to="cities" />} />
        <Route path="cities" element={<Cities />} />
        <Route path="cities/:id" element={<City />} />
        <Route path="countries" element={<Countries />} />
        <Route path="form" element={<Form />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
