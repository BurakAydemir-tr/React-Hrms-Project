import React from "react";
import { Menu } from "semantic-ui-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function EmployerSection({match}) {
    const [activeItem, setActiveItem] = useState("profil")

    const handleItemClick=(e, { name })=>{
        setActiveItem(name)
    }

    let id=10
  return (
    <div>
      <Menu inverted pointing vertical>
        <Menu.Item
          name="profil"
          active={activeItem === "profil"}
          onClick={handleItemClick}
          as={Link} to={`${match.url}/${id}`}
        />
        <Menu.Item
          name="İlanlar"
          active={activeItem === "İlanlar"}
          onClick={handleItemClick}
          as={Link} to={`${match.url}/${id}/jobAdvertisements`}
        />
        
      </Menu>
    </div>
  );
}
