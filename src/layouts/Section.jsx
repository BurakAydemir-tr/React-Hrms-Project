import React from "react";
import { NavLink,useRouteMatch } from "react-router-dom";
import { Icon, Menu } from 'semantic-ui-react'

export default function Section({match}) {

  return (
    <div>
      <Menu icon="labeled" vertical inverted>
        <Menu.Item
          name="bullhorn"
          as={NavLink} to={`${match.url}/jobAdvertisements`}
        >
          <Icon name="bullhorn" />
          İlanlar
        </Menu.Item>

        <Menu.Item
          name="employer"
          as={NavLink} to={`${match.url}/employers`}
        >
          <Icon name="factory" />
          İş Verenler
        </Menu.Item>

        <Menu.Item
          name="candidate"
          as={NavLink} to={`${match.url}/candidates`}
        >
          <Icon name="user" />
          İş Arayanalar
        </Menu.Item>
      </Menu>
    </div>
  );
}
