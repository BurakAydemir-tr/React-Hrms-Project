import React from "react";
import { Link } from "react-router-dom";
import { Button, Dropdown, Menu, Container } from "semantic-ui-react";

export default function Navi() {
  return (
    <div>
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item name="Ana Sayfa" />
          <Menu.Item name="İş ilanları" />

          <Menu.Menu position="right">
            <Dropdown item text="İş ilanları">
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to={"/jobAdvertisementAdd"}>İş ilanı ekle</Dropdown.Item>  
              </Dropdown.Menu>
            </Dropdown>

            <Menu.Item>
              <Button.Group>
                <Button primary>Sign Up</Button>
                <Button.Or />
                <Button positive>Log In</Button>
              </Button.Group>
            </Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>
    </div>
  );
}
