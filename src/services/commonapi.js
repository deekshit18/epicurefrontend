import axios from "axios";
export const commonapi=async(httprequest,url,reqbody,reqheader)=>{
    const reqConfig={
        method:httprequest,
        url,
        data:reqbody,
        headers:reqheader?reqheader:{"Content-Type":"application/json"}
    }
    return await axios(reqConfig).then((result=>{
        return result
    })).catch((err)=>{
        return err
    })
}