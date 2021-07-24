import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ResumeService from "../../services/resumeService";
import {
  Card,
  Image,
  Table,
  Header,
  Button,
  Icon,
  Modal,
  Grid,
} from "semantic-ui-react";
import DescriptionUpdate from "../popups/DescriptionUpdate";
import SchoolUpdate from "../popups/SchoolUpdate";
import LanguageUpdate from "../popups/LanguageUpdate";
import LinkedinUpdate from "../popups/LinkedinUpdate";
import GithubUpdate from "../popups/GithubUpdate";
import TechnologyUpdate from "../popups/TechnologyUpdate";
import JobExperienceUpdate from "../popups/JobExperienceUpdate";
import ImageUpdate from "../popups/ImageUpdate";

export default function Resume() {
  const [open, setOpen] = React.useState(false);
  const [newSchoolOpen, setNewSchoolOpen] = React.useState(false);
  const [languageOpen, setLanguageOpen] = React.useState(false);
  const [linkedin, setLinkedin] = useState(false);
  const [github, setGithub] = useState(false);
  const [technologyOpen, setTechnologyOpen] = useState(false);
  const [newJobExperienceOpen, setNewJobExperienceOpen] = useState(false);
  const [images, setImages] = useState(false);

  let { id } = useParams();

  const [resume, setResume] = useState({});

  let resumeService = new ResumeService();

  useEffect(() => {
    let resumeService = new ResumeService();
    resumeService
      .getByCandidateId(id)
      .then((result) => setResume(result.data.data));
  }, [id]);

  const updateResumeValues = () => {
    resumeService.getByCandidateId(id).then((result) => {
      setResume(result.data.data);
    });
  };

  return (
    <div>
      <Card.Group>
        <Card fluid>
          <Card.Content>
            <Image floated="left" size="small" src={resume.photo} circular />
            <Modal
              onClose={() => setImages(false)}
              onOpen={() => setImages(true)}
              open={images}
              trigger={
                <Button floated="right" size="small">
                  <Icon name="pencil" />
                </Button>
              }
            >
              <ImageUpdate resumeId={resume.id}/>
              <Modal.Actions>
                <Button onClick={() => setImages(false)}>İptal</Button>
              </Modal.Actions>
            </Modal>
            <Card.Header>
              {resume.candidate?.firstName + " " + resume.candidate?.lastName}
            </Card.Header>
            <Card.Meta>
              <strong>{resume.description}</strong>
            </Card.Meta>
            <Card.Description>
              <Table celled color={"black"}>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Kullanıcı</Table.HeaderCell>
                    <Table.HeaderCell>Bilgiler</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Header.Content>Ad</Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>{resume.candidate?.firstName}</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Header.Content>Soyad</Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>{resume.candidate?.lastName}</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Header.Content>Doğum Tarihi</Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>{resume.candidate?.birthDate}</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Header.Content>Email</Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>{resume.candidate?.email}</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Header.Content>
                          <a
                            href={resume.githubLink}
                            target={"_blank"}
                            rel="noopener noreferrer"
                          >
                            <Button secondary>
                              <Icon name="github" /> Github
                            </Button>
                            <Modal
                              onClose={() => setGithub(false)}
                              onOpen={() => setGithub(true)}
                              open={github}
                              trigger={
                                <Button floated="right" size="small">
                                  <Icon name="pencil" />
                                </Button>
                              }
                            >
                              <GithubUpdate resume={resume} />
                              <Modal.Actions>
                                <Button onClick={() => setGithub(false)}>
                                  İptal
                                </Button>
                              </Modal.Actions>
                            </Modal>
                          </a>
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>{resume.githubLink}</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Header.Content>
                          <a
                            href={resume.linkedLink}
                            target={"_blank"}
                            rel="noopener noreferrer"
                          >
                            <Button color="linkedin">
                              <Icon name="linkedin" /> LinkedIn
                            </Button>
                            <Modal
                              onClose={() => setLinkedin(false)}
                              onOpen={() => setLinkedin(true)}
                              open={linkedin}
                              trigger={
                                <Button floated="right" size="small">
                                  <Icon name="pencil" />
                                </Button>
                              }
                            >
                              <LinkedinUpdate resume={resume} />
                              <Modal.Actions>
                                <Button onClick={() => setLinkedin(false)}>
                                  İptal
                                </Button>
                              </Modal.Actions>
                            </Modal>
                          </a>
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>{resume.linkedLink}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Card.Description>
          </Card.Content>
          <Card.Content extra></Card.Content>
        </Card>
      </Card.Group>
      <Card fluid>
        <Card.Content>
          <h3>Biyografi</h3>
          <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button floated="right">Güncelle</Button>}
          >
            <DescriptionUpdate resume={resume} />
            <Modal.Actions>
              <Button onClick={() => setOpen(false)}>İptal</Button>
            </Modal.Actions>
          </Modal>
        </Card.Content>
        <Card.Content description={resume.description} />
      </Card>

      <Card fluid>
        <Grid>
          <Grid.Column width={12} style={{ marginTop: "1em" }}>
            <Card.Content>
              <h3>
                <b>Okuduğu Okullar</b>
              </h3>
            </Card.Content>
          </Grid.Column>
          <Grid.Column width={4} style={{ marginTop: "1em" }}>
            <Card.Content>
              <Modal
                onClose={() => setNewSchoolOpen(false)}
                onOpen={() => setNewSchoolOpen(true)}
                open={newSchoolOpen}
                trigger={
                  <Button floated="right" size="small">
                    <Icon name="pencil" />
                  </Button>
                }
              >
                <SchoolUpdate resumeId={resume.id} />
                <Modal.Actions>
                  <Button onClick={() => setNewSchoolOpen(false)}>İptal</Button>
                </Modal.Actions>
              </Modal>
            </Card.Content>
          </Grid.Column>
        </Grid>
        <Table celled color={"black"}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Okul Adı</Table.HeaderCell>
              <Table.HeaderCell>Bölüm</Table.HeaderCell>
              <Table.HeaderCell>Başlangıç Tarihi</Table.HeaderCell>
              <Table.HeaderCell>Mezuniyet Tarihi</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {resume.schools?.map((school) => (
              <Table.Row key={school.id}>
                <Table.Cell>{school.schoolName}</Table.Cell>
                <Table.Cell>{school.department}</Table.Cell>
                <Table.Cell>{school.startedDate}</Table.Cell>
                <Table.Cell>{school.endedDate}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>

      <Card fluid>
        <Grid>
          <Grid.Column width={12} style={{ marginTop: "1em" }}>
            <Card.Content>
              <h3>
                <b>Yabancı Diller</b>
              </h3>
            </Card.Content>
          </Grid.Column>
          <Grid.Column width={4} style={{ marginTop: "1em" }}>
            <Card.Content>
              <Modal
                onClose={() => setLanguageOpen(false)}
                onOpen={() => setLanguageOpen(true)}
                open={languageOpen}
                trigger={<Button floated="right">Güncelle</Button>}
              >
                <LanguageUpdate
                  resumeId={resume.id}
                  updateResumeValues={updateResumeValues}
                />
                <Modal.Actions>
                  <Button onClick={() => setLanguageOpen(false)}>İptal</Button>
                </Modal.Actions>
              </Modal>
            </Card.Content>
          </Grid.Column>
        </Grid>
        <Table celled color={"black"}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Dil Adı</Table.HeaderCell>
              <Table.HeaderCell>Seviye min:1 max:5</Table.HeaderCell>
              <Table.HeaderCell>İşlem</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {resume.languages?.map((language) => (
              <Table.Row key={language.id}>
                <Table.Cell>{language.languageName}</Table.Cell>
                <Table.Cell>{language.level}</Table.Cell>
                <Table.Cell></Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>

      <Card fluid>
        <Grid>
          <Grid.Column width={12} style={{ marginTop: "1em" }}>
            <Card.Content>
              <h3>
                <b>Teknolojiler</b>
              </h3>
            </Card.Content>
          </Grid.Column>
          <Grid.Column width={4} style={{ marginTop: "1em" }}>
            <Card.Content>
              <Modal
                onClose={() => setTechnologyOpen(false)}
                onOpen={() => setTechnologyOpen(true)}
                open={technologyOpen}
                trigger={<Button floated="right">Güncelle</Button>}
              >
                <TechnologyUpdate resumeId={resume.id} />
                <Modal.Actions>
                  <Button onClick={() => setTechnologyOpen(false)}>
                    İptal
                  </Button>
                </Modal.Actions>
              </Modal>
            </Card.Content>
          </Grid.Column>
        </Grid>
        <Table celled color={"black"}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Teknoloji Adı</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {resume.technologies?.map((technology) => (
              <Table.Row key={technology.id}>
                <Table.Cell>{technology.description}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>

      <Card fluid>
        <Grid>
          <Grid.Column width={12} style={{ marginTop: "1em" }}>
            <Card.Content>
              <h3>
                <b>İş Tecrübeleri</b>
              </h3>
            </Card.Content>
          </Grid.Column>
          <Grid.Column width={4} style={{ marginTop: "1em" }}>
            <Card.Content>
              <Modal
                onClose={() => setNewJobExperienceOpen(false)}
                onOpen={() => setNewJobExperienceOpen(true)}
                open={newJobExperienceOpen}
                trigger={
                  <Button floated="right" size="small">
                    <Icon name="pencil" />
                  </Button>
                }
              >
                <JobExperienceUpdate resumeId={resume.id} />
                <Modal.Actions>
                  <Button onClick={() => setNewJobExperienceOpen(false)}>
                    İptal
                  </Button>
                </Modal.Actions>
              </Modal>
            </Card.Content>
          </Grid.Column>
        </Grid>
        <Table celled color={"black"}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Şirket Adı</Table.HeaderCell>
              <Table.HeaderCell>Pozisyon</Table.HeaderCell>
              <Table.HeaderCell>Başlangıç Tarihi</Table.HeaderCell>
              <Table.HeaderCell>Bitiş Tarihi</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {resume.jobExperiences?.map((jobExperience) => (
              <Table.Row key={jobExperience.id}>
                <Table.Cell>{jobExperience.companyName}</Table.Cell>
                <Table.Cell>{jobExperience.jobPosition}</Table.Cell>
                <Table.Cell>{jobExperience.startedDate}</Table.Cell>
                <Table.Cell>{jobExperience.endedDate}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>
    </div>
  );
}
