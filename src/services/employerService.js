import axios from "axios";

export default class EmployerService{
    getEmployers(){
        return axios.get("http://localhost:8080/api/employers/getall");
    }

    getById(id){
        return axios.get("http://localhost:8080/api/employers/getById?id="+id)
    }

    update(employerUpdate){
        return axios.post("http://localhost:8080/api/employers/update",employerUpdate)
    }

    updateVerifiedByTrue(id,employeeId){
        return axios.post("http://localhost:8080/api/employers/updateVerifiedByTrue?employeeId="+employeeId+"&id="+id)
    }

    getEmployersConfirm(){
        return axios.get("http://localhost:8080/api/employers/findAllByVerifiedFalse")
    }
}