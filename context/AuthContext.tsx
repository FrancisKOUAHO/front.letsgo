import {createContext, ReactNode, useContext, useEffect, useState,} from 'react';
import {useRouter} from 'next/router';
import {api} from '../config/api';
import {toast} from "react-toastify";
import {useGeolocated} from 'react-geolocated';

export const AuthContext = createContext<any>({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({children}: { children: ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [geolocation, setGeolocation] = useState<any>();
  const [token, setToken] = useState<any>(null);
  const [message, setMessage] = useState<string>('');

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        setToken(response.data.token);
        const token = localStorage.getItem('token');
        if (token) {
          setToken(token);
          await me(token);
        }
      }
    } catch (error: any) {
      setMessage(error.response.data.message);
      toast.error(error.response.data.message, {
        autoClose: 1000,
      });
    }
  };

  const me = async (token: any) => {
    try {
      const response = await api.get('/auth/me', {
        headers: {
          Accept: 'application/json',
          Context_Type: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setUser(response.data);
        console.log(response.data.id)
        localStorage.setItem('userId', response.data.id);
        if (!user){
          return;
        } else {
          await fetchGeolocation();
        }
      }
    } catch (error: any) {
      console.log(error);
        }
  };
  const register = async (email: File | string, password: File | string) => {
    const { data: response } = await api.post('auth/register', {
      email,
      password,
    });

    return response.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const {coords} = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  });

  const fetchGeolocation = async () => {
    try {
      await api
        .post('auth/localize', {
          latitude: coords?.latitude,
          longitude: coords?.longitude,
          userId: localStorage.getItem('userId'),
        })
        .then((response) => {
          if (response.status === 200) {
            setGeolocation(response.data);
          } else {
            toast.error('Erreur inattendue, nous travaillons à sa résolution.', {
              autoClose: 2000,
            });
          }
        });
    } catch (e) {
      toast.error('Vous devez être connecté(e) pour utiliser cette fonctionnalité. Connectez-vous pour continuer.', {
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
      me(token);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ login, register, logout, fetchGeolocation, user, message, geolocation }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
