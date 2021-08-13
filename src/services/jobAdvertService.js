import axios from "axios";

export default class JobAdvertService {
  getJobAdverts() {
    console.log("test");
    return axios.get("http://localhost:8080/api/jobadvertisements/getall");
  }

  add(jobAdvert) {
    return axios.post(
      "http://localhost:8080/api/jobadvertisements/add",
      jobAdvert
    );
  }


    getById(id){
        return axios.get("http://localhost:8080/api/jobadvertisements/getById?id="+id)
    }

    getFilterAndPage(pageNo,pageSize,filterOption){
        return axios.post("http://localhost:8080/api/jobadvertisements/getFilterAndPage?pageNo="+pageNo+"&pageSize="+pageSize,filterOption)
    }
}
  
