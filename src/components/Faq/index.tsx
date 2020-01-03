import React from "react"
import Banner from "../common/Banner"

import Questions from "./Questions"
import Banner2 from "../common/Banner2"

const index = () => {
    return (
        <React.Fragment>
            <Banner
                title1="FAQs"
                title2="For Parents & Students"
            />
            < Questions />
            <Banner2
                title="Looking for info about how to become an instructor?"
                buttonText="CHECKOUT THIS FAQ"
            />
        </React.Fragment>
    )
}

export default index;