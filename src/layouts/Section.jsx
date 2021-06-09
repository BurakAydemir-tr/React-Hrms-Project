import React from "react";
import { Icon, Menu } from 'semantic-ui-react'

export default function Section() {
  return (
    <div>
      <Menu icon="labeled" vertical inverted>
        <Menu.Item
          name="bullhorn"
          
        >
          <Icon name="bullhorn" />
          İlanlar
        </Menu.Item>

        <Menu.Item
          name="video camera"
          
        >
          <Icon name="user" />
          İş Verenler
        </Menu.Item>

        <Menu.Item
          name="video play"
          
        >
          <Icon name="user" />
          İş Arayanalar
        </Menu.Item>
      </Menu>
    </div>
  );
}
