import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import { Eye } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import Spinner from "@/components/Spinner"
import { useAuth } from "@/contexts/AuthContext"
import { useNavigate } from "react-router"

const FormSchema = z.object({
    email: z.string().email({
        message: "Email inválido",
    }),
    password: z.string().min(1, {
        message: "No envie este campo vacio",
    }),
})

/**
 * Este starter usa cookies HTTP-only para la autenticación.
 * Las cookies son seteadas desde el backend mediante encabezados `Set-Cookie`.
 * Por seguridad, no se accede a las cookies desde JavaScript.
 */

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"form">) {
    const [inputPass, setInputPass] = useState<string>("password");
    const [loading, setLoading] = useState(false);
    const [remember, setRemember] = useState<boolean>(false);
    const {login} = useAuth()
    const navigation = useNavigate()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
            defaultValues: {
            email: "",
            password: ""
        },
    })

    useEffect(() => {
        const savedUsername = localStorage.getItem("username");
        const savedPassword = localStorage.getItem("password");
        const savedRemember = localStorage.getItem("remember") === "true";
    
        if (savedUsername && savedPassword && savedRemember) {
            form.setValue("email", savedUsername);
            form.setValue("password", savedPassword);
            setRemember(savedRemember);
        }
    }, [form]);

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setLoading(true);
        const result = await login(data);

        if (result.success) {
            navigation("/dashboard", { viewTransition: true });
            toast.success("Autenticado exitosamente");
        } else {
            toast.error(result.error);
        }
        setLoading(false);
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={cn("flex flex-col gap-6", className)} {...props}>
                <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-bold">Inicia sesión en tu cuenta</h1>
                    <p className="text-muted-foreground text-sm text-balance">
                        Ingrese su correo electrónico a continuación para iniciar sesión en su cuenta.
                    </p>
                </div>
                <div className="grid gap-6">
                    <div className="grid gap-3">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid gap-3">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="relative">
                                    <FormLabel>Contraseña</FormLabel>
                                    <FormControl>
                                        <Input type={inputPass} placeholder="Contraseña" {...field} />
                                    </FormControl>
                                    <Eye className='absolute right-3 top-7 cursor-pointer' onClick={() => setInputPass(inputPass === "password" ? "text" : "password")} />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox
                            checked={remember}
                            onCheckedChange={() => setRemember(!remember)}
                        />
                        <p className="text-sm">Recordar</p>
                    </div>
                    <Button type="submit" className="w-full">
                        {loading && <Spinner />}
                        Iniciar sesión
                    </Button>
                </div>
            </form>
        </Form>
    )
}
