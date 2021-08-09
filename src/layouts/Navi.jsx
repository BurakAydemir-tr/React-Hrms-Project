import React,{useState} from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { Button, Dropdown, Menu, Container } from "semantic-ui-react";
import SignedIn from "./SignedIn";
import SignedOut from "./SignedOut";

export default function Navi() {

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const history=useHistory()

  function handleSignOut() {
    setIsAuthenticated(false)
    history.push("/")
  }

  function handleSignIn() {
    setIsAuthenticated(true)
  }

  return (
    <div>
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item name="Ana Sayfa" />
          <Menu.Item name="İş ilanları" as={NavLink} to="/jobAdvertisements"/>
          <Menu.Item name="İş Verenler" as={NavLink} to="/employers"/>
          <Menu.Item name="İş Arayanlar" as={NavLink} to="/candidates"/>

          <Menu.Menu position="right">
            <Dropdown item text="İş ilanları">
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to={"/jobAdvertisementAdd"}>İş ilanı ekle</Dropdown.Item>  
              </Dropdown.Menu>
            </Dropdown>
          
          <Menu.Menu position="right">
            {isAuthenticated?<SignedIn signOut={handleSignOut}/>:<SignedOut signIn={handleSignIn}/>}
          </Menu.Menu>
            
          </Menu.Menu>
        </Container>
      </Menu>
    </div>
  );
}
