export interface Employe {
  _id?: string;
  name:string;	
  surname:string;		
  phone:string;		
  email:string;		
  password:string;		
  available:Boolean;		
  state:string;		
  restaurantId: string,
  createdAt?:string;		
  updatedAt?	:string;	
   
}