export type DataExampleType = {
    id: number,
    name: string
}

export const DATA_EXAMPLE: DataExampleType[] = [
    {
        id: 1,
        name: "Brad"
    },
    {
        id: 2,
        name: "Valentina"
    }
]

export interface ResponseData {
    results: DataExampleType[];
}

export interface PropsEdit {
    data: DataExampleType | null;
    setData: (value: DataExampleType | null) => void

    onUpdate: (updatedData: DataExampleType) => void;
}

export interface PropsDelete {
    data: DataExampleType | null;
    setData: (value: DataExampleType | null) => void

    onDelete: (user: DataExampleType) => void; 
}

export interface PropsCreate {
    onCreate: (newUser: DataExampleType) => void;

    open: boolean;
    setOpen: (value: boolean) => void
}