import React,{useState} from "react";
import { Card, Button, Input } from "semantic-ui-react";
import ResumeService from "../../services/resumeService";

export default function ImageUpdate({resumeId}) {

    let resumeService = new ResumeService();

    const [selectedFile, setSelectedFile] = useState()
    const [isFilePicked, setIsFilePicked] = useState(false)


    const fileSelectedHandler=(event)=>{
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    }

    const handleSubmit=()=>{
        const formData=new FormData();
        console.log(selectedFile)
        formData.append("file",selectedFile);
        console.log(formData)
        resumeService.uploadImage(formData,resumeId).then((result)=>{
            alert("Resim güncellendi.")
        })
    }

  return (
    <div>
      <Card fluid color={"black"}>
        <Card.Content header="Resim Yükle" />
        <Card.Content>
          <input
            //style={{ display: "none" }}
            type="file"
            onChange={fileSelectedHandler}
          />
          
          <Button color={"green"} onClick={handleSubmit} disabled={isFilePicked==false}>
            Yükle
          </Button>
        </Card.Content>
      </Card>
    </div>
  );
}
