import { useState } from "react";
import { Routes, Route } from "react-router";
import MainLayout from "./layouts/MainLayout";
import NoChatPage from "./pages/NoChatPage";
import ChatPage from "./pages/ChatPage";
import CreateChatPage from "./pages/CreateChatPage";
import AuthLayout from "./layouts/AuthLayout";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<NoChatPage />} />
        <Route path="/chat/:id" element={<ChatPage />} />
        <Route path="/chat-create/:receiverId" element={<CreateChatPage />} />
      </Route>
      <Route path="auth" element={<AuthLayout />}>
        <Route path="sign-in" element={<SignInPage />} />
        <Route path="sign-up" element={<SignUpPage />} />
      </Route>
    </Routes>
  );
}

export default App;
