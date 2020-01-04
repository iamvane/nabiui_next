import React from 'react'
import Title from "./Title";
import SearchSection1 from "./SearchSection1";
import SearchSection2 from "./SearchSection2";
import Subtitle from "./Subtitle";
import Results from "./Results";

const index = () => {
    return (
        <div>
            <Title />
            <SearchSection1 />
            <SearchSection2 />
            <Subtitle />
            <Results />
        </div>
    )
}


export default index