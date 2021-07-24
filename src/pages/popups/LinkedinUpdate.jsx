import React from "react";
import { Card, Form, Button } from "semantic-ui-react";
import * as Yup from "yup";
import { useFormik} from "formik";
import ResumeService from "../../services/resumeService";

export default function LinkedinUpdate({ resume }) {

   let resumeService= new ResumeService() 

  const updateLinkedInSchema = Yup.object().shape({
    linkedLink: Yup.string().required("Zorunlu")
  });

  const formik = useFormik({
    initialValues: {
      linkedLink: resume.linkedLink,
    },
    validateYupSchema: updateLinkedInSchema,
    onSubmit: (values) => {
      resume.linkedLink = values.linkedLink;
      console.log(resume);
      resumeService.update(resume).then((result)=>{
          alert("LinkedIn linki güncellendi")
      })
    },
  });

  return (
    <div>
      <Card fluid>
          <Form size="large" onSubmit={formik.handleSubmit}>
            <label>
              <b>LinkedIn Link</b>
            </label>
            <Form.Input
              fluid
              placeholder="LinkedIn Link"
              type="text"
              name="linkedLink"
              value={formik.values.linkedLink}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {
                formik.errors.linkedLink && formik.touched.linkedLink && (
                    <div className={"ui pointing red basic label"}>
                        {formik.errors.linkedLink}
                    </div>
                )
            }
            <Button color="green" fluid size="large" type="submit">
              Güncelle
            </Button>
          </Form>
      </Card>
    </div>
  );
}
