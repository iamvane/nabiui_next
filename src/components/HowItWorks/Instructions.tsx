import React from "react";
import Step from "./Step";

const Instructions = ({ stepsToFollow }) => {
    return (
        <React.Fragment>
            <div className="container">
                {
                    stepsToFollow.map((item, key) => {
                        return (
                            <Step key={key}
                                title={item.title}
                                description={item.description}
                                image={item.image}
                            />
                        )
                    })
                }
            </div>
            <style jsx>{`
                .container{
                    width: 50%;
                    margin:auto;
                    margin-top: 40px;
                    margin-bottom: 40px;
                    height: auto;
                    background: white;
                    border-radius:10px;
                    box-shadow: -1px 1px 3px 2px rgba(0, 0, 0, 0.2);
                    padding: 40px 80px 10px 80px
            `}
            </style>

        </React.Fragment>

    )
}

export default Instructions;