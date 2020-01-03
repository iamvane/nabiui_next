import React from "react"
import Banner from "../../common/Banner"
import Instructions from "../Instructions"

import Banner2 from "../../common/Banner2"
//Colocar atributo de "image" en cada objeto para pasarle la imagen
const stepsToFollow = [
    {
        title: "1.- Build your profile",
        description: "Tell students who you are, Specify your rates, instruments, teaching locations, avalaibility and more",
    },
    {
        title: "2.- Apply to jobs",
        description: "View requests from students near you and submit your application",
    },
    {
        title: "3.- Start teaching",
        description: "Parents and students choose you, they purchases a lesson package and you start teaching",
    },
]

const index = () => {
    return (
        <React.Fragment>
            <Banner
                title1="How It Works"
                title2="For Instructors"
            />

            <Instructions stepsToFollow={stepsToFollow} />

            <Banner2
                title="Looking for info about learning music?"
                buttonText="SEE HOW IT WORKS FOR PARENTS AND STUDENTS"
            />
        </React.Fragment>
    )
}

export default index;