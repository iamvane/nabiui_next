import React from "react"
const Banner2 = ({ title, buttonText }) => {
    return (
        <React.Fragment>

            <div className="banner">
                <div className="title1">{title}</div>
                <div className="button">
                    <button className="buttonfaq">
                        {buttonText}
                    </button>
                </div>
            </div>
            <style jsx>{`
                .banner{
                    background: #fb7f6b;
                    width: 100%;
                    height: 200px;
                    display: flex;
                    flex-direction: column;
                    align-items:center;
                    justify-content: center;
                    color: white;
                    
                }

                .title1{
                    font-size: 30px;
                    font-weight: 600;
                    text-align:center
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