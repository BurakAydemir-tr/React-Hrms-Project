import React, { useState, useEffect } from "react";
import { Card, Table, Button, Form, Grid } from "semantic-ui-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import TechnologyService from "../../services/technologyService";

export default function TechnologyUpdate({ resumeId }) {
  let technologyService = new TechnologyService();

  const [technologies, setTechnology] = useState([]);

  useEffect(() => {
    technologyService.getByResumeId(resumeId).then((result) => {
      setTechnology(result.data.data);
    });
  }, [technologies]);

  const technologySchema = Yup.object({
    description: Yup.string()
      .required("Zorunludur")
      .min(2, "Minimum iki karakter uzunluğunda olmalıdır."),
  });

  const formik = useFormik({
    initialValues: {
      description: "",
    },
    validationSchema: technologySchema,
    onSubmit: (values) => {
      values.resumeId=resumeId;
      technologyService.add(values).then((result)=>{
          alert(result.data.message);
          
      })
    },
  });

  const handleDeleteTechnology = (technology) => {
    technologyService.delete(technology).then((result)=>{
        alert(result.data.message)
        
    })
  };

  return (
    <div>
      <Grid stackable>
        <Grid.Column width={8}>
          <Card fluid color={"black"}>
            <Card.Content header={"Teknoloji Ekle"} />
            <Card.Content>
              <Form onSubmit={formik.handleSubmit}>
                <label>
                  <b>Teknoloji Adı</b>
                </label>
                <Form.Input
                  fluid
                  placeholder="Teknoloji Adı Adı"
                  type="text"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.description && formik.touched.description && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.description}
                  </div>
                )}
                <Button fluid color="green" type="submit">
                  Ekle
                </Button>
              </Form>
            </Card.Content>
          </Card>
        </Grid.Column>
        <Grid.Column width={8}>
          <Table celled color={"black"}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Teknoloji</Table.HeaderCell>
                <Table.HeaderCell>Sil</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {technologies?.map((technology) => (
                <Table.Row key={technology.id}>
                  <Table.Cell>{technology.description}</Table.Cell>
                  <Table.Cell>
                    <Button
                      color="red"
                      icon="x"
                      circular
                      onClick={() => handleDeleteTechnology(technology)}
                    ></Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Grid.Column>
      </Grid>
    </div>
  );
}
