import { useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
import { useTheme } from "./hooks/useTheme";
import { SocketContextProvider } from "./contexts/SocketContext";
import { Routes, Route } from "react-router";
import MainLayout from "./layouts/MainLayout";
import NoChatPage from "./pages/NoChatPage";
import ChatPage from "./pages/ChatPage";
import CreateChatPage from "./pages/CreateChatPage";
import AuthLayout from "./layouts/AuthLayout";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import RequireAuth from "./components/RequireAuth";

function App() {
  const { isAuthenticated, setAuthData } = useAuth();
  const { savedTheme, setCurrentTheme } = useTheme();

  useEffect(() => {
    if (isAuthenticated) {
      setAuthData();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (savedTheme) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  return (
    <SocketContextProvider>
      <Routes>
        <Route element={<RequireAuth />}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<NoChatPage />} />
            <Route path="/chat/:id" element={<ChatPage />} />
            <Route
              path="/chat-create/:receiverId"
              element={<CreateChatPage />}
            />
          </Route>
        </Route>
        <Route path="auth" element={<AuthLayout />}>
          <Route path="sign-in" element={<SignInPage />} />
          <Route path="sign-up" element={<SignUpPage />} />
        </Route>
      </Routes>
    </SocketContextProvider>
  );
}

export default App;
