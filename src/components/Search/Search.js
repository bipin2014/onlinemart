import React from 'react';

function Search(){
    return(
        <div className="search-item">
            <input type="text"  placeholder="Enter a product name or category"/>
            <i className="fa fa-search" />
        </div>
    )
}

export default Search;