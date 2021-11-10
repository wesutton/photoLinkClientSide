import React, { Component } from 'react'
import { Input } from 'antd';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { CommentOutlined, } from '@ant-design/icons';
import searchFilter from './searchFilter'
import 'antd/dist/antd.css';
import './index.scss'
const { Search } = Input;

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            searchTerm: ''
        };
        this.fetchAllPosts = this.fetchAllPosts.bind(this);
    }

   

    fetchAllPosts() {
        fetch('http://localhost:3000/mypage/', {
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
        this.fetchAllPosts();
    }

    // componentDidUpdate(prevProps, prevState) {
    //     if (prevState.searchTerm !== this.state.searchTerm) {
    //         this.setState({ posts: this.state.posts?.filter((image) => image.name.includes(this.state.searchTerm) || image.user.username.includes(this.state.searchTerm)) })
    //     } 
    // }

    componentWillUnmount() {

    }


    searchFunction = (event) => {
             this.setState({ searchTerm: event.target.value })
    }


    render() {
        const filteredPosts2 = this.state.posts.filter((image) => {
            image.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
        })

        let filteredPosts = this.state.posts?.filter(
            (image) => {
                return <div ><Card sx={{ maxWidth: 345 }} key={image.id} >
                    <CardActionArea>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {image.name}
                            </Typography>
                        </CardContent>
                        <CardMedia
                            component="img"
                            height="200"
                            width= "300"
                            image={image.avatar}
                            alt="image"
                        />
                    </CardActionArea>
                    <CommentOutlined />
                </Card>
                <br/>
                </div>
            }
        )

        return (
            <div>
                {/* <Input placeholder="search by title or username"  value={this.state.searchTerm} allowClear onChange={this.searchFunction.bind(this)} style ={ {width: '320px'}}/> */}
                 <Input placeholder="search by title or username"  allowClear onChange={(event) => this.searchFunction(event)} style ={ {width: '320px'}}/>
                <br/>
                <br/>
                <searchFilter filter={filteredPosts2}/>

                {/* <div className = "image-card">
                    {this.state.posts?.map((image) => (
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
                    ))}</div> */}



            </div>
        )
    }
}
