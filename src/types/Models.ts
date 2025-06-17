/**
 * Datos obtenidos al verificar el usuario autenticado.
 * Puedes extender los genéricos <U, P> con tus tipos reales.
 */
export interface ResponseData<U = unknown, P = unknown> {
    user: U;
    permissions: P[];
}

/**
 * Respuesta que devuelve el login.
 */
export interface LoginResponse<U = unknown, P = unknown> {
    data: {
        success: boolean;
        token: string;
        refreshToken: string;
        data: {
            user: U;
            permissions: P[];
        };
    };
}
