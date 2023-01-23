export interface Order {
    _id:string;	
    clientId:string;
    items:Array<{}>;
    restaurantId:number;
    employeId:number;
    totalPrice:string;
    paymentType:string;
    paid: boolean;
    state:string;
    status:boolean;
    createdAt?: string ; 	
    updatedAt?: string ; 
}