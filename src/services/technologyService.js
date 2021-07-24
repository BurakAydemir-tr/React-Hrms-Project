import axios from "axios";

export default class TechnologyService{
    getByResumeId(resumeId){
        return axios.get("http://localhost:8080/api/technologies/getByResumeId?resumeId="+resumeId)
    }

    add(technology){
        return axios.post("http://localhost:8080/api/technologies/add",technology)
    }

    delete(technology){
        return axios.delete("http://localhost:8080/api/technologies/delete",{data:technology})
    }
}