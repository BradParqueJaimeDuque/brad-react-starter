import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { PropsDelete } from "./types";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import Spinner from "@/components/Spinner";

export default function Delete({data, setData, onDelete}: PropsDelete) {
    const [loading, setLoading] = useState(false)

    async function onSubmit() {
        if (!data) return;

        setLoading(true);
        try {
            /**
             * 🔧 TODO: Reemplazar esta lógica con la petición real a la API.
             * Hacer una solicitud DELETE al endpoint correspondiente, por ejemplo: `/api/users/:id`.
             * Si la eliminación es exitosa, se debe llamar a `onDelete(data)` para actualizar el estado local.
             * 
             * Ejemplo:
             * const response = await api.delete(`/api/users/${data.id}`);
             * if (response.data.success) {
             *     onDelete(data);
             * }
             */

            onDelete(data);
            setData(null);
            toast.success("Elemento eliminado correctamente");
        } catch (error) {
            const errorMessage = axios.isAxiosError(error) && error.response
                ? error.response.data.message
                : "Ocurrió un error inesperado";

            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={!!data} onOpenChange={() => setData(null)}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Confirmar Eliminación</DialogTitle>
                    <DialogDescription>
                        ¿Estás seguro de que quieres eliminar al usuario <span className="font-semibold">{data?.name}</span>
                        ? Esta acción no se puede deshacer.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setData(null)}>
                        Cancelar
                    </Button>
                    <Button variant="destructive" onClick={onSubmit} disabled={loading}>
                        {loading && <Spinner />}
                        Eliminar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
