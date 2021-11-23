import React, { useState } from 'react';
import { Form, FormGroup } from 'reactstrap';
import APIURL from '../../../helpers/environments';
import {RiImageAddFill} from 'react-icons/ri'
import './UploadForm.scss'


const UploadForm = (props) => {
    const [data, setData] = useState({
        name: '',
        image: ''
    })

    const handleChange = (name) => e => {
        const value = name === 'image' ? e.target.files[0] : e.target.value
        setData({ ...data, [name]: value })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let formData = new FormData()
            formData.append('image', data.image)
            formData.append('name', data.name)

            const res = await fetch(`${APIURL}/mypage/post`, {
                method: "POST",
                body: formData,
                headers: new Headers({
                    'Authorization': props.token
                })
            });
            if (res.ok) {
                setData({name: '', image: ''})
                console.log('image uploaded')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <button className = 'upload-button' type="primary" style = {{height: '40px'}} class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <RiImageAddFill style = {{height: '27px', width: '40px'}}/>
            </button>


            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Add Photo</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <Form>
                                <FormGroup>
                                    <label htmlFor="name" />
                                    <input  className = "form-control" name="name" type="text" placeholder="title" value={data.name} onChange={handleChange('name')} required/>
                                </FormGroup>
                                <FormGroup>
                                    <label htmlFor="image" />
                                    <input className = "form-control" name="image" type="file" accept="image/*"  onChange={handleChange('image')} required />
                                </FormGroup>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                    <button type="submit" class="btn btn-primary" onClick={handleSubmit}>Upload</button>
                                </div>
                            </Form>
                        </div>


                    </div>
                </div>
            </div>
        </div>

    );
};

export default UploadForm;