import axios from "axios";

export default class JobExperienceService{
    add(jobExperience){
        return axios.post("http://localhost:8080/api/jobExperiences/add",jobExperience)
    }

    delete(jobExperience){
        return axios.delete("http://localhost:8080/api/jobExperiences/delete",{data:jobExperience})
    }

    getByResumeId(resumeId){
        return axios.get("http://localhost:8080/api/jobExperiences/getByResumeId?resumeId="+resumeId)
    }
}