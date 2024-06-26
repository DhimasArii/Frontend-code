import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import ImageCourse from "../assets/image-course.png";
import { CardActionArea } from "@mui/material";
import "../components/style.css";
import propTypes from "prop-types";

export default function ActionAreaCard({
  title,
  body,
  schedule,
  image,
  price,
}) {
  return (
    <Card sx={{ width: 1017, gap: 24 }}>
      <CardActionArea
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
        className="P_flex_warp"
      >
        <CardMedia
          sx={{ width: 200 }}
          component="img"
          height="133.33"
          src={image}
          alt="green iguana"
        />
        <div className="flex flex-col">
          <CardContent sx={{}}>
            <div className=" text-left text-16 font-400 text-gray font-montserrat">
              {title}
            </div>
            <div className=" text-left text-18 font-600 font-montserrat">
              {body}
            </div>
            <div className=" text-left text-16 font-400 font-montserrat text-gray-light">
              {schedule}
            </div>
          </CardContent>
          <CardContent sx={{}}>
            <div className=" text-yellow font-600 font-montserrat text-20 ">
              IDR {price}
            </div>
          </CardContent>
        </div>
      </CardActionArea>
    </Card>
  );
}

ActionAreaCard.propTypes = {
  title: propTypes.string.isRequired,
  body: propTypes.string.isRequired,
  image: propTypes.string.isRequired,
  price: propTypes.number.isRequired,
};
