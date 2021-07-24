import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Card, Button, Form, Dropdown, Grid } from "semantic-ui-react";
import SchoolService from "../../services/schoolService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import EduGraduate from "../../services/eduGraduateService";

export default function SchoolAdd({ resumeId }) {
  let schoolService = new SchoolService();

  const schoolSchema = Yup.object({
    schoolName: Yup.string().required("Zorunlu alan"),
    department: Yup.string().required("Zorunlu alan"),
    eduGraduate: Yup.string().required("Zorunlu alan"),
    startedDate: Yup.date().required("Zorunlu alan").nullable(),
    endedDate: Yup.date().nullable(),
  });

  const formik = useFormik({
    initialValues: {
      schoolName: "",
      department: "",
      eduGraduate: "",
      startedDate: "",
      endedDate: "",
    },
    validationSchema: schoolSchema,
    onSubmit: (values) => {
      let newid = values.eduGraduate;
      let newSchool = {
        ...values,
        resume: { id: resumeId },
      };
      newSchool.eduGraduate = { id: newid };
      //console.log(newSchool);
      schoolService.add(newSchool).then((result) => {
        alert("Okul eklendi");
      });
    },
  });

  const [eduGraduates, setEduGraduates] = useState([]);

  useEffect(() => {
    let eduGraduateService = new EduGraduate();
    eduGraduateService
      .getEduGraduates()
      .then((result) => setEduGraduates(result.data.data));
  });

  const eduGraduateOption = eduGraduates.map((eduGraduate, index) => ({
    key: index,
    text: eduGraduate.graduateDegree,
    value: eduGraduate.id,
  }));

  const handleChangeSemantic = (value, fieldName) => {
    formik.setFieldValue(fieldName, value);
    //console.log(value, fieldName);
  };

  return (
    <div>
      <Card fluid color={"black"}>
        <Card.Content header="Okul Ekle" />
        <Card.Content>
          <Form onSubmit={formik.handleSubmit}>
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
              {formik.errors.eduGraduate ? formik.errors.eduGraduate : null}
            </Form.Field>

            <Grid>
              <Grid.Column width={8}>
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
            </Grid>

            <div style={{ marginTop: "1em" }}>
              <Button fluid color="green" type="submit">
                Ekle
              </Button>
            </div>
          </Form>
        </Card.Content>
      </Card>
    </div>
  );
}
