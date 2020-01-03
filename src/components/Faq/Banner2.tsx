import React from "react"
const Banner2 = () => {
    return (
        <React.Fragment>

            <div className="banner">
                <div className="title1">Looking for info about how to become an instructor?</div>
                <div className="button">
                    <button className="buttonfaq">
                        CHECKOUT THIS FAQ
                    </button>
                </div>
            </div>
            <style jsx>{`
                .banner{
                    background: #fb7f6b;
                    width: 100%;
                    height: 300px;
                    display: flex;
                    flex-direction: column;
                    align-items:center;
                    justify-content: center;
                    color: white;
                    margin-top: 50px
                }

                .title1{
                    font-size: 30px;
                    font-weight: 600;
                }
                .buttonfaq{
                    border: none;
                    padding 10px;
                    background: #06c3e1;
                    color: white;
                    font-weight: 500;
                    margin-top:30px;
                    cursor:pointer
                }
                button:focus {outline:0;}
            `}
            </style>
        </React.Fragment>
    )
}

export default Banner2;