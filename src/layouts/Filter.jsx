import React, { useState, useEffect } from "react";
import {
  Button,
  Checkbox,
  Dropdown,
  Grid,
  Segment,
  SegmentGroup,
} from "semantic-ui-react";
import JobAdvertList from "../pages/JobAdvert/JobAdvertList";
import CityService from "../services/cityService";
import HowWorkService from "../services/howWorkService";
import JobPositionService from "../services/jobPositionService";
import TypeWorkService from "../services/typeWorkService";

export default function Filter() {
  const [jobPositions, setJobPositions] = useState([]);
  const [cities, setCities] = useState([]);
  const [typeWorks, setTypeWorks] = useState([]);
  const [howWorks, setHowWorks] = useState([]);

  let jobPositionService = new JobPositionService();
  let cityService = new CityService();
  let typeWorkService = new TypeWorkService();
  let howWorkService = new HowWorkService();

  useEffect(() => {
    jobPositionService
      .getJobPositions()
      .then((result) => setJobPositions(result.data.data));
    cityService.getCities().then((result) => setCities(result.data.data));
    typeWorkService
      .getTypeWorks()
      .then((result) => setTypeWorks(result.data.data));
    howWorkService
      .getHowWorks()
      .then((result) => setHowWorks(result.data.data));
  }, []);

  const citiesOption = cities.map((city, index) =>({
    key: index,
    text: city.name,
    value: city.id,
  }));

  const jobPositionOption=jobPositions.map((jobPosition, index)=>({
      key:index,
      text:jobPosition.position,
      value:jobPosition.id
  }))

  const [cityId, setCityId] = useState([]);
  const handleChangeCity = (event,{value}) => {
    //console.log(value)
    setCityId(value);
  }

  const [jobPositionId, setJobPositionId] = useState([])
  const handleChangeJobPosition=(event,{value})=>{
    //console.log(value)
    setJobPositionId(value)
  }

  const [typeWorkId, setTypeWorkId] = useState([])
  const handleChangeTypeWork=(event,{value,checked})=>{
    //console.log(value)
    if(checked){
      typeWorkId.push(value)
    }else{
      let index=typeWorkId.indexOf(value);
      if(index>-1){
        typeWorkId.splice(index,1)
      }
    }
    //console.log(typeWorkId)
  }

  const [howWorkId, setHowWorkId] = useState([])
  const handleChangeHowWork=(event,{value,checked})=>{
    if(checked){
      howWorkId.push(value)
    }else{
      let index=howWorkId.indexOf(value);
      if(index>-1){
        howWorkId.splice(index,1)
      }
    }
  }

  const [indexies, setIndexies] = useState({})

  function handleFilterClick(props) {
    console.log(props)
    if(props.cityId.length===0){
      props.cityId=null;
    }
    if (props.jobPositionId.length===0) {
      props.jobPositionId=null;
    }
    if(props.typeWorkId.length===0){
      props.typeWorkId=null;
    }
    if(props.howWorkId.length===0){
      props.howWorkId=null;
    }
    console.log(props)
    setIndexies(props);
  }

  return (
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <SegmentGroup>
              <Segment as="h3">??ehir</Segment>
              <Segment>
                <Dropdown
                  placeholder="??ehir se??iniz"
                  search
                  selection
                  clearable
                  multiple
                  options={citiesOption}
                  onChange={handleChangeCity}
                  value={cityId}
                />
              </Segment>
            </SegmentGroup>
            <SegmentGroup>
              <Segment as="h3">???? Pozisyonu</Segment>
              <Segment>
              <Dropdown
                  placeholder="???? Pozisyonu se??iniz"
                  search
                  selection
                  clearable
                  multiple
                  options={jobPositionOption}
                  onChange={handleChangeJobPosition}
                  value={jobPositionId}
                /> 
              </Segment>
            </SegmentGroup>
            <SegmentGroup>
              <Segment as="h3">??al????ma ??ekli</Segment>
              {typeWorks.map((typeWork) => (
                <Segment textAlign="left" key={typeWork.id}>
                  <Checkbox
                    onChange={handleChangeTypeWork}
                    key={typeWork.id}
                    label={typeWork.typeName}
                    value={typeWork.id}
                  />
                </Segment>
              ))}
            </SegmentGroup>
            <SegmentGroup>
              <Segment as="h3">??al????ma T??r??</Segment>
              {howWorks.map((howWork) => (
                <Segment textAlign="left" key={howWork.id}>
                  <Checkbox
                    onChange={handleChangeHowWork}
                    key={howWork.id}
                    label={howWork.modeName}
                    value={howWork.id}
                  />
                </Segment>
              ))}
            </SegmentGroup>
            <Button fluid onClick={()=>handleFilterClick({cityId,jobPositionId,typeWorkId,howWorkId})}>Filtrele</Button>
          </Grid.Column>
          <Grid.Column width={12}>
              <JobAdvertList indexies={indexies}/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
