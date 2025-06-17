import { type ColumnDef } from "@tanstack/react-table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import type { DataExampleType } from "./types";

export const columns = (setDelete: (v: DataExampleType) => void, setEdit: (v: DataExampleType) => void): ColumnDef<DataExampleType>[] => [
    {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => <span>{row.getValue("id")}</span>,
    },
    {
        accessorKey: "name",
        header: "Nombre",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("name")}</div>
        ),
        enableGlobalFilter: true
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const data = row.original;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-32">
                        <DropdownMenuItem
                            onClick={() => setEdit(data)}
                        >
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                            variant="destructive"
                            onClick={() => setDelete(data)}
                        >
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>                 
                </DropdownMenu>
            );
        },
    }
];
