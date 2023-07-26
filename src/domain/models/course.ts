export interface Course {
    title : string;
    fee : number;
    category : string;
    subcategory : string[];
    description : string;
    thumbnail : string;
    video : string;
    tutId : string;
    status ?: boolean;
    students ?: [string];
    tutorial ?:[{video:string,thumbnail:string,title:string,description:string,}];
    // paymentStatus ?: boolean;
}