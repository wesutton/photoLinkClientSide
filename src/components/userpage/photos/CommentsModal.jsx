
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { Comment, Tooltip, Avatar } from 'antd';
import {Button} from 'antd'
import APIURL from '../../../helpers/environments';
import './Photos'


class CommentsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: []
    }
    this.fetchReviews = this.fetchReviews.bind(this)
  }

  async fetchReviews() {
    const id = this.props.match.params.imageId
    console.log(id)
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
    this.fetchReviews();
  }

  render() {
    const id = this.props.match.params.imageId
    console.log(id)
    return (
      <div>
        <Button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#commentsModal" aria-hidden="true">
                         Launch demo modal
      </Button>
      <div class="modal fade" id="commentsModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>

              <Link to="/MyPhotos"><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></Link>

            </div>
            <div class="modal-body">
            <div className="listOfReviews">
                            {this.state.reviews.map(comment => {
                                return <div className="review" key={comment.id}>
                                    <Comment className="reviews-list"
                                      
                                        author={  <p className="review-username"> {comment.user.username} </p>}
                                       
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
            <div class="modal-footer">
              <Link to="/MyPhotos">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </Link>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
      </div>
    )
  }
}
export default withRouter(CommentsModal);

