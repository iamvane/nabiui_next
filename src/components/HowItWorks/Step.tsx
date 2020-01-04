import React from 'react'

const Step = ({ title, description, image = "https://dummyimage.com/80x80/000/fff.png" }) => {
    return (
        <React.Fragment>

            <div className="steps">
                <div className="container1">
                    <h1>{title}</h1>
                    <p className="paragraph">
                        {description}
                    </p>
                </div>
                <div>
                    <div className="img_wrapper">
                        <img src={image}></img>
                    </div>
                </div>

            </div>

            <style jsx>{`
                

                .steps{
                    display: flex;
                    margin-bottom: 20px
                }
                .container1{
                    width: 100%;
                }
                .steps h1{
                    font-size: 14px;
                    font-weight: 600
                }

                .paragraph{
                    font-size: 14px;
                    
                }
                .img_wrapper{
                    width: 100px;
                    height: 100px;
                    background-color: #e2e4e7;
                    border-radius: 50px;
                    display: flex;
                    align-items: center;
                    justify-content: center

                }

                .img_wrapper img{
                    max-width: 80px;
                    max-height: 80px;
                    border-radius: 100px;
                }               
            
            `}
            </style>
        </React.Fragment>
    )
}

export default Step;