import React, { useState, useEffect } from "react";
import {
  Table,
  Header,
  Icon,
  Card,
  Form,
  Button,
} from "semantic-ui-react";
import { useParams } from "react-router-dom";
import EmployerService from "../../../services/employerService";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

export default function EmployerUpdate() {
  let { id } = useParams();

  const [employer, setEmployer] = useState({});
  let employerService = new EmployerService();

  useEffect(() => {
    employerService.getById(id).then((result) => setEmployer(result.data.data));
  }, [id]);

  const employerSchema = Yup.object({
    companyName: Yup.string().required("Zorunlu Alan"),
    webAdress: Yup.string().required("Zorunlu Alan"),
    email: Yup.string().required("Zorunlu Alan"),
    phoneNumber: Yup.string().required("Zorunlu Alan"),
  });

  const formik = useFormik({
    initialValues: {
      companyName: "",
      webAdress: "",
      email: "",
      phoneNumber: "",
    },
    validationSchema: employerSchema,
    onSubmit: (values) => {
      let employerUpdate={
        ...values,
        employerId:parseInt(id)
      }

      console.log(employerUpdate)
      employerService.update(employerUpdate).then((result)=>{
        toast.success(result.data.message)
      })
    },
  });

  return (
    <div>
      <Header as="h3">
        <Icon name="building" />
        <Header.Content>Şirket Bilgileri</Header.Content>
      </Header>
      <Card.Group>
        <Card fluid color="black">
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>İş veren</Table.HeaderCell>
                <Table.HeaderCell>Bilgiler</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <Header as="h4">
                    <Header.Content>
                      <Icon name="building" />
                      Şirket Adı
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>{employer.companyName}</Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>
                  <Header as="h4">
                    <Header.Content>
                      <Icon name="world" />
                      Web Sitesi
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>{employer.webAdress}</Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>
                  <Header as="h4">
                    <Header.Content>
                      <Icon name="mail" />
                      Email
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>{employer.email}</Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>
                  <Header as="h4">
                    <Header.Content>
                      <Icon name="phone" />
                      Telefon
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>{employer.phoneNumber}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Card>

        <Card fluid color="black">
          <Card.Content header="Bilgileri Güncelle" />
          <Card.Content textAlign="left">
            <Form onSubmit={formik.handleSubmit}>
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
              <div>
                <label>
                  <b>Web Sitesi</b>
                </label>
              </div>
              <Form.Input
                fluid
                placeholder="http://mysite.com"
                type="text"
                name="webAdress"
                value={formik.values.webAdress}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.webAdress && formik.touched.webAdress && (
                <div className={"ui pointing red basic label"}>
                  {formik.errors.webAdress}
                </div>
              )}

              <div>
                <label>
                  <b>E-mail</b>
                </label>
              </div>
              <Form.Input
                fluid
                placeholder="E-mail"
                type="text"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.email && formik.touched.email && (
                <div className={"ui pointing red basic label"}>
                  {formik.errors.email}
                </div>
              )}
              <div>
                <label>
                  <b>Telefon No:</b>
                </label>
              </div>
              <Form.Input
                fluid
                placeholder="Telefon No"
                type="text"
                name="phoneNumber"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.phoneNumber && formik.touched.phoneNumber && (
                <div className={"ui pointing red basic label"}>
                  {formik.errors.phoneNumber}
                </div>
              )}

              <Button fluid color="green" type="submit">
                Güncelle
              </Button>
            </Form>
          </Card.Content>
        </Card>
      </Card.Group>
    </div>
  );
}
