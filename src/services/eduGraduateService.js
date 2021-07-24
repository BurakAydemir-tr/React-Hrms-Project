import axios from "axios";

export default class EduGraduateService{
    getEduGraduates(){
        return axios.get("http://localhost:8080/api/edugraduates/getall");
    }
}