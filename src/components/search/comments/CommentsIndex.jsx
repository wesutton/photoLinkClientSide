import React, { Component } from 'react'
import { withRouter } from 'react-router';
import ViewReviewsRedirect from '../../UI/ViewReviewsRedirect'
import { Image } from 'antd';
import { Button } from 'antd';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Comment, Tooltip, Avatar } from 'antd';
import './CommentsIndex.scss';
import { Input } from 'antd';
import APIURL from '../../../helpers/environments'

class CommentsIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            reviews: [],
            newReview: '',
            token: this.props.token
        };
        console.log(this.state.reviews)
        this.fetchPost = this.fetchPost.bind(this);
        this.fetchReviews = this.fetchReviews.bind(this);
        this.addReview = this.addReview.bind(this);
    };


    async fetchPost() {
        const id = this.props.match.params.id
        await fetch(`${APIURL}/mypage/${id}`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }).then((res) => res.json())
            .then((posts) => {
                this.setState({ posts: posts })
                console.log(posts)
                console.log(this.state.posts)

            }).catch((error) => {
                console.log(error)
            })
    }


    async fetchReviews() {
        const id = this.props.match.params.id
        await fetch(`${APIURL}/reviews/${id}`, {
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
        this.fetchPost();
        this.fetchReviews();
    }

    async addReview() {
        const id = this.props.match.params.id
        await fetch(`${APIURL}/reviews/post`, {
            method: 'POST',
            body: JSON.stringify({ review: { comment: this.state.newReview, imageId: id, } }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }).then((res) => res.json())
            .then(() => {
                const addNewReview = { body: JSON.stringify({ review: { comment: this.state.newReview, imageId: id, } }) }
                this.setState([...this.state.reviews, addNewReview])
                this.setState({ newReview: '' })
                this.setState(this.fetchReviews());
                console.log('new review added')
            }).catch((err) => {
                console.log(err)
            })
    }

    reviewInput = (event) => {
        this.setState({ newReview: event.target.value })
        console.log(this.state.newReview)
    }



    render() {

        const { TextArea } = Input;
        if (this.state.token === null) {
            return <div className="container"><div className="redirect-card"><ViewReviewsRedirect /></div></div>
        } else {
            return (
                <div class="container">
                    <br />
                    <br />
                    <div class="row">
                        <div class="col">
                            <Card sx={{ maxWidth: 400 }} key={this.state.posts.id} >
                                <CardActionArea>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {this.state.posts.name}
                                        </Typography>
                                    </CardContent> <Image
                                        width={400}
                                        src={this.state.posts.avatar}
                                        fallback=""
                                    />
                                </CardActionArea>
                            </Card>
                        </div>
                        <div class="col">
                            <div className="inputReview">
                                <form required>
                                    <TextArea rows={2} required value={this.state.newReview} onChange={(event) => this.reviewInput(event)} />
                                    <Button type="primary" onClick={this.addReview}>Add Review</Button>
                                </form>
                            </div>
                            <br />
                            <div className="listOfReviews">
                                {this.state.reviews.map(comment => {
                                    return <div className="review" key={comment.id}>
                                        <Comment className="reviews-list"

                                            author={<p className="review-username"> {comment.user.username} </p>}

                                            content={
                                                <p>
                                                    {comment.comment}
                                                </p>
                                            }
                                            datetime={
                                                <Tooltip title={comment.date} className="review-date">
                                                    <span>{comment.date}</span>
                                                </Tooltip>
                                            }
                                        /> </div>
                                })}
                            </div>

                        </div>
                    </div>


                </div>
            )
        }
    }
}
export default withRouter(CommentsIndex);