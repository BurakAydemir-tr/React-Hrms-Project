import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import {
  Button,
  Dropdown,
  Input,
  TextArea,
  Card,
  Form,
  Grid,
  GridColumn,
} from "semantic-ui-react";
import * as Yup from "yup";
import JobPositionService from "../../services/jobPositionService";
import CityService from "../../services/cityService";
import TypeWorkService from "../../services/typeWorkService";
import HowWorkService from "../../services/howWorkService";
import JobAdvertService from "../../services/jobAdvertService";

export default function JobAdvertisementAdd() {

  let jobAdvertService=new JobAdvertService()
  const JobAdvertAddSchema = Yup.object({
    deadlineDate: Yup.date().nullable().required("Bu alanın doldurulması zorunludur."),
    jobDescription: Yup.string().required("Bu alanın doldurulması zorunludur."),
    typeWorkId: Yup.string().required("Bu alanın doldurulması zorunludur."),
    howWorkId: Yup.string().required("Bu alanın doldurulması zorunludur."),
    positionNumber: Yup.string().required("Bu alanın doldurulması zorunludur.").min(1, "Pozisyon sayısı birden küçük olamaz."),
    cityId: Yup.string().required("Bu alanın doldurulması zorunludur."),
    salaryMin: Yup.number().min(0, "Sıfırdan az olamaz"),
    salaryMax: Yup.number().min(0, "Sıfırdan az olamaz"),
  });

  const {handleSubmit,handleChange,handleBlur,values,errors,setFieldValue,} = useFormik({
    initialValues: {
      jobDescription: "",
      jobPositionId: "",
      typeWorkId: "",
      howWorkId: "",
      positionNumber: "",
      cityId: "",
      salaryMin: "",
      salaryMax: "",
      deadlineDate: "",
    },
    validationSchema: JobAdvertAddSchema,
    onSubmit: (values) => {
      values.employerId = 7;
      jobAdvertService.add(values).then((result)=>console.log(result.data.data))
      alert("İş ilanı eklendi personelin onayı ardından listelenecektir");
      console.log(values);
    },
  });

  const [jobPositions, setJobPositions] = useState([]);
  const [cities, setCities] = useState([]);
  const [typeWorks, setTypeWorks] = useState([]);
  const [howWorks, setHowWorks] = useState([]);

  useEffect(() => {
    let jobPositionService = new JobPositionService();
    let cityService = new CityService();
    let typeWorkService = new TypeWorkService();
    let howWorkService = new HowWorkService();

    jobPositionService.getJobPositions().then((result) => setJobPositions(result.data.data));
    cityService.getCities().then((result) => setCities(result.data.data));
    typeWorkService.getTypeWorks().then((result) => setTypeWorks(result.data.data));
    howWorkService.getHowWorks().then((result) => setHowWorks(result.data.data));
  }, []);

  const jobPositionOption = jobPositions.map((jobPosition, index) => ({
    key: index,
    text: jobPosition.position,
    value: jobPosition.id,
  }));

  const cityOption = cities.map((city, index) => ({
    key: index,
    text: city.name,
    value: city.id,
  }));

  const typeWorkOption = typeWorks.map((typeWork, index) => ({
    key: index,
    text: typeWork.typeName,
    value: typeWork.id,
  }));

  const howWorkOption = howWorks.map((howWork, index) => ({
    key: index,
    text: howWork.modeName,
    value: howWork.id,
  }));

  const handleChangeSemantic = (value, fieldName) => {
    setFieldValue(fieldName, value);
    //console.log(value, fieldName);
  };

  return (
    <div>
      <Card fluid>
        <Card.Content header="İş ilanı Ekle" />
      </Card>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <Dropdown
            clearable
            item
            name="jobPositionId"
            placeholder="İş pozisyonu"
            onChange={(_, data) =>
              handleChangeSemantic(data.value, "jobPositionId")
            }
            value={values.jobPositionId}
            selection
            options={jobPositionOption}
          />
          {errors.jobPositionId ? errors.jobPositionId: null}
        </Form.Field>
        <Form.Field>
          <Dropdown
            name="cityId"
            placeholder="Şehir"
            value={values.cityId}
            onChange={(_, data) => handleChangeSemantic(data.value, "cityId")}
            selection
            options={cityOption}
          ></Dropdown>
          {errors.cityId ? errors.cityId: null}
        </Form.Field>
        <Form.Field>
          <Dropdown
            name="typeWorkId"
            placeholder="Çalışma şekli"
            search
            selection
            value={values.typeWorkId}
            onChange={(_, data) =>
              handleChangeSemantic(data.value, "typeWorkId")
            }
            options={typeWorkOption}
          ></Dropdown>
          {errors.typeWorkId ? errors.typeWorkId : null}
        </Form.Field>
        <Form.Field>
          <Dropdown
            name="howWorkId"
            placeholder="Çalışma süresi"
            search
            selection
            value={values.howWorkId}
            onChange={(_, data) =>
              handleChangeSemantic(data.value, "howWorkId")
            }
            options={howWorkOption}
          ></Dropdown>
          {errors.howWorkId ? errors.howWorkId : null}
        </Form.Field>
        <Form.Field>
          <Grid>
            <GridColumn width={8}>
              <Input
                placeholder="Minimum maaşı giriniz"
                name="salaryMin"
                type="number"
                value={values.salaryMin}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.salaryMin ? errors.salaryMin : null}
            </GridColumn>
            <GridColumn width={8}>
              <Input
                placeholder="Maximum maaşı giriniz"
                name="salaryMax"
                type="number"
                value={values.salaryMax}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.salaryMax ? errors.salaryMax : null}
            </GridColumn>
          </Grid>
        </Form.Field>
        <Grid>
          <GridColumn width={8}>
            <Input
              style={{ width: "100%" }}
              placeholder="Açık pozisyon adedi"
              name="positionNumber"
              type="number"
              value={values.positionNumber}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.positionNumber ? errors.positionNumber : null}
          </GridColumn>
          <GridColumn width={8}>
            <Input
              style={{ width: "100%" }}
              placeholder="Son başvuru tarihi"
              name="deadlineDate"
              type="date"
              value={values.deadlineDate}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.deadlineDate ? errors.deadlineDate : null}
          </GridColumn>
        </Grid>
        <Form.Field>
          <TextArea
            placeholder="Açıklama"
            style={{ minHeight: 100 }}
            value={values.jobDescription}
            name="jobDescription"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.jobDescription ? errors.jobDescription : null}
        </Form.Field>
        <Form.Field>
          <Button
            content="Ekle"
            labelPosition="right"
            icon="add"
            positive
            type="submit"
            style={{ marginLeft: "20px" }}
          />
        </Form.Field>
      </Form>
    </div>
  );
}
