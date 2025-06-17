import * as React from "react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon, Clock } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import type { Matcher } from "react-day-picker"

interface DateTimePickerProps {
    date?: Date
    onDateChange?: (date: Date | undefined) => void
    placeholder?: string
    className?: string
    disabled?: Matcher | Matcher[] | undefined;
}

export function DateTimePicker({
    date,
    onDateChange,
    placeholder = "Selecciona fecha y hora",
    className,
    disabled
}: DateTimePickerProps) {
    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(date)
    const [isOpen, setIsOpen] = React.useState(false)

    // Generate hours (1-12 for 12-hour format)
    const hours = Array.from({ length: 12 }, (_, i) => i + 1)
    // Generate minutes in 15-minute intervals

    const handleDateSelect = (newDate: Date | undefined) => {
        if (newDate) {
            const updatedDate = selectedDate ? new Date(selectedDate) : new Date()
            updatedDate.setFullYear(newDate.getFullYear())
            updatedDate.setMonth(newDate.getMonth())
            updatedDate.setDate(newDate.getDate())
            setSelectedDate(updatedDate)
            onDateChange?.(updatedDate)
        }
    }

    const handleTimeChange = (hour: number, minute: number, period: "AM" | "PM") => {
        const newDate = selectedDate ? new Date(selectedDate) : new Date()
        const hour24 = period === "PM" && hour !== 12 ? hour + 12 : period === "AM" && hour === 12 ? 0 : hour
        newDate.setHours(hour24, minute, 0, 0)
        setSelectedDate(newDate)
        onDateChange?.(newDate)
    }

    const getCurrentHour = () => {
        if (!selectedDate) return 12
        const hour = selectedDate.getHours()
        return hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
    }

    const getCurrentMinute = () => {
        return selectedDate?.getMinutes() || 0
    }

    const getCurrentPeriod = (): "AM" | "PM" => {
        if (!selectedDate) return "AM"
        return selectedDate.getHours() >= 12 ? "PM" : "AM"
    }

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen} modal>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className={cn(
                        "w-full justify-start text-left font-normal min-h-[40px] px-3",
                        !selectedDate && "text-muted-foreground",
                        className,
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4 flex-shrink-0" />
                    <span className="truncate">
                        {selectedDate ? format(selectedDate, "PPP 'a las' p", { locale: es }) : placeholder}
                    </span>
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="w-auto p-0 max-w-[95vw]"
                align="start"
                side="bottom"
                sideOffset={4}
                avoidCollisions={true}
                collisionPadding={8}
            >
                {/* Desktop Layout - Horizontal */}
                <div className="hidden sm:flex">
                    {/* Calendar Section */}
                    <div className="p-3 flex-shrink-0">
                        <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={handleDateSelect}
                            initialFocus
                            className="rounded-md capitalize"
                            locale={es}
                            disabled={disabled}
                        />
                    </div>

                    <Separator orientation="vertical" className="h-auto" />

                    {/* Time Section */}
                    <div className="p-3 w-64 min-w-0">
                        <div className="flex items-center gap-2 mb-3">
                            <Clock className="h-4 w-4 flex-shrink-0" />
                            <span className="text-sm font-medium">Seleccionar hora</span>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                            {/* Hour Selection */}
                            <div>
                                <label className="text-xs font-medium text-muted-foreground mb-2 block">Hora</label>
                                <div className="relative">
                                    {/* Top Gradient */}
                                    <div className="pointer-events-none absolute top-0 left-0 right-0 h-6 bg-gradient-to-b dark:from-black from-black/20 to-transparent z-10 rounded-t-md" />

                                    {/* Scrollable content */}
                                    <ScrollArea className="h-32 w-full rounded-md border relative z-0">
                                        <div className="p-1">
                                            {hours.map((hour) => (
                                                <Button
                                                    key={hour}
                                                    variant={getCurrentHour() === hour ? "default" : "ghost"}
                                                    className="w-full justify-center h-8 mb-1 text-sm"
                                                    onClick={() => handleTimeChange(hour, getCurrentMinute(), getCurrentPeriod())}
                                                >
                                                    {hour.toString().padStart(2, "0")}
                                                </Button>
                                            ))}
                                        </div>
                                    </ScrollArea>

                                    {/* Bottom Gradient */}
                                    <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t dark:from-black from-black/20 to-transparent z-10 rounded-b-md" />
                                </div>
                            </div>

                            {/* Minute Selection */}
                            <div>
                                <label className="text-xs font-medium text-muted-foreground mb-2 block">Minutos</label>

                                <div className="relative">
                                    <div className="pointer-events-none absolute top-0 left-0 right-0 h-6 bg-gradient-to-b dark:from-black from-black/20 to-transparent z-10 rounded-t-md" />
                                    <ScrollArea className="h-32 w-full rounded-md border">
                                        <div className="p-1">
                                            {Array.from({ length: 61 }, (_, minute) => (
                                                <Button
                                                    key={minute}
                                                    variant={getCurrentMinute() === minute ? "default" : "ghost"}
                                                    className="w-full justify-center h-7 mb-1 text-sm"
                                                    onClick={() => handleTimeChange(getCurrentHour(), minute, getCurrentPeriod())}
                                                >
                                                    {(minute).toString().padStart(2, "0")}
                                                </Button>
                                            ))}
                                        </div>
                                    </ScrollArea>
                                    <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t dark:from-black from-black/20 to-transparent z-10 rounded-b-md" />
                                </div>
                            </div>

                            {/* AM/PM Selection */}
                            <div>
                                <label className="text-xs font-medium text-muted-foreground mb-2 block">Período</label>
                                
                                <div className="relative">
                                    <div className="pointer-events-none absolute top-0 left-0 right-0 h-6 bg-gradient-to-b dark:from-black from-black/20 to-transparent z-10 rounded-t-md" />
                                    <div className="h-32 rounded-md border p-1 flex flex-col justify-center items-center">
                                        {(["AM", "PM"] as const).map((period) => (
                                            <Button
                                                key={period}
                                                variant={getCurrentPeriod() === period ? "default" : "ghost"}
                                                className="w-full justify-center h-7 mb-1 text-sm"
                                                onClick={() => handleTimeChange(getCurrentHour(), getCurrentMinute(), period)}
                                            >
                                                {period}
                                            </Button>
                                        ))}
                                    </div>
                                    <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t dark:from-black from-black/20 to-transparent z-10 rounded-b-md" />
                                </div>
                            </div>
                        </div>

                        <Separator className="my-4" />

                        {/* Quick Actions */}
                        <div className="grid grid-cols-2 gap-2">
                            <Button
                                variant="outline"
                                className="h-8 text-xs"
                                onClick={() => {
                                    const now = new Date()
                                    setSelectedDate(now)
                                    onDateChange?.(now)
                                }}
                            >
                                Ahora
                            </Button>
                            <Button
                                variant="outline"
                                className="h-8 text-xs"
                                onClick={() => {
                                    setSelectedDate(undefined)
                                    onDateChange?.(undefined)
                                }}
                            >
                                Limpiar
                            </Button>
                        </div>
                        <Button
                            className="h-8 text-xs mt-2 w-full"
                            onClick={() => {
                                setIsOpen(false)
                            }}
                        >
                            Aceptar
                        </Button>
                    </div>
                </div>

                {/* Mobile Layout - Tabs */}
                <div className="sm:hidden w-full">
                    <Tabs defaultValue="date" className="w-full p-3">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="date" className="text-xs">
                                📅 Fecha
                            </TabsTrigger>
                            <TabsTrigger value="time" className="text-xs">
                                🕐 Hora
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="date">
                            <Calendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={handleDateSelect}
                                initialFocus
                                className="rounded-md w-full"
                                disabled={disabled}
                            />
                        </TabsContent>

                        <TabsContent value="time">
                            <div className="grid grid-cols-3 gap-2">
                                {/* Hour Selections */}
                                <div>
                                    <label className="text-xs font-medium text-muted-foreground mb-2 block">Hora</label>

                                    <div className="relative">
                                        <div className="pointer-events-none absolute top-0 left-0 right-0 h-6 bg-gradient-to-b dark:from-black from-black/20 to-transparent z-10 rounded-t-md" />
                                        <ScrollArea className="h-32 w-full rounded-md border">
                                            <div className="p-1">
                                                {hours.map((hour) => (
                                                    <Button
                                                        key={hour}
                                                        variant={getCurrentHour() === hour ? "default" : "ghost"}
                                                        className="w-full justify-center h-7 mb-1 text-sm"
                                                        onClick={() => handleTimeChange(hour, getCurrentMinute(), getCurrentPeriod())}
                                                    >
                                                    {hour.toString().padStart(2, "0")}
                                                    </Button>
                                                ))}
                                            </div>
                                        </ScrollArea>
                                        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t dark:from-black from-black/20 to-transparent z-10 rounded-b-md" />
                                    </div>
                                </div>

                                {/* Minute Selection */}
                                <div>
                                    <label className="text-xs font-medium text-muted-foreground mb-2 block">Minutos</label>
                                    <div className="relative">
                                        <div className="pointer-events-none absolute top-0 left-0 right-0 h-6 bg-gradient-to-b dark:from-black from-black/20 to-transparent z-10 rounded-t-md" />
                                        <ScrollArea className="h-32 w-full rounded-md border">
                                            <div className="p-1">
                                                {Array.from({ length: 60 }, (_, minute) => (
                                                    <Button
                                                        key={minute}
                                                        variant={getCurrentMinute() === minute ? "default" : "ghost"}
                                                        className="w-full justify-center h-7 mb-1 text-sm"
                                                        onClick={() => handleTimeChange(getCurrentHour(), minute, getCurrentPeriod())}
                                                    >
                                                        {(minute).toString().padStart(2, "0")}
                                                    </Button>
                                                ))}
                                            </div>
                                        </ScrollArea>
                                        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t dark:from-black from-black/20 to-transparent z-10 rounded-b-md" />
                                    </div>
                                </div>

                                {/* AM/PM Selection */}
                                <div>
                                    <label className="text-xs font-medium text-muted-foreground mb-2 block">Período</label>
                                    <div className="relative">
                                        <div className="pointer-events-none absolute top-0 left-0 right-0 h-6 bg-gradient-to-b dark:from-black from-black/20 to-transparent z-10 rounded-t-md" />
                                        <div className="h-32 rounded-md border p-1 flex flex-col justify-center items-center">
                                            {(["AM", "PM"] as const).map((period) => (
                                                <Button
                                                    key={period}
                                                    variant={getCurrentPeriod() === period ? "default" : "ghost"}
                                                    className="w-full justify-center h-7 mb-1 text-sm"
                                                    onClick={() => handleTimeChange(getCurrentHour(), getCurrentMinute(), period)}
                                                >
                                                    {period}
                                                </Button>
                                            ))}
                                        </div>
                                        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t dark:from-black from-black/20 to-transparent z-10 rounded-b-md" />
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>

                    {/* Quick Actions - Always visible at bottom */}
                    <div className="p-3 pt-0">
                        <Separator className="mb-3" />
                        <div className="grid grid-cols-2 gap-2">
                            <Button
                                variant="outline"
                                className="h-8 text-xs"
                                onClick={() => {
                                    const now = new Date()
                                    setSelectedDate(now)
                                    onDateChange?.(now)
                                }}
                            >
                                Ahora
                            </Button>
                            <Button
                                variant="outline"
                                className="h-8 text-xs"
                                onClick={() => {
                                    setSelectedDate(undefined)
                                    onDateChange?.(undefined)
                                }}
                            >
                                Limpiar
                            </Button>
                        </div>
                        <Button
                            className="h-8 text-xs mt-2 w-full"
                            onClick={() => {
                                setIsOpen(false)
                            }}
                        >
                            Aceptar
                        </Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}