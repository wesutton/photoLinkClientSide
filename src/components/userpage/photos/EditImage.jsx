import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Component } from 'react'
import { Form, FormGroup } from 'reactstrap';
import { matchPath } from 'react-router';
import { EditOutlined } from '@ant-design/icons';

class EditImage extends Component {
    constructor(props, {match}) {
        super(props, {match});
        this.state = {
            data: {
                name: '',
                image: '',
                id: this.props.id
            },
        }
        console.log(match)
    }

    componentDidMount() {
        let id = this.props.id
        fetch(`http://localhost:3000/mypage/${this.state.id}`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }).then((res) => res.json())
            .then((data) => {
                this.setState({ data: data })
                console.log(data)
                
            }).catch((error) => {
                console.log(error)
            })
    }

    handleChange = (name) => e => {
        const value = name === 'image' ? e.target.files[0] : e.target.value
        this.setState({ ...this.data, [name]: value })
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let formData = new FormData()
            formData.append('image', this.data.image)
            formData.append('name', this.data.name)
            const res = await fetch(`http://localhost:3000/mypage/edit/${this.image.id}`, {
                method: "PUT",
                body: formData,
                headers: new Headers({
                    'Authorization': this.props.token
                })
            });
            if (res.ok) {
                this.setState({name: '', image: ''})
            }
        } catch (error) {
            console.log(error)
        }
    }


    render() {
        return (

            // <div style = {{maxWidth: 500, margin: "auto"}}>
            //     <div className = "mb-3">
            //         <input className="form-control" type = "text" name="file"/>
            //     </div>
            //     <div className = "mb-3">
            //         <input className="form-control"
            //         type="file"
            //         accept="image/*"
            //         name="image"/>
            //     </div>
            //     <div className = "text-center">
            //         <button className ="btn btn-primary">Update</button>
            //     </div>
            // </div>

            <div>
                
                                <Form>
                                    <FormGroup>
                                        <label htmlFor="name" />
                                        <input className="form-control" name="name" type="text" placeholder="title" value={this.state.data.name}  onChange={this.handleChange('name')}  />
                                    </FormGroup>
                                    <FormGroup>
                                        <label htmlFor="image" />
                                        <input className="form-control" name="image" type="file" accept="image/*"  onChange={this.handleChange('image')}/>
                                    </FormGroup>
                                    <div class="modal-footer">
                                        <Link to = "/MyPage">
                                        <button type="button" class="btn btn-secondary">Cancel</button>
                                        </Link>
                                        <button type="submit" class="btn btn-primary" onClick={this.handleSubmit} >Confirm</button>
                                    </div>
                                </Form>
                            </div>
                        

        )
    }
};

export default EditImage;