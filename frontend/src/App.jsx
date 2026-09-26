import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ChatPage from "./pages/ChatPage";
import OrdersPage from "./pages/OrdersPage";
import AuditPage from "./pages/AuditPage";
import ProfilePage from "./pages/ProfilePage";
import WalletPage from "./pages/WalletPage";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          user ? <Navigate to="/chat" replace /> : <LandingPage />
        }
      />

      <Route
        path="/chat"
        element={
          user ? <ChatPage /> : <Navigate to="/" replace />
        }
      />

      <Route
        path="/orders"
        element={
          user ? <OrdersPage /> : <Navigate to="/" replace />
        }
      />

      <Route
        path="/audit"
        element={
          user ? <AuditPage /> : <Navigate to="/" replace />
        }
      />

      <Route
        path="/profile"
        element={
          user ? <ProfilePage /> : <Navigate to="/" replace />
        }
      />

      <Route
        path="/wallet"
        element={
          user ? <WalletPage /> : <Navigate to="/" replace />
        }
      />
    </Routes>
  );
}

export default App;