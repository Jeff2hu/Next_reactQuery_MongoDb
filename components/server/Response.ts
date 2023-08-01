export const Response = (code: number, data:any) => {
    switch(code){
        case 200:
            return {
                message: "Success",
                code,
                data
            }
        case 400:
            return {
                message: "Bad Request",
                code: 400,
                data: null
            }
        case 404:
            return {
                message: "Not Found",
                code: 404,
                data: null
            }
        case 500:
            return {
                message: "Internal Server Error",
                code: 500,
                data: null
            }
        default:
            return {
                message: "Internal Server Error",
                code: 500,
                data: null
            }
    }
}