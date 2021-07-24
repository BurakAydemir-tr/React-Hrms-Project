import axios from "axios"

export default class LanguageService{

    getByResumeId(resumeId){
        return axios.get("http://localhost:8080/api/languages/getByResumeId?resumeId="+resumeId)
    }

    add(language){
        return axios.post("http://localhost:8080/api/languages/add",language)
    }

    delete(language){
        return axios.delete("http://localhost:8080/api/languages/delete",{data:language})
    }
}