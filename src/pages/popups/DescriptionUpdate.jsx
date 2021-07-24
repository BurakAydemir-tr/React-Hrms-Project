import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field,ErrorMessage } from "formik";
import { Button, Card, FormField, Label } from "semantic-ui-react";
import ResumeService from "../../services/resumeService";
import { toast } from 'react-toastify';

export default function DescriptionUpdate({...props}) {
  console.log(props.resume.description)
  const initialValues = { description: props.resume.description };

  const schema = Yup.object({
    description: Yup.string().required("Zorunlu"),
  });

  let resumeService=new ResumeService()
  const handleSubmit=(values)=>{
    console.log(values)
    props.resume.description=values.description
    resumeService.update(props.resume).then((result)=>{
       toast.success(result.data.message)
     }).catch((result)=>{
       toast.error(result.response.data.message)
     })
  }

  return (
    <div>
      <Card fluid>
        <Card.Content header="Biyografi Güncelleme" />
        <Card.Content>
          <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
            <Form>
              <FormField>
                <label>Açıklama</label>
                <Field fluid="true" as="textarea" name="description" ></Field>
                <ErrorMessage
                  name="description"
                  render={(error) => (
                    <Label pointing="left" basic color="red" content={error}></Label>
                  )}
                ></ErrorMessage>
              </FormField>

              <Button color="green" type="submit" floated="right">
                Güncelle
              </Button>
            </Form>
          </Formik>
        </Card.Content>
      </Card>
    </div>
  );
}
