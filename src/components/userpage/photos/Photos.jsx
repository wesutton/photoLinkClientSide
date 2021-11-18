import React, { Component } from 'react'
import UploadForm from './UploadForm'
import MyPhotosRedirect from '../../UI/MyPhotosRedirect';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router'
import { CardActionArea } from '@mui/material';
import { EditOutlined, CommentOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Image } from 'antd';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

class Photos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: null,
            loading: true,
            token: this.props.token
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
                this.setState({ posts: posts, isLoaded: true })
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
                updatedPosts = this.state.posts.filter((image) => image._id !== id)
                this.setState({ updatedPosts });
                this.setState(this.fetchMyPosts());
            }).catch((error) => {
                console.log(error)
            })
    }


    render() {
        const username = this.state.posts?.filter((name, idx) => idx < 1).map(name => {
            return <p>{name.user.username}</p>
        });
        console.log(username)

        
        const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
            if(this.state.token === null){
                return <div className = "redirect-card"><MyPhotosRedirect/></div>
            } else if (!this.state.isLoaded) {
            return (
                <div>
                    <br/>
                    <UploadForm fetchMyPosts={this.fetchMyPosts} token={this.props.token} />
                    <br />
                    <div>
                    <Spin indicator={antIcon} style={{marginTop: '200px'}} />
                    </div>
                </div>
            )
        } else {
            
        return (
            <div>
                <br/>
                <h3>{username}</h3>
                <UploadForm fetchMyPosts={this.fetchMyPosts} token={this.props.token} />
                <br />
                <div className="image-card">{this.state.posts?.map((image, _id) => {
                    return <div key={image._id}  > <Card sx={{ maxWidth: 345 }} key={image.id} >
                        <CardActionArea>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {image.name}
                                </Typography>
                            </CardContent>

                            <Image
                                width={345}
                                src={image.avatar}
                            />

                        </CardActionArea>
                        <Link to={`/allreviews/${image.id}`} token={this.props.token} ><Button icon={<CommentOutlined/>}></Button></Link>
                        <Link to={`/mypage/edit/${image.id}`} token={this.props.token} key={_id} ><Button icon={<EditOutlined />}></Button></Link>
                        <Button icon={<DeleteOutlined />} onClick={() => this.deleteImage(image.id)}></Button>
                        
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
}
export default withRouter(Photos);