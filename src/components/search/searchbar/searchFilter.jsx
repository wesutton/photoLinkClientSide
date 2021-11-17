import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CommentsIndex from '../comments/CommentsIndex'
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
                         <div>  <Link to = {`/mypage/${image.id}`} id = {image.id} token={this.props.token}> <Card sx={{ maxWidth: 345 }} key={image.id} >
                            <CardActionArea>
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="div">
                                        {image.name}
                                    </Typography>
                                    <Typography gutterBottom variant="h10" component="div">
                                        <p>by: {image.user.username}</p>
                                    </Typography>
                                </CardContent>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={image.avatar}
                                    alt="image"
                                />
                            </CardActionArea> 
                        </Card>  </Link>
                        <br/>
                        </div>
                    ))}</div>

            </div>
        )
    }
}
