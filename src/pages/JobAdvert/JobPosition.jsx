import React from "react";
import { useState, useEffect } from "react";
import { Icon, Label, Menu, Table, Header } from "semantic-ui-react";
import JobPositionService from "../../services/jobPositionService";

export default function JobPosition() {

    const [jobPositions, setJobPositions] = useState([]);

    useEffect(()=>{
        let jobPositionService=new JobPositionService();
        jobPositionService.getJobPositions().then((result)=>setJobPositions(result.data.data))
    })

  return (
    <div>
      <Header as="h2">
        <Icon name="list alternate outline" />
        <Header.Content>İş Pozisyonları Listesi</Header.Content>
      </Header>
      <Table color="blue" key="blue">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Job Title</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {jobPositions.map((jobPosition) => (
            <Table.Row key={jobPosition.id}>
              <Table.Cell>{jobPosition.position}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
