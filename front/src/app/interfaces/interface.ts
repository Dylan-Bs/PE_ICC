export interface Authentification {
    token :string;
    expiry : string;
    first_name: string;
    last_name: string;
    email : string;
    role: number;
  }

export interface Student{
    first_name: string;
    last_name: string;
    email:string;
    promotion:number;
    option:string;
    company:string;
    working_city:string;
    wage:string;

}
