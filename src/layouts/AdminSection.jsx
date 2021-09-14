import React from "react";
import { Menu } from "semantic-ui-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function AdminSection() {
    const [activeItem, setActiveItem] = useState("profil")

    const handleItemClick=(e, { name })=>{
        setActiveItem(name)
    }
  return (
    <div>
      <Menu inverted pointing vertical>
        <Menu.Item
          name="profil"
          active={activeItem === "profil"}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="iş veren bilgileri"
          active={activeItem === "iş veren bilgileri"}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="iş ilanı bilgileri"
          active={activeItem === "iş ilanı bilgileri"}
          onClick={handleItemClick}
        />
      </Menu>
    </div>
  );
}
