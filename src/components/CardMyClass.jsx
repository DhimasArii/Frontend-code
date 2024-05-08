import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import ImageCourse from "../assets/image-course.png";
import { CardActionArea, Hidden } from "@mui/material";
import "../components/style.css";

export default function ActionAreaCard({ image, category, title, schedule }) {
  return (
    <Card
      sx={{
        width: 1137,
        height: 157.33,
      }}
    >
      <CardActionArea
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          gap: 4,
          "@media (max-width: 450px)": {
            gap: 0,
            justifyContent: "center",
          },
        }}
        className="P_flex_warp_myclass"
      >
        <CardMedia
          sx={{ width: 200, border: "1px solid #BDBDBD" }}
          component="img"
          height="133.33"
          src={image}
          alt="green iguana"
          className="P_images_myclass"
        />
        <div className="flex flex-col gap-8 P_flex_warp_myclass">
          <CardContent
            sx={{
              gap: 0.5,
              padding: 0,
              display: "flex",
              flexDirection: "column",
              "@media (max-width: 450px)": {
                gap: 0,
                justifyContent: "center",
                alignItems: "center",
              },
            }}
          >
            <div className=" text-left text-16 font-400 text-gray font-poppins T_font_size P_font_size">
              {category}
            </div>
            <div className=" text-left text-24 font-600 font-montserrat T_font_size1 P_font_size">
              {title}
            </div>
          </CardContent>
          <CardContent
            sx={{
              padding: 0,
              paddingBottom: 0,
              display: "flex",
              flexDirection: "column",
              "&:last-child": {
                paddingBottom: 0,
              },
              "@media (max-width: 450px)": {
                gap: 0,
                justifyContent: "center",
                alignItems: "center",
              },
            }}
          >
            <div className=" text-yellow font-500 font-montserrat text-20 T_font_size1 P_font_size">
              Schedule : {schedule}
            </div>
          </CardContent>
        </div>
      </CardActionArea>
    </Card>
  );
}
