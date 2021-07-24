import axios from "axios";

export default class ResumeService{
    getByCandidateId(id){
        return axios.get("http://localhost:8080/api/resumes/getByCandidateId?id="+id);
    }

    update(resume){
        return axios.post("http://localhost:8080/api/resumes/update",resume)
    }

    uploadImage(formData,resumeId){
        return axios.post("http://localhost:8080/api/resumes/uploadImage?resumeId="+resumeId,formData,{
            headers: { "Content-Type": "multipart/form-data" }})
    }
}