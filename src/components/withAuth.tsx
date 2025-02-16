
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'HI-CHShopping@Dialy1234#Token'; // Assicurati di utilizzare la stessa chiave segreta

const withAuth = <P extends object>(WrappedComponent: React.FC<P>) => {
  const AuthComponent: React.FC<P> = (props) =>{
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/auth/signin');
        return;
      }

      /*try {
        jwt.verify(token, SECRET_KEY);
      } catch (err) {
        localStorage.removeItem('token');
        router.push('/login');
      }*/
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
