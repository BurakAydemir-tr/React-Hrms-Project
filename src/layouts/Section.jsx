import React from "react";
import { NavLink } from "react-router-dom";
import { Icon, Menu } from 'semantic-ui-react'

export default function Section() {
  return (
    <div>
      <Menu icon="labeled" vertical inverted>
        <Menu.Item
          name="bullhorn"
          as={NavLink} to="/jobAdvertisements"
        >
          <Icon name="bullhorn" />
          İlanlar
        </Menu.Item>

        <Menu.Item
          name="employer"
          as={NavLink} to="/employers"
        >
          <Icon name="factory" />
          İş Verenler
        </Menu.Item>

        <Menu.Item
          name="candidate"
          as={NavLink} to="/candidates"
        >
          <Icon name="user" />
          İş Arayanalar
        </Menu.Item>
      </Menu>
    </div>
  );
}
