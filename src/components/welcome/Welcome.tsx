import React, { Component } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import image from "../../images/photolinkblack.png";
import { Image } from "antd";
import Logo from "../../images/Logo";
import { CardActionArea } from "@mui/material";
import "./Welcome.scss";
import { url } from "inspector";

export default class Welcome extends Component {
  render() {
    const styles = {
      media: {
        height: 0,
        paddingTop: "56.25%", // 16:9,
        marginTop: "30",
        backgroundImage: "url(" + image + ")",
      },
    };
    return (
      <div className="welcome-page">
        <div className="container">
          <div className="row">
            <div className="col" id="left-side">
              <h4 className="welcome-h4">
                Join a Community of everyday and professional photographers.
              </h4>
              <br/>
              <p className="">Upload your photos for others to see.</p>
              <p className="">
                Explore a vast library of photos uploaded by other photographers.
              </p>
              <p className="">Give others feedback by leaving a review. </p>
              <div></div>
            </div>
            <div className="col" id="right-side">
              <Card sx={{ maxWidth: 345 }} className="card">
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    color="text.secondary"
                  >
                    Your Photo Here
                  </Typography>

                  <CardMedia
                    style={styles.media}
                    component="img"
                    alt="photolink"
                    image={image}
                  />
                  <br />
                  <Typography variant="body2" color="text.secondary">
                    Sign up or login to begin using all of what PhotoLink has to
                    offer
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link to="/Auth">
                    <Button size="small" style={{ marginLeft: "110px" }}>
                      Get Started
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
