import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState, useEffect } from "react";
import { Card, Button, Grid, Form, Table, Dropdown } from "semantic-ui-react";
import SchoolService from "../../services/schoolService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import EduGraduateService from "../../services/eduGraduateService";

export default function SchoolUpdate({ resumeId }) {
  

  let schoolService = new SchoolService();

  const [schools, setSchools] = useState([]);

  useEffect(() => {
    schoolService.getByResumeId(resumeId).then((result) => {
      setSchools(result.data.data);
    });
  },[resumeId]);

  const [eduGraduates, setEduGraduates] = useState([]);

  useEffect(() => {
    let eduGraduateService = new EduGraduateService();
    eduGraduateService
      .getEduGraduates()
      .then((result) => setEduGraduates(result.data.data));
  },[]);

  const eduGraduateOption = eduGraduates.map((eduGraduate, index) => ({
    key: index,
    text: eduGraduate.graduateDegree,
    value: eduGraduate.id,
  }));

  const schoolSchema = Yup.object({
    schoolName: Yup.string().required("Zorunlu alan"),
    department: Yup.string().required("Zorunlu alan"),
    startedDate: Yup.date().required("Zorunlu alan").nullable(),
    eduGraduate:Yup.string().required("Zorunlu alan")
  });

  const formik = useFormik({
    initialValues: {
      schoolName: "",
      department: "",
      startedDate: "",
      endedDate: "",
    },
    validationSchema: schoolSchema,
    onSubmit: (values) => {
      //console.log(values)
      let eduGraduateId=values.eduGraduate;
      //values.eduGraduate.id=eduGraduateId;
      let newSchool = {
        ...values,
        resume: { id: resumeId },
        eduGraduate: { id: eduGraduateId }
      };

      console.log(newSchool);
      schoolService.add(newSchool).then((result) => {
        alert("Okul güncellendi");
        //formik.resetForm()
        schoolService.getByResumeId(resumeId).then((result)=>{
          setSchools(result.data.data)
        })
      });
    },
  });

  const handleDeleteSchool = (school) => {
    console.log(school)
      let newSchool = {
        ...school,
        resume: { id: resumeId }
      };
    schoolService.delete(newSchool).then((result) => {
      alert("Okul Silindi");
      schoolService.getByResumeId(resumeId).then((result)=>{
        setSchools(result.data.data)
      })
    });
  };

  const handleUpdateSchool=(school)=>{
    //console.log(school)
    formik.values.id=school.id
    formik.values.schoolName=school.schoolName
    formik.values.department=school.department
    formik.values.startedDate=new Date(school.startedDate) 
    formik.values.endedDate=new Date(school.endedDate)
  }

  const handleChangeSemantic = (value, fieldName) => {
    formik.setFieldValue(fieldName, value);
    //console.log(value, fieldName);
  };
  return (
    <div>
      <Card fluid color={"black"}>
        <Card.Content header="Okuduğu Okullar" />
        <Table celled color={"black"}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Okul Adı</Table.HeaderCell>
              <Table.HeaderCell>Bölüm</Table.HeaderCell>
              <Table.HeaderCell>Başlangıç Tarihi</Table.HeaderCell>
              <Table.HeaderCell>Mezuniyet Tarihi</Table.HeaderCell>
              <Table.HeaderCell>Sil</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {schools?.map((school) => (
              <Table.Row key={school.id}>
                <Table.Cell>{school.schoolName}</Table.Cell>
                <Table.Cell>{school.department}</Table.Cell>
                <Table.Cell>{school.startedDate}</Table.Cell>
                <Table.Cell>{school.endedDate}</Table.Cell>
                <Table.Cell>
                  <Button.Group>
                    <Button color="green" icon="edit" circular onClick={()=>handleUpdateSchool(school)}></Button>
                    <Button
                      color="red"
                      icon="x"
                      circular
                      onClick={() => handleDeleteSchool(school)}
                    ></Button>
                  </Button.Group>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>
      <Card fluid color={"black"}>
        <Card.Content header="Okul Güncelle" />
        <Card.Content>
          <Form onSubmit={formik.handleSubmit}>
            <Grid stackable>
              <Grid.Row columns={2}>
                <Grid.Column>
                  <label>
                    <b>Okul Adı</b>
                  </label>
                  <Form.Input
                    fluid
                    placeholder="Okul Adı"
                    type="text"
                    name="schoolName"
                    value={formik.values.schoolName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.schoolName && formik.touched.schoolName && (
                    <div className={"ui pointing red basic label"}>
                      {formik.errors.schoolName}
                    </div>
                  )}
                </Grid.Column>
                <Grid.Column width={8}>
                  <label>
                    <b>Bölüm Adı</b>
                  </label>
                  <Form.Input
                    fluid
                    placeholder="Bölüm Adı"
                    type="text"
                    name="department"
                    value={formik.values.department}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.department && formik.touched.department && (
                    <div className={"ui pointing red basic label"}>
                      {formik.errors.department}
                    </div>
                  )}
                </Grid.Column>
              </Grid.Row>
              <label>
                <b>Eğitim Düzeyi</b>
              </label>
              <Form.Field>
                <Dropdown
                  clearable
                  item
                  name="eduGraduate"
                  placeholder="Eğitim düzeyi"
                  onChange={(_, data) =>
                    handleChangeSemantic(data.value, "eduGraduate")
                  }
                  value={formik.values.eduGraduate}
                  selection
                  options={eduGraduateOption}
                />
                {formik.errors.eduGraduate ? (
                  <div className={"ui pointing red basic label"}>{formik.errors.eduGraduate}</div>
                ) : null}
              </Form.Field>
              <Grid.Row columns={2}>
                <Grid.Column>
                  <label>
                    <b>Başlangıç Tarihi</b>
                  </label>
                  <div>
                    <DatePicker
                      name="startedDate"
                      dateFormat="yyyy-MM-dd"
                      selected={formik.values.startedDate}
                      value={formik.values.startedDate}
                      onChange={(val) =>
                        formik.setFieldValue("startedDate", val)
                      }
                    />
                    {formik.errors.startedDate &&
                      formik.touched.startedDate && (
                        <div className={"ui pointing red basic label"}>
                          {formik.errors.startedDate}
                        </div>
                      )}
                  </div>
                </Grid.Column>
                <Grid.Column>
                  <label>
                    <b>Mezuniyet Tarihi</b>
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
              </Grid.Row>
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
