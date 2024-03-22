import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import ImageCourse from "../assets/image-course.png";
import { CardActionArea } from "@mui/material";
import "../components/style.css";

export default function ActionAreaCard({ body, image }) {
  return (
    <Card sx={{ maxWidth: 232, mr: 0 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          width="200"
          height="133.33"
          image={image}
          alt="green iguana"
        />
        <CardContent>
          <div className="line-3 text-center text-24 font-400 font-montserrat lh-29">
            {body}
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
