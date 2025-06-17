import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { PropsCreate } from "./types";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import axios from "axios";
import Spinner from "@/components/Spinner";

const FormScheme = z.object({
    name: z.string().min(1, {
        message: "No envie este campo vacio."
    }),
})

export default function Create({onCreate, open, setOpen}: PropsCreate) {
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof FormScheme>>({
        resolver: zodResolver(FormScheme),
        defaultValues: {
            name: "",
        },
    })

    async function onSubmit(values: z.infer<typeof FormScheme>) {
        setLoading(true);
        try {
            /**
             * 🔧 TODO: Reemplazar esta lógica con la petición real a la API.
             * La API debe devolver el nuevo objeto creado con el tipo esperado.
             * Ejemplo:
             * const response = await api.post('/api/users', values);
             * onCreate(response.data.created);
             */
            const fakeCreated = {
                id: Date.now(), // reemplazar con ID real desde el backend
                ...values,
            };
            onCreate(fakeCreated);
            form.reset();
            setOpen(false);
            toast.success("Elemento creado exitosamente");
        } catch (error) {
            const errorMessage = axios.isAxiosError(error) && error.response
                ? error.response.data.message
                : "An unexpected error occurred";

            toast.error(errorMessage)
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[500px] ">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <DialogHeader>
                            <DialogTitle>Crear Usuario</DialogTitle>
                            <DialogDescription>Llena los datos del usuario</DialogDescription>
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
                            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                                Cancelar
                            </Button>
                            <Button
                                disabled={loading}
                            >
                                {loading && <Spinner />}
                                Crear
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
