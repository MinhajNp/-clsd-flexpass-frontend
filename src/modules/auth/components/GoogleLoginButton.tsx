import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";

interface GoogleLoginButtonProps {
  onSuccess: (idToken: string) => void;
  loading?: boolean;
}

const GoogleLoginButton = ({ onSuccess, loading }: GoogleLoginButtonProps) => {
  return (
    <div className="w-full flex justify-center">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          if (credentialResponse.credential) {
            onSuccess(credentialResponse.credential);
          }
        }}
        onError={() => {
          console.error("Login Failed");
        }}
        useOneTap
        theme="outline"
        size="large"
        shape="pill"
        width="100%"
        text="continue_with"
      />
    </div>
  );
};

export default GoogleLoginButton;
