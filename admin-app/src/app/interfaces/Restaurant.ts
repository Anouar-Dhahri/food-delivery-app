export interface Restaurant{
    _id?:string;
    name: string;
    state: string;
    image: string;
    speciality: Boolean;
    address: string,
    phone:string,
    createdAt? : string;
    updatedAt? : string;
}