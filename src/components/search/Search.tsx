import React, { Component, useState, useEffect } from "react";
import SearchIndex from './searchbar/SearchIndex'
import './Search.scss';


const Search: React.FC<{token: string | null}> = (props) =>{
   
    return (
        <div className="search-page">    
            <br/>
            <SearchIndex token= {props.token}/>
            
        </div>
    );
 }


export default Search;