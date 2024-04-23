import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import ImageCourse from "../assets/image-course.png";
import { CardActionArea } from "@mui/material";
import "../components/style.css";
import PropTypes from "prop-types";

export default function ActionAreaCard({ body, image }) {
  return (
    <Card sx={{ maxWidth: 232 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          width="200"
          height="133.33"
          image={image}
          alt="green iguana"
        />
        <CardContent sx={{ p: 2, height: 94 }}>
          <div className="line-3 text-center text-24 font-400 font-montserrat lh-21">
            {body}
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

ActionAreaCard.PropTypes = {
  body: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};
