import React from "react";
import { Menu } from "semantic-ui-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function CandidateSection({match}) {

    const [activeItem, setActiveItem] = useState("home")

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
          name="favorilerim"
          active={activeItem === "favorilerim"}
          onClick={handleItemClick}
          as={NavLink} to={`${match.url}/favorite`}
        />
        <Menu.Item
          name="ayarlar"
          active={activeItem === "ayarlar"}
          onClick={handleItemClick}
        />
      </Menu>
    </div>
  );
}
