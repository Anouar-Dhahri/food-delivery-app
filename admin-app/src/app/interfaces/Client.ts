export interface Client{
    _id?: string;
    name: string;
    surname: string;
    phone: string;
    address: string,
    state: string;
    status: Boolean;
    email:string,
    password:string,
    plainPassword:string,
    createdAt? : string;
    updatedAt? : string;
}