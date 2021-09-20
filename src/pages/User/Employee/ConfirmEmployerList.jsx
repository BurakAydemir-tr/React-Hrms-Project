import React, { useState, useEffect } from "react";
import { Button, Checkbox, Table } from "semantic-ui-react";
import EmployerService from "../../../services/employerService";
import { toast } from "react-toastify";

export default function ConfirmEmployerList() {
  let employeeId=12
  const [employers, setEmployers] = useState([]);
  const [employerUpdates, setEmployerUpdates] = useState([]);

  useEffect(() => {
    let employerService = new EmployerService();
    employerService
      .getEmployersConfirm()
      .then((result) => setEmployers(result.data.data));
  }, []);


  const handleChangeVerified=(event,{value})=>{
    employerUpdates.push(value);
  }

  const handleSave=()=>{
    let employerService = new EmployerService();
    for (let i = 0; i < employerUpdates.length; i++) {
      employerService.updateVerifiedByTrue(employerUpdates[i],employeeId).then((result)=>{
        toast.success(result.data.message)
      });
    }
  }

  return (
    <div>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Şirket Adı</Table.HeaderCell>
            <Table.HeaderCell>Web sitesi</Table.HeaderCell>
            <Table.HeaderCell>E-mail</Table.HeaderCell>
            <Table.HeaderCell>Telefon</Table.HeaderCell>
            <Table.HeaderCell>Onay</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {employers.length===0? (<Table.Row><Table.Cell>Onaylanacak işveren bulunmamaktadır.</Table.Cell></Table.Row>)
          : employers.map((employer) => (
            <Table.Row key={employer.id}>
              <Table.Cell>{employer.companyName}</Table.Cell>
              <Table.Cell>{employer.webAdress}</Table.Cell>
              <Table.Cell>{employer.email}</Table.Cell>
              <Table.Cell>{employer.phoneNumber}</Table.Cell>
              <Table.Cell collapsing>
                <Checkbox
                toggle 
                key={employer.id}
                value={employer.id}
                onChange={handleChangeVerified}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell colSpan='5'>
              <Button floated="right" onClick={()=>handleSave()} disabled={employers.length===0?true:false}>Kaydet</Button>
            </Table.HeaderCell>
          </Table.Row>
          
        </Table.Footer>
      </Table>
    </div>
  );
}
