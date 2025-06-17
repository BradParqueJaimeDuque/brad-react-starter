import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { useEffect, useState } from "react";
import api from "@/config/clienteAxios";
import { DATA_EXAMPLE, type DataExampleType, type ResponseData } from "./types";
import Edit from "./Edit";
import Delete from "./Delete";
import Create from "./Create";
import { useArrayDataManager } from "@/hooks/useArrayDataManager";

export default function Example() {
    // const loading = usePermission("/example")
    const [data, setData] = useState<ResponseData>()
    const [example, setExample] = useState(DATA_EXAMPLE)
    const [edit, setEdit] = useState<DataExampleType | null>(null)
    const [deleteUser, setDelete] = useState<DataExampleType | null>(null)
    const [openCreate, setOpenCreate] = useState(false)

    const { onCreate, onUpdate, onDelete } = useArrayDataManager<DataExampleType>(setExample);

    const fetchData = async() => {
        try{
            api.get('/api/users/data')
                .then(res => {
                    setData(res.data)
                    setExample(data?.results || [])
                })
        }catch(e){
            console.log(e);
        }
    }

    useEffect(() => {
        fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // if(loading){
    //     return <div className="flex items-center justify-center inset-0 h-full"><Loader /></div>
    // }
    
    return (
        <div className="@container/main flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <DataTable 
                columns={columns(setDelete, setEdit)} 
                data={example} 
                addButtonLabel="Nuevo"
                addButtonProps={{
                    onClick: () => setOpenCreate(true)
                }}
            />

            <Create 
                open={openCreate}
                setOpen={setOpenCreate}
                onCreate={onCreate}
            />

            <Edit 
                data={edit}
                onUpdate={onUpdate}
                setData={setEdit}
            />

            <Delete 
                data={deleteUser}
                onDelete={onDelete}
                setData={setDelete}
            />
        </div>
    )
}
