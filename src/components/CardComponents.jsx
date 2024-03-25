import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import ImageCourse from "../assets/image-course.png";
import { CardActionArea } from "@mui/material";
import "../components/style.css";

export default function ActionAreaCard({ title, body, image }) {
  return (
    <Card sx={{ maxWidth: 350 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          width="350"
          height="233.33"
          src={image}
          alt="green iguana"
        />
        <CardContent sx={{ p: 2, height: 94 }}>
          <div className="line-1 text-left text-16 font-400 text-gray font-montserrat lh-19 h-20">
            {title}
          </div>
          <div className="line-3 text-left text-18 font-600 font-montserrat lh-21">
            {body}
          </div>
        </CardContent>
        <CardContent sx={{ px: 2, pb: 0, pt: 1, mb: 3 }}>
          <div className="flex flex-left text-green font-600 font-montserrat text-20 lh-24">
            IDR 400.000
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
