import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

interface AuthGuardProps {
  children: ReactNode;
}

interface JwtPayload {
  exp: number;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const isTokenExpired = (token: string): boolean => {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded.exp * 1000 < Date.now();
    } catch (e: unknown) {
      console.error(e);
      return true;
    }
  };

  const isAuthenticated = token !== null && !isTokenExpired(token);

  useEffect(() => {
    if (!isAuthenticated) {
      if (token && isTokenExpired(token)) {
        localStorage.removeItem('token');
      }
      navigate('/admin');
    }
  }, [isAuthenticated, navigate, token]);

  return isAuthenticated ? <>{children}</> : null;
};

export default AuthGuard;
