import React,{ useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Card, Button, Grid, Form,Table } from "semantic-ui-react";
import JobExperienceService from "../../services/jobExperienceService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function JobExperienceUpdate({ resumeId }) {

    const [jobExperiences, setJobExperiences] = useState([])

    let jobExperienceService=new JobExperienceService();

    useEffect(()=>{
      jobExperienceService.getByResumeId(resumeId).then((result)=>{
        setJobExperiences(result.data.data)
      })
    },[jobExperiences])

    const jobExperienceSchema=Yup.object({
        companyName:Yup.string().required("Zorunlu alan"),
        jobPosition:Yup.string().required("Zorunlu alan")
    })

    const formik=useFormik({
        initialValues:{
            companyName:"",
            jobPosition:"",
            startedDate:"",
            endedDate:""
        },
        validationSchema:jobExperienceSchema,
        onSubmit:(values)=>{
            values.resumeId=resumeId
            jobExperienceService.add(values).then((result)=>{
              alert("İş tecrübesi eklendi.")
            })
        }
    })

    const handleDeleteJobExperiance=(jobExperience)=>{
        jobExperienceService.delete(jobExperience).then((result)=>{
          alert("İş tecrübesi silindi.")
        })
    }

  return (
    <div>
      <Card fluid color={"black"}>
                <Card.Content header="Tecrübeler" />
                <Table celled color={"black"}>
                <Table.Header>
                    <Table.Row>
                    <Table.HeaderCell>Şirket Adı</Table.HeaderCell>
                    <Table.HeaderCell>Pozisyon</Table.HeaderCell>
                    <Table.HeaderCell>Başlangıç Tarihi</Table.HeaderCell>
                    <Table.HeaderCell>Bitiş Tarihi</Table.HeaderCell>
                    <Table.HeaderCell>Sil</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {jobExperiences?.map((jobExperience) => (
                        <Table.Row key={jobExperience.id}>
                            <Table.Cell>{jobExperience.companyName}</Table.Cell>
                            <Table.Cell>{jobExperience.jobPosition}</Table.Cell>
                            <Table.Cell>{jobExperience.startedDate}</Table.Cell>
                            <Table.Cell>{jobExperience.endedDate ? jobExperience.endedDate:<p>Devam ediyor</p>}</Table.Cell>
                            <Table.Cell>
                            <Button color="red" icon="x" circular onClick={() => handleDeleteJobExperiance(jobExperience)}>
                            </Button>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
                </Table>
            </Card>
      <Card fluid color={"black"}>
        <Card.Content header="İş Deneyimini Güncelle" />
        <Card.Content>
          <Form onSubmit={formik.handleSubmit}>
            <Grid stackable>
              <Grid.Column width={8}>
                <label>
                  <b>Şirket Adı</b>
                </label>
                <Form.Input
                  fluid
                  placeholder="Şirket Adı"
                  type="text"
                  name="companyName"
                  value={formik.values.companyName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.companyName && formik.touched.companyName && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.companyName}
                  </div>
                )}
                <label>
                  <b>Başlangıç Tarihi</b>
                </label>
                <div>
                  <DatePicker
                    name="startedDate"
                    dateFormat="yyyy-MM-dd"
                    selected={formik.values.startedDate}
                    value={formik.values.startedDate}
                    onChange={(val) => formik.setFieldValue("startedDate", val)}
                  />
                  {formik.errors.startedDate && formik.touched.startedDate && (
                    <div className={"ui pointing red basic label"}>
                      {formik.errors.startedDate}
                    </div>
                  )}
                </div>
              </Grid.Column>
              <Grid.Column width={8}>
                <label>
                  <b>İş Pozisyonu</b>
                </label>
                <Form.Input
                  fluid
                  placeholder="İş Pozisyonu"
                  type="text"
                  name="jobPosition"
                  value={formik.values.jobPosition}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.jobPosition && formik.touched.jobPosition && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.jobPosition}
                  </div>
                )}
                <label>
                  <b>Bitiş Tarihi</b>
                </label>
                <div>
                  <DatePicker
                    fluid="true"
                    name="endedDate"
                    dateFormat="yyyy-MM-dd"
                    selected={formik.values.endedDate}
                    value={formik.values.startedDate}
                    onChange={(val) => formik.setFieldValue("endedDate", val)}
                  />

                  {formik.errors.endedDate && formik.touched.endedDate && (
                    <div className={"ui pointing red basic label"}>
                      {formik.errors.endedDate}
                    </div>
                  )}
                </div>
              </Grid.Column>
            </Grid>

            <div style={{ marginTop: "1em" }}>
              <Button fluid color="green" type="submit">
                Kaydet
              </Button>
            </div>
          </Form>
          
        </Card.Content>
      </Card>
    </div>
  );
}
