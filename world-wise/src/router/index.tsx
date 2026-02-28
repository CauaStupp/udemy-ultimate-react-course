import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const Home = lazy(() => import("@/pages/Home"));
const Pricing = lazy(() => import("@/pages/Pricing"));
const Product = lazy(() => import("@/pages/Product"));
const Login = lazy(() => import("@/pages/Login"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const PrivateRoute = lazy(() => import("@/pages/PrivateRoute"));
const MapApp = lazy(() => import("@/pages/MapApp"));
const Cities = lazy(() => import("@/pages/Cities"));
const City = lazy(() => import("@/pages/City"));
const Countries = lazy(() => import("@/pages/Countries"));
const Form = lazy(() => import("@/pages/Form"));

import { Loading } from "@/components/Loading";

export function Router() {
  return (
    <Suspense fallback={<Loading />}>
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
    </Suspense>
  );
}
