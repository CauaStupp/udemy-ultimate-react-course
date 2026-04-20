import Account from "@/pages/Account";
import Booking from "@/pages/Booking";
import Bookings from "@/pages/Bookings";
import Cabins from "@/pages/Cabins";
import Checkin from "@/pages/Checkin";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import PageNotFound from "@/pages/PageNotFound";
import ProtectedRoute from "@/pages/ProtectedRoute";
import Settings from "@/pages/Settings";
import NewUsers from "@/pages/Users";
import AppLayout from "@/ui/AppLayout";
import { Navigate, Route, Routes } from "react-router";

export function Router() {
  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate replace to="dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="bookings/:id" element={<Booking />} />
        <Route path="checkin/:id" element={<Checkin />} />
        <Route path="cabins" element={<Cabins />} />
        <Route path="users" element={<NewUsers />} />
        <Route path="settings" element={<Settings />} />
        <Route path="account" element={<Account />} />
      </Route>

      <Route path="login" element={<Login />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
