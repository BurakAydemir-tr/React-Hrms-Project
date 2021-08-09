import React, { useState, useEffect } from "react";
import { Button, Card,Pagination } from "semantic-ui-react";
import JobAdvertService from "../../services/jobAdvertService";

export default function JobAdvertList({ indexies }) {
  const [jobAdverts, setJobAdverts] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [pageSize] = useState(4);
  const [totalPageSize, setTotalPageSize] = useState(0);

  useEffect(() => {
    // let jobAdvertService = new JobAdvertService();
    // jobAdvertService
    //   .getFilterAndPage(activePage,pageSize,indexies)
    //   .then((result) => {
    //     setJobAdverts(result.data.data);
    //     setTotalPageSize(result.data.data.length)
    //   })
  }, [indexies,activePage,pageSize]);

  const handlePageChange=({activePage})=>{
    setActivePage(activePage)
  }

  return (
    <div>
      <Card.Group>
        {jobAdverts.map((jobAdvert) => (
          <Card fluid key={jobAdvert.id}>
            <Card.Content>
              <Card.Header textAlign="left">
                {jobAdvert.employer.companyName}
              </Card.Header>
              <Card.Meta textAlign="left">
                {jobAdvert.employer.webAdress}
              </Card.Meta>
              <Card.Description textAlign="right">
                {jobAdvert.city.name}
              </Card.Description>
              <Card.Description>
                {jobAdvert.jobPosition.position}
              </Card.Description>
              <Card.Description textAlign="left">
                {jobAdvert.typeWork.typeName}
              </Card.Description>
              <Card.Description textAlign="right">
                {jobAdvert.howWork.modeName}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className="ui two buttons">
                <Button basic color="green">
                  Detaylar
                </Button>
                <Button basic color="red">
                  Favorilere ekle
                </Button>
              </div>
            </Card.Content>
          </Card>
        ))}
        <Pagination
          firstItem={null}
          lastItem={null}
          activePage={activePage}
          onPageChange={handlePageChange}
          totalPages={Math.ceil(totalPageSize / pageSize)}
          pointing
          secondary
        />
      </Card.Group>
    </div>
  );
}
