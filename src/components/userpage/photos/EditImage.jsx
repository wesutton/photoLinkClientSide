
import { Link } from 'react-router-dom';
import { Component } from 'react'
import { Form, FormGroup } from 'reactstrap';
import { withRouter } from 'react-router';

class EditImage extends Component {
    constructor(props) { 
        super(props);
        this.state = {
            data: {
                name: '',
                image: '',
            },
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const id = this.props.match.params.id
        fetch(`http://localhost:3000/mypage/${id}`, {
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

    handleChange = (name) => (e) => {
        const value = name === 'image' ? e.target.files[0] : e.target.value
        this.setState({ ...this.state.data, [name]: value })
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const id = this.props.match.params.id
        try {
            let formData = new FormData()
            formData.append('image', this.state.data.image)
            formData.append('name', this.state.data.name)
            const res = await fetch(`http://localhost:3000/mypage/edit/${id}`, {
                method: "PUT",
                body: formData,
                headers: new Headers({
                    'Authorization': this.props.token
                })
            });
            if (res.ok) {
                this.setState({ name: '', image: '' })
                console.log('image updated')
            }
        } catch (error) {
            console.log(error)
        }
    }


    render() {
        return (
            <div>
                <Form>
                    <FormGroup>
                        <label htmlFor="name" />
                        <input className="form-control" name="name" type="text" placeholder="title" value={this.state.data.name} onChange={this.handleChange('name')} />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="image" />
                        <input className="form-control" name="image" type="file" accept="image/*" onChange={this.handleChange('image')} />
                    </FormGroup>
                    <div class="modal-footer">
                        <Link to="/MyPhotos">
                            <button type="button" class="btn btn-secondary">Cancel</button>
                        </Link>
                        <button type="submit" class="btn btn-primary" onClick={this.handleSubmit} >Confirm</button>
                    </div>
                </Form>
            </div>


        )
    }
};

export default withRouter(EditImage);

