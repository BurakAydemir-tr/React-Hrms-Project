import axios from "axios"

export default class SchoolService{
    getByResumeId(resumeId){
        return axios.get("http://localhost:8080/api/schools/getByResumeId?resumeId="+resumeId)
    }

    add(school){
        return axios.post("http://localhost:8080/api/schools/add",school)
    }

    delete(school){
        return axios.delete("http://localhost:8080/api/schools/delete",{data:school})
    }
}