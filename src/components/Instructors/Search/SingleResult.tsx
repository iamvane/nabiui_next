import React from 'react'

const SingleResult = () => {
    return (<React.Fragment>
        <div className="container">
            <div className="content">
                <div className="first">
                    <div className="img_wrapper">
                        <img src="https://dummyimage.com/100x100/000/fff.png"></img>
                    </div>
                    <div className="name_star">
                        <h4 className="name_instr">Victoria F.</h4>
                        <div className="stars">
                            ⭐️⭐️⭐️⭐️⭐️
                            </div>
                    </div>
                    <p className="year_exp">
                        3 YRS EXP | 30 YERS OLD
                        </p>
                </div>
                <div className="second">
                    <div>
                        <h2 className="title_second">Certified music teacher in boston</h2>
                    </div>
                    <div>
                        <p className="paragraph_second">Nabi music is the first of its kind... i'd encourage anyone and everyone interested to explore</p>
                    </div>
                    <div className="bgcheck">
                        <span className="badge">🎖</span>
                        <small className="bgchecktext">Background check</small>
                    </div>
                    <div className="whatTeaches">
                        <div className="whatTeaches_content1">
                            <span>Teaches</span>:
                            Music Theory, Piano,Music History,
                            Ear Training, Singing

                            </div>
                        <div className="whatTeaches_content2">
                            <span>Teaching locations</span>
                            <ul>
                                <li><div className="iconsLocations">🏠</div>Student Home</li>
                                <li><div className="iconsLocations">🎸</div>Instructor Studio</li>
                                <li><div className="iconsLocations">🖱</div>Online</li>
                            </ul>
                        </div>
                    </div>

                </div>

                <div className="third">
                    <h4 className="headTitle">Start At</h4>
                    <h2 className="priceLesson">$30.00/lesson</h2>
                    <button className="button_profile">View Profile</button>
                    <ul>
                        <li><b>Lessons Taught:</b> 0</li>
                        <li><b>Last Login:</b> Invalid Date</li>
                        <li><b>Member Since:</b> 2019</li>
                    </ul>
                </div>
            </div>
        </div>
        <style jsx>{`
                
                .container{
                    min-height: 100px;
                    background: white;
                    max-width:960px;
                    margin: 10px auto ;
                    border-radius: 10px;
                    padding-top:10px;
                    padding-bottom:20px;
                    
                }
                .content{
                    display: flex;
                     padding-left:10px;
                     padding-right:10px;
                     align-items: center;
                     justify-content: center
                }
                .first{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    margin-left: 50px;
                    margin-right: 50px;
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
                    max-width: 100px;
                    max-height: 100px;
                    border-radius: 100px;
                }

                .year_exp{
                    font-size: 10px
                }
                .name_star{
                    text-align: center;
                }
                .name_instr{
                    margin: 5px
                }
                .stars{                    
                    font-size: 40px;
                }

                .second{
                    margin-top: 20px
                }

                .title_second{
                    color: #06c3e1;
                    font-size: 40px;
                    font-weight: 500;
                    font-family: 'JennaSue';
                    margin:0
                }

                .paragraph_second{
                    margin: auto;
                    margin-top: 5px;
                    margin-bottom: 15px;
                }
                .bgcheck{
                    display: flex;
                    align-items: center;
                    margin-top: 15px
                    margin-bottom: 10px
                    
                }

                .badge{
                    background-color: #ff8363;
                    text-align:center;
                    color: white;
                    border-radius: 100px;
                    padding: 0px 3px 0px 3px;
                    font-size:20px
                    
                }

                .bgchecktext{
                    padding-left: 10px;
                    font-size: 13px;
                    font-weight: 600
                }
                .whatTeaches{
                    display: flex;
                    margin-top:15px
                }
                .whatTeaches div{
                    width: 100%
                }
                .whatTeaches_content1 span, .whatTeaches_content2 span{
                     color: #06c3e1;
                     font-weight: 600
                }
                .whatTeaches_content1{
                    font-size: 15px
                }

                .whatTeaches_content2 ul{
                    padding: 0;
                }
                .whatTeaches_content2 ul li{
                    padding: 0;
                    display: flex;
                    align-items: center;
                    margin-top: 10px
                }
                .iconsLocations{
                    background-color: #06c3e1;
                    text-align:center;
                    color: white !important;
                    border-radius: 100px;
                    
                    font-size:15px;
                    width: 28px !important;
                    height: 28px !important;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: 10px
                }
                .third{
                    text-align:center;
                    margin-left: 50px;
                    margin-right: 50px;
                }
                .headTitle{
                    text-align:center;
                    font-weight: 500
                }
                .priceLesson{
                    text-align:center;
                    font-weight: 600
                }

                .button_profile{
                    border:none;
                    border-radius: 4px;
                    border-bottom: 4px solid #16b4cd;
                    background: #06c3e1;
                    color: white;
                    padding: 10px 30px 10px 30px;
                    font-size: 17px;
                    font-weight: 500

                 }
                .button_profile:focus{
                    outline: none
                }

                .third ul{
                    padding: 0px;
                    font-size: 13px;
                    
                }
                .third ul li{
                    text-align:center;
                    display:block;
                    line-height: 18px
                }

                .third ul li b{
                    font-weight: 600
                }

                @media only screen and (max-width: 700px) {
                    .content{
                        flex-direction: column;
                    }
                }
               
            `}</style>
    </React.Fragment>)
}


export default SingleResult;