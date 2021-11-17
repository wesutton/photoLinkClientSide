import React, { Component, useState, useEffect } from "react";
import SearchIndex from './searchbar/SearchIndex'


const Search: React.FC<{token: string | null}> = (props) =>{
   
    // const [myPosts, setMyPosts] = useState([]);

    // const fetchMyPosts = () => {
    //     fetch('http://localhost:3000/mypage/myposts', {
    //         method: 'GET',
    //         headers: new Headers ({
    //             'Content-Type': 'application/json',
    //             'Authorization': props.token
    //         })
    //     }) .then ((res) => res.json())
    //     .then((posts) => {
    //         setMyPosts(posts)
    //         console.log(posts)
    //     })
    // }

    // useEffect(() => {
    //     fetchMyPosts();
    // }, [])
    
    


    return (
        <div>    
            <br/>
            <SearchIndex token= {props.token}/>
            
        </div>
    );
 }


export default Search;