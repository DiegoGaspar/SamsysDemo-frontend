import { ClientListDTO } from "../client/clientListDTO";

export class PaginationHelper {
    count:number;
    currentPage:number;
    totalRecords:number;
    hasNextPage:boolean;
    hasPreviousPage:boolean;
    items:Array<ClientListDTO>;
    pageSize: number;
    totalPages:number;
    
    constructor(
        count:number,
        currentPage:number,
        totalRecords:number,
        hasNextPage:boolean,
        hasPreviousPage:boolean,
        items:Array<ClientListDTO>,
        pageSize: number,
        totalPages:number
        ) {
        this.count=count,
        this.currentPage=currentPage,
        this.totalRecords=totalRecords,
        this.hasNextPage=hasNextPage,
        this.hasPreviousPage=hasPreviousPage,
        this.items=items,
        this.pageSize= pageSize,
        this.totalPages=totalPages
    }
    
}

export enum ErrorType {
    DataHasChanged = "DataHasChanged"
}