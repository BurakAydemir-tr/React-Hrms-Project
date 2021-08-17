import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Image } from 'semantic-ui-react'
import EmployerService from "../../services/employerService";

export default function EmployerList() {
  const [employers, setemployers] = useState([]);

  useEffect(() => {
    let employerService = new EmployerService();
    employerService
      .getEmployers()
      .then((result) => setemployers(result.data.data));
  },[]);

  return (
    <div>
      <Card.Group>
        {employers.map((employer)=>(
          <Card fluid key={employer.id}>
          <Card.Content>
            <Image
              floated="right"
              size="mini"
              src="/images/avatar/large/steve.jpg"
            />
            <Card.Header>{employer.companyName}</Card.Header>
            <Card.Meta>{employer.webAdress}</Card.Meta>
            <Card.Description>
                <p><b>Eposta: </b>{employer.email}</p>
                <p><b>Telefon: </b>{employer.phoneNumber}</p>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className="ui two buttons">
              <Button basic color="green" as={Link} to={`/home/employers/${employer.id}`}>
                Detaylar
              </Button>
              <Button basic color="red">
                Web sitesi
              </Button>
            </div>
          </Card.Content>
        </Card>
        ))}
        
        
      </Card.Group>
    </div>
  );
}
