import React, { Component } from 'react'
import { Input } from 'antd';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { CommentOutlined, } from '@ant-design/icons';
import SearchFilter from './SearchFilter'
import 'antd/dist/antd.css';
import './SearchIndex.scss'
const { Search } = Input;

export default class Index extends Component {
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

    searchFunction = (event) => {
             this.setState({ searchTerm: event.target.value })
    }


    render() {
        const filteredPosts2 = this.state.posts.filter((image) => 
            image.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()) || image.user.username.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
      
        return (
            <div>
                {/* <Input placeholder="search by title or username"  value={this.state.searchTerm} allowClear onChange={this.searchFunction.bind(this)} style ={ {width: '320px'}}/> */}
                 <Input placeholder="search by title or username"  allowClear onChange={(event) => this.searchFunction(event)} style ={ {width: '320px'}}/>
                <br/>
                <br/>
                <SearchFilter filter={filteredPosts2} token = {this.props.token}/>
            </div>
        )
    }
}
