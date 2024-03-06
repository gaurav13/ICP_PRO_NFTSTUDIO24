import instance from "@/components/axios";
import axios from "axios";
import { toast } from "react-toastify";

let sendArticleEmail=async ( {isApproving,email,name,articleTitle,contentType,reason}:{isApproving:boolean,email:string,name:any,articleTitle:string,contentType:string,reason?:string})=>{
try {
  

  if(isApproving){
    const response = await axios.post(`${process.env.BASE_URL}email/articleApproved`, {
      email,
      name,
      articleTitle,
      contentType
     
    });
    return response;
  }else{
    const response = await instance.post(`${process.env.BASE_URL}email/articleRejected`, {
      email,
      name,
      articleTitle,
      contentType,
      reason
    });
    return response;
  }
} catch (error) {
  toast.error("There was an issue while send email.")
}
};

export {sendArticleEmail};