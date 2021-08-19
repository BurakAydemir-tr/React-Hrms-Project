import React from "react";
import { Button, Card } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { removeFromFavorite } from "../../store/actions/favoriteAction";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

export default function CandidateFavorite() {

    const {favoriteItems} = useSelector(state => state.favorite);

    const dispatch = useDispatch();

    const handleRemoveFromFavorite=(favoriteItem)=>{
        dispatch(removeFromFavorite(favoriteItem))
        toast.warning("İlan favorilerden kaldırıldı.")
    }

  return (
    <div>
      <Card.Group>
        {favoriteItems.map((favoriteItem) => (
          <Card fluid key={favoriteItem.id}>
            <Card.Content>
              <Card.Header textAlign="left">
                {favoriteItem.employer.companyName}
              </Card.Header>
              <Card.Meta textAlign="left">
                {favoriteItem.employer.webAdress}
              </Card.Meta>
              <Card.Description textAlign="right">
                {favoriteItem.city.name}
              </Card.Description>
              <Card.Description>
                {favoriteItem.jobPosition.position}
              </Card.Description>
              <Card.Description textAlign="left">
                {favoriteItem.typeWork.typeName}
              </Card.Description>
              <Card.Description textAlign="right">
                {favoriteItem.howWork.modeName}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className="ui two buttons">
                <Button basic color="green">
                  Detaylar
                </Button>
                <Button
                  basic
                  color="red"
                  onClick={()=>handleRemoveFromFavorite(favoriteItem)}
                >
                  Favorilerden çıkar
                </Button>
              </div>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </div>
  );
}
