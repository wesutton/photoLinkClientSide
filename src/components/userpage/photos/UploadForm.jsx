import React, { useState } from 'react';
import { Form, FormGroup } from 'reactstrap';

// const Input = styled('input')({
//     display: 'none',
// });

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

            const res = await fetch('http://localhost:3000/mypage/post', {
                method: "POST",
                body: formData,
                headers: new Headers({
                    'Authorization': props.token
                })
            });
            if (res.ok) {
                setData({name: '', image: ''})
            }
        } catch (error) {
            console.log(error)
        }
    }
    // const [title, setTitle] = useState('');
    // const [imageUrl, setImageUrl] = useState('');
    // const [error, setError] = useState(null);

    // const types = ['image/png', 'image/jpeg']

    // const changeHandler = (e) => {
    //     let selected = e.target.files[0];

    //     if (selected && types.includes(selected.type)) {
    //         setFile(selected);
    //         setError('')
    //     } else {
    //         setFile(null);
    //         setError('Image must be correct file type (png or jpeg)')

    //     }
    //     console.log(selected)
    // }

    // const handleSubmit = (e)=> {
    //     e.preventDefault();
    //     fetch('http://localhost:3000/mypage/post', {
    //         method: 'POST',
    //         body: JSON.stringify({image: {title: title, imageUrl: imageUrl}}),
    //         headers: new Headers({
    //             'Content-Type': 'application/json',
    //             'Authorization': props.token
    //         })
    //     }) .then((res) => res.json())
    //     .then((imageData) => {
    //         console.log(imageData);
    //         setTitle('');
    //         setImageUrl('');
    //         props.fetchMyPosts();
    //     })
    // }






    return (
        <div>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Upload
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
                                    <input className = "form-control" name="name" type="text" placeholder="title" value={data.name} onChange={handleChange('name')} />
                                </FormGroup>
                                <FormGroup>
                                    <label htmlFor="image" />
                                    <input className = "form-control" name="image" type="file" accept="image/*"  onChange={handleChange('image')} />
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