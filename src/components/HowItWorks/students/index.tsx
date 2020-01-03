import React from "react"
import Banner from "../../common/Banner"
import Instructions from "../Instructions"

import Banner2 from "../../common/Banner2"


//Colocar atributo de "image" en cada objeto para pasarle la imagen
const stepsToFollow = [
    {
        title: "1. Post a request",
        description: "Post a request specifying the student's age, level, instrument, and teaching location",
    },
    {
        title: "2. Review applications",
        description: "Review applications from instructors near you. See their profiles, rates, music, and more",
    },
    {
        title: "3. Book lessons",
        description: "Once you find the instructor you like, purchase one of our lesson packages and start learning",
    },
]

const index = () => {
    return (
        <React.Fragment>
            <Banner
                title1="How It Works"
                title2="For Parents & Students"
            />

            <Instructions stepsToFollow={stepsToFollow} />

            <Banner2
                title="Looking for info about how to become an instructor?"
                buttonText="SEE HOW IT WORKS FOR INSTRUCTORS"
            />
        </React.Fragment>
    )
}

export default index;