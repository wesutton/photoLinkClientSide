import React, { Component } from 'react'
import { Input } from 'antd';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import SearchFilter from './SearchFilter'
import 'antd/dist/antd.css';
import './SearchIndex.scss'
const { Search } = Input;

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            loading: true,
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
                this.setState({ posts: posts, isLoaded: true })
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
        const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
        const filteredPosts2 = this.state.posts.filter((image) =>
            image.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()) || image.user.username.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
        if (!this.state.isLoaded) {
            return (
                <div>
                    <Input placeholder="search by title or username" allowClear onChange={(event) => this.searchFunction(event)} style={{ width: '320px' }} />
                    <div >
                    <Spin indicator={antIcon} style={{marginTop: '200px'}} />
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <Input placeholder="search by title or username" allowClear onChange={(event) => this.searchFunction(event)} style={{ width: '320px' }} />
                    <br />
                    <br />
                    <SearchFilter filter={filteredPosts2} token={this.props.token} />
                </div>
            )
        }
    }
}
