import React, { Component } from 'react'
import UploadForm from './UploadForm'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import './Photos.scss'
import PhotoCard from './PhotoCard';


export default class Photos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: null
        };
        this.fetchMyPosts = this.fetchMyPosts.bind(this);
    }

    PostHandler() {
        this.fetchMyPosts();
    }

    async fetchMyPosts() {
        await fetch('http://localhost:3000/mypage/myposts', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }).then((res) => res.json())
            .then((posts) => {
                this.setState({ posts: posts })
                console.log(posts)
            })
    }

    componentDidMount() {
        this.fetchMyPosts();
    }



    render() {
        return (
            <div>
                <UploadForm token={this.props.token} />
                <hr />
                <br />
                <div className="image-card">{this.state.posts?.map((image, _index) => {
                    return <div > <Card sx={{ maxWidth: 345 }} key={_index}>
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
                    </Card>
                        <br />
                    </div>
                })
                }
                </div>



            </div>
        )
    }
}
