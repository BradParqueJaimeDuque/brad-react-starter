import { useAuth } from "@/contexts/AuthContext";
import { type Permission } from "@/types/Models";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const usePermission = (requiredPermission: Permission['href']) => {
    const { data, loading } = useAuth();
    const navigation = useNavigate();

    useEffect(() => {
        if (!loading && (!data || !data.permissions.some(permission => permission.href === requiredPermission))) {
            navigation('/dashboard', {viewTransition: true});
        }
    }, [loading, data, requiredPermission, navigation]);

    return loading;
};


export default usePermission