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
    bookmarks ?: string[];
    stud ?: [{id:string,date:Date,month:string,fees:number}]
    // paymentStatus ?: boolean;
}