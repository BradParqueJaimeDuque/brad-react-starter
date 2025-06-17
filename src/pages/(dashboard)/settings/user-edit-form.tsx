import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Save, User, Shield } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"

export default function UserEditForm() {
    const {data} = useAuth()
    const user = data?.user
    
    if(!user) return
    
    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Editar Usuario</h1>
                    <p className="text-muted-foreground mt-1">Actualiza la información del usuario</p>
                </div>
                {/* <Badge variant={user.worth?.active ? "default" : "secondary"} className="text-sm">
                    {user.worth?.active ? "Activo" : "Inactivo"}
                </Badge> */}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Personal Information */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                            Información Personal
                        </CardTitle>
                        <CardDescription>Datos básicos del usuario</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nombre <span className="text-red-600">*</span></Label>
                                <Input
                                    id="name"
                                    // value={user.name}
                                    placeholder="Ingresa el nombre"
                                    disabled
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastname">Apellidos <span className="text-red-600">*</span></Label>
                                <Input
                                    id="lastname"
                                    // value={user.lastname}
                                    placeholder="Ingresa los apellidos"
                                    disabled
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="document">Documento <span className="text-red-600">*</span></Label>
                                <Input
                                    id="document"
                                    type="number"
                                    // value={user.document}
                                    placeholder="Número de documento"
                                    disabled
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Correo Electrónico <span className="text-red-600">*</span></Label>
                                <Input
                                    id="email"
                                    type="email"
                                    // value={user.email || ""}
                                    placeholder="correo@ejemplo.com"
                                    disabled
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Profile & Worth Info */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Shield className="h-5 w-5" />
                            Perfil y Cargo
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Perfil</Label>
                            <div className="p-3 bg-muted rounded-md border">
                                {/* <p className="font-medium text-sm">{user.profile.name}</p>
                                <p className="text-xs text-muted-foreground">ID: {user.profile.id}</p> */}
                            </div>
                        </div>

                        {/* {user.worth && (
                            <div className="space-y-2">
                                <Label>Gestión</Label>
                                <div className="p-3 bg-muted rounded-md border">
                                    <p className="font-medium text-sm">{user.worth.name}</p>
                                    <p className="text-xs text-muted-foreground">Dominio: {user.worth.domain_id}</p>
                                </div>
                            </div>
                        )} */}

                        <Separator />

                        <div className="space-y-2">
                            <Label className="text-xs">INFORMACIÓN DEL SISTEMA</Label>
                            <div className="p-3 bg-muted rounded-md border">
                                {/* <p className="text-xs text-muted-foreground">ID: {user.id}</p>
                                <p className="text-xs text-muted-foreground">Creado: {format(new Date(user.created_at), "dd/MM/yyyy", { locale: es })}</p>
                                <p className="text-xs text-muted-foreground">Actualizado: {format(new Date(user.updated_at), "dd/MM/yyyy", { locale: es })}</p> */}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t">
                <Button disabled className="min-w-[120px]">
                    <div className="flex items-center gap-2">
                        <Save className="h-4 w-4" />
                        Guardar Cambios
                    </div>
                </Button>
            </div>
        </div>
    )
}
