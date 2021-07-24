import React from 'react'
import { Card, Form, Button } from "semantic-ui-react";
import * as Yup from "yup";
import { useFormik} from "formik";
import ResumeService from "../../services/resumeService";

export default function GithubUpdate({resume}) {

    let resumeService=new ResumeService();
    console.log(resume.githubLink)

    const updateGithubSchema=Yup.object().shape({
        githubLink:Yup.string().required("Zorunlu")
    })

    const formik=useFormik({
        initialValues:{
            githubLink:resume.githubLink
        },
        validationSchema:updateGithubSchema,
        onSubmit:(values)=>{
            resume.githubLink=values.githubLink
            resumeService.update(resume).then((result)=>{
                alert("Github linki güncellendi.")
            })
        }
    })

    return (
        <div>
            <Card fluid>
            <Form size="large" onSubmit={formik.handleSubmit}>
                <label><b>GitHub Link</b></label>
                <div style={{marginTop :"1em" ,marginBottom:"1em"}}>
                <Form.Input
                    fluid
                    placeholder="Github Link"
                    type="text"
                    value={formik.values.githubLink}
                    name="githubLink"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {
                formik.errors.githubLink && formik.touched.githubLink && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.githubLink}
                  </div>
                )
                }
              </div>
              <Button color="green" fluid size="large" type="submit">Güncelle</Button>
            </Form>
            </Card>
        </div>
    )
}
