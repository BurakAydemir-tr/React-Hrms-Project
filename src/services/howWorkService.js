import axios from "axios";

export default class HowWorkService{
    getHowWorks(){
        return axios.get("http://localhost:8080/api/howWorks/getall");
    }
}