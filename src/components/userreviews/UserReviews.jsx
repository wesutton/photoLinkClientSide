import React, { Component } from 'react'
import UserReviewsIndex from './components/UserReviewsIndex'
import './UserReviews.scss'

export default class UserReviews extends Component {
    render() {
        return (
            <div className="userreviews-page">
                <UserReviewsIndex token= {this.props.token}/>
            </div>
        )
    }
}
