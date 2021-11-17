import React, { Component } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Button } from 'antd';
import { Image } from 'antd';
import { Link } from 'react-router-dom';
import { Comment, Tooltip, Avatar } from 'antd';
import './UserReviewIndex.scss'

export default class UserReviewsIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myreviews: []
        };
        this.fetchMyReviews = this.fetchMyReviews.bind(this);
    }

    async fetchMyReviews() {
        await fetch('http://localhost:3000/reviews/myreview', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }).then((res) => res.json())
            .then((myreviews) => {
                this.setState({ myreviews: myreviews })
                console.log(myreviews)

            }).catch((error) => {
                console.log(error)
            })
    }

    componentDidMount() {
        this.fetchMyReviews();
    }

    async deleteReview(id) {
        await fetch(`http://localhost:3000/reviews/delete/${id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }).then((res) => res.json())
            .then((updatedReviews) => {
                updatedReviews = this.state.myreviews.filter((review) => review._id !== id )
                this.setState({updatedReviews});
                this.setState(this.fetchMyReviews());
                console.log('review deleted')
            })
    }



    render() {
        return (
            <div>
                <div className="review-cards" >
                    {this.state.myreviews?.map((review, _id) => (
                        <div key={review._id}  > <Card sx={{ maxWidth: 345 }} key={review.id} >
                            <CardActionArea>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {review.image.name}
                                        {/* {console.log(review.image.name)} */}
                                    </Typography>
                                </CardContent>

                                <Image
                                    width={345}
                                    src={review.image.avatar}
                                />
                            </CardActionArea>
                            <Comment className="myreviews-list"
                                        content={
                                            <p className= "review-comment">
                                                {review.comment}   
                                            </p>
                                         
                                        }
                                        datetime={
                                            <Tooltip title={review.date} className="myreview-date">
                                                <span>{review.date}</span>
                                            </Tooltip>
                                        }
                                    />
                            <Link to = {`/reviews/${review.id}`} style = {{textDecoration: 'none'}} token={this.props.token} key= {_id}  >
                            <Button>edit</Button>  </Link>      
                            <Button onClick={()=> this.deleteReview(review.id)}>delete</Button>

                        </Card>
                            <br />
                        </div>
                    ))
                    }
                </div>
            </div>

        )
    }
}
