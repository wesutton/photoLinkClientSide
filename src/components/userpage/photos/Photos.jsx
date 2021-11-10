import React, { Component } from 'react'
import UploadForm from './UploadForm'
import EditImage from './EditImage';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { CardActionArea } from '@mui/material';
import { EditOutlined, CommentOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import './Photos.scss'
import PhotoCard from './PhotoCard';
import { runInThisContext } from 'vm';


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
                
            }).catch((error) => {
                console.log(error)
            })
    }

    componentDidMount() {
        this.fetchMyPosts();
    }

    
    async deleteImage(id) {
        await fetch(`http://localhost:3000/mypage/delete/${id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }).then((res) => res.json())
            .then((updatedPosts) => {
                updatedPosts = this.state.posts.filter((image) => image._id !== id )
                this.setState({updatedPosts});
            })
    }


    render() {
        return (
            <div>
                <UploadForm token={this.props.token} />
                <hr />
                <br />
                <div className="image-card">{this.state.posts?.map((image, _id) => {
                    return <div key = {image._id}  > <Card sx={{ maxWidth: 345 }}key={_id} >
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
                      {/* <EditImage token={this.props.token} id={image.id} key = {image._id} /> */}
                      <Link to = {`/edit/${image.id}` } style = {{textDecoration: "none"}}  token={this.props.token} key={_id}><EditOutlined />  </Link>
                      <Button icon = {<DeleteOutlined/>} onClick={()=> this.deleteImage(image.id)}></Button>
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
