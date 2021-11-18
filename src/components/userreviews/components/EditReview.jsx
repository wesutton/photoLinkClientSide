
import { Component } from 'react'
import { withRouter } from 'react-router';
import { Button } from 'antd';
import { Input } from 'antd';
import { Link } from 'react-router-dom';


import { Form, FormGroup } from 'reactstrap';
import './EditReview.scss'

class EditReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: [],
            comment: '',

        };
        this.fetchReview = this.fetchReview.bind(this);
        this.updateReview = this.updateReview.bind(this);
    };

    async fetchReview() {
        const id = this.props.match.params.entryid
        await fetch(`http://localhost:3000/reviews/myreview/${id}`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }).then((res) => res.json())
            .then((reviews) => {
                this.setState({ reviews: reviews })
                console.log(reviews);
                console.log(this.state.reviews)


            }).catch((error) => {
                console.log(error)
            })
    }

    componentDidMount() {
        this.fetchReview();
    }

    async updateReview(event) {
        event.preventDefault()
        const id = this.props.match.params.entryid
        console.log(id)
        await fetch(`http://localhost:3000/reviews/update/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ review: { comment: this.state.comment } }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }).then((res) => res.json())
            .then(() => {
                const updateReview = { body: JSON.stringify({ review: { comment: this.state.comment } }) }
                this.setState({...this.state.reviews, updateReview})
                this.setState({comment: ''})
                console.log(this.state.reviews)
            }).catch((err) => {
                console.log({ error: err })
            })
    }

    render() {
        const id = this.props.match
        console.log(id)
        const { TextArea } = Input;
        return (
            <div>
                <div className="inputEditReview">
                    <h5>Edit Review</h5>
                    <Form>
                        <FormGroup>
                            <label htmlFor="name" />
                            <TextArea rows={2} style={{ width: '500px' }} required="required" value={this.state.comment} onChange={(event) => this.setState({ comment: event.target.value })} />
                        </FormGroup>
                        <div class="modal-footer">
                            <Link to="/MyReviews">
                                <Button type="button" class="btn btn-secondary">Cancel</Button>
                            </Link>
                            <Button type="primary" onClick={this.updateReview}>Confirm</Button>
                        </div>
                    </Form>
                </div>

            </div>
        )
    }
}

export default withRouter(EditReview);