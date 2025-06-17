import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { PropsEdit } from "./types";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import axios from "axios";
import Spinner from "@/components/Spinner";

const FormScheme = z.object({
    name: z.string().min(1, {
        message: "No envie este campo vacio."
    }),
})

export default function Edit({data, setData, onUpdate}: PropsEdit) {
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof FormScheme>>({
        resolver: zodResolver(FormScheme),
        defaultValues: {
            name: "",
        },
    })

    useEffect(() => {
        if(data){
            form.reset({
                name: data.name,
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    async function onSubmit(values: z.infer<typeof FormScheme>) {
        setLoading(true);
        try {
            /**
             * 🔧 TODO: Reemplazar esta lógica con la petición real a la API.
             * Realizar una petición PUT o PATCH a `/api/users/:id` (o el endpoint que corresponda)
             * enviando los datos del formulario (`values`) al backend.
             * La respuesta debe incluir el objeto actualizado (por ejemplo: `response.data.updated`)
             * que luego se pasará a `onUpdate`.
             * 
             * Ejemplo:
             * const response = await api.put(`/api/users/${data?.id}`, values);
             * onUpdate(response.data.updated);
             */

            const fakeUpdated = {
                id: data?.id || 0,
                ...values,
            };
            onUpdate(fakeUpdated);
            form.reset();
            setData(null);
            toast.success("Elemento actualizado correctamente");
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
            <DialogContent className="sm:max-w-[500px] ">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <DialogHeader>
                            <DialogTitle>Editar Usuario</DialogTitle>
                            <DialogDescription>Modifica los datos del usuario {data?.name}</DialogDescription>
                        </DialogHeader>
                        <div>
                            <ScrollArea className="h-full w-full max-h-[calc(100dvh-14rem)]">
                                <div className="grid gap-4 py-4 grid-cols-2">
                                    <div>
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Nombres</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Nombres" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            </ScrollArea>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setData(null)}>
                                Cancelar
                            </Button>
                            <Button
                                disabled={loading}
                            >
                                {loading && <Spinner />}
                                Guardar cambios
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
