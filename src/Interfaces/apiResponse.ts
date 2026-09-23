export default interface apiResponse{
    data?: {
       
        statusCode?: number;
        isSuccess?: boolean;
        totalCount?:number;
        errorMessages?: string[];
        result:{
            [key:string]:string
        };
        exist?:boolean
       
    };
    error?:any;   
}