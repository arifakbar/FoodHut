import React from "react";
import StarRatings from "react-star-ratings";

function Star(props) {
  return (
    <div>
      <StarRatings
        numberOfStars={props.stars}
        starHoverColor="red"
        starEmptyColor="red"
        starDimension="20px"
        starSpacing="2px"
        changeRating={() => props.starClick(props.stars)}
      />
    </div>
  );
}

export default Star;
