import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function AuthSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/dashboard", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  }, [navigate, searchParams]);

  return (
    <div className="h-screen flex items-center justify-center">
      <p className="text-lg font-medium">Logging you in with GitHub...</p>
    </div>
  );
}

export default AuthSuccess;
