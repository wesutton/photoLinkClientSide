import React, { Component } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { CommentOutlined, } from '@ant-design/icons';

export default class searchFilter extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div>
                 <div className = "image-card">
                    {this.props.filter.map((image) => (
                         <div> <Card sx={{ maxWidth: 345 }} key={image.id} >
                            <CardActionArea>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {image.name}
                                    </Typography>
                                </CardContent>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={image.avatar}
                                    alt="image"
                                />
                            </CardActionArea>
                            <CommentOutlined />
                        </Card>
                        <br/>
                        </div>
                    ))}</div>

            </div>
        )
    }
}
