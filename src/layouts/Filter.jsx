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

  const citiesOption = cities.map((city, index) => ({
    key: index,
    text: city.name,
    value: city.id,
  }));

  const jobPositionOption=jobPositions.map((jobPosition, index)=>({
      key:index,
      text:jobPosition.position,
      value:jobPosition.id
  }))

  const [cityIndex, setCityIndex] = useState([]);
  const handleChangeCity = ({value}) => {
    console.log(value)
    setCityIndex(value);
    //console.log(cityIndex)
  }

  const [jobPositionIndex, setJobPositionIndex] = useState([])
  const handleChangeJobPosition=({value})=>{
    setJobPositionIndex([...jobPositionIndex,value])
  }

  const [typeWorkIndex, setTypeWorkIndex] = useState([])
  const handleChangeTypeWork=({value,checked})=>{
    if(checked){
      typeWorkIndex.push(value)
    }else{
      let index=typeWorkIndex.indexOf(value);
      if(index>-1){
        typeWorkIndex.splice(index,1)
      }
    }
  }

  const [howWorkIndex, setHowWorkIndex] = useState([])
  const handleChangeHowWork=({value,checked})=>{
    if(checked){
      howWorkIndex.push(value)
    }else{
      let index=howWorkIndex.indexOf(value);
      if(index>-1){
        howWorkIndex.splice(index,1)
      }
    }
  }

  const [indexies, setIndexies] = useState({})

  function handleFilterClick(props) {
    console.log(props)
    if(props.cityIndex.length===0){
      props.cityIndex=null;
    }
    if (props.jobPositionIndex.length===0) {
      props.jobPositionIndex=null;
    }
    if(props.typeWorkIndex.length===0){
      props.typeWorkIndex=null;
    }
    if(props.howWorkIndex.length===0){
      props.howWorkIndex=null;
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
              <Segment as="h3">Şehir</Segment>
              <Segment>
                <Dropdown
                  placeholder="Şehir seçiniz"
                  search
                  selection
                  clearable
                  multiple={true}
                  options={citiesOption}
                  onChange={handleChangeCity}
                  value={cityIndex || []}
                />
              </Segment>
            </SegmentGroup>
            <SegmentGroup>
              <Segment as="h3">İş Pozisyonu</Segment>
              <Segment>
              <Dropdown
                  placeholder="İş Pozisyonu seçiniz"
                  search
                  selection
                  clearable
                  multiple
                  options={jobPositionOption}
                  onChange={handleChangeJobPosition}
                  value={jobPositionIndex}
                /> 
              </Segment>
            </SegmentGroup>
            <SegmentGroup>
              <Segment as="h3">Çalışma Şekli</Segment>
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
              <Segment as="h3">Çalışma Türü</Segment>
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
            <Button fluid onClick={()=>handleFilterClick({cityIndex,jobPositionIndex,typeWorkIndex,howWorkIndex})}>Filtrele</Button>
          </Grid.Column>
          <Grid.Column width={12}>
              <JobAdvertList indexies={indexies}/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
