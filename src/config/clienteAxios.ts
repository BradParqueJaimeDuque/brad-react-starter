import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true, // Permite el envío de cookies en cada solicitud
});

// Interceptor de solicitudes para agregar el token
api.interceptors.request.use(config => {
    const token = Cookies.get('token'); // Obtén el token de la cookie
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => Promise.reject(error));

// Interceptor de respuestas para manejar expiración del token
api.interceptors.response.use(response => response, async error => {
    if (error.response && error.response.status === 401) {
        const refreshToken = Cookies.get('refreshToken'); // Obtén el refresh token de la cookie

        if (refreshToken) {
            try {
                // Intenta obtener un nuevo token usando el refresh token
                const response = await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL}/api/auth/refresh`, 
                    { refreshToken: refreshToken }, 
                    { withCredentials: true } // Enviar cookies en la solicitud de renovación
                );

                const newToken = response.data.token;

                // Guarda el nuevo token en la cookie
                Cookies.set('token', newToken, { path: '/', secure: true, sameSite: 'lax' });

                // Reintenta la solicitud original con el nuevo token
                error.config.headers.Authorization = `Bearer ${newToken}`;
                return axios(error.config);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (refreshError) {
                console.log('El token de refresco es inválido.');
                Cookies.remove('token'); // Elimina el token
                Cookies.remove('refreshToken'); // Elimina el refreshToken
                window.location.href = '/';
            }
        }
    }
    return Promise.reject(error);
});

export default api;
