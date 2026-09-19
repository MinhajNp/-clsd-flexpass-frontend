import { Toaster } from "react-hot-toast";
import AppRouter from "./routes/AppRouter";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Toaster position="top-center" />
      <AppRouter />
    </GoogleOAuthProvider>
  );
}

export default App;