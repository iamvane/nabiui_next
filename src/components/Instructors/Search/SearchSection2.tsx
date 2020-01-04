import React from 'react';

const SearchSection2 = () => {
    return (
        <React.Fragment>
            <div className="container">
                <div className="content_select">
                    <div className="select_container">
                        <label>Sort</label>
                        <select>
                            <option>Sort By</option>
                        </select>
                    </div>
                    <div className="select_container">
                        <label>Distance</label>
                        <select>
                            <option>10 Miles</option>
                        </select>
                    </div>
                    <div className="select_container">
                        <label>Place For Lessons</label>
                        <select>
                            <option>Select location</option>
                        </select>
                    </div>
                    <div className="select_container">
                        <label>Avalaibility</label>
                        <select>
                            <option>Select day(s)</option>
                        </select>
                    </div>
                </div>
                <div className="content_select">
                    <div className="select_container">
                        <label>Price</label>
                        <select>
                            <option>$0-200 By</option>
                        </select>
                    </div>
                    <div className="select_container">
                        <label>Student Age</label>
                        <select>
                            <option>Select Age</option>
                        </select>
                    </div>
                    <div className="select_container">
                        <label>Gender</label>
                        <select>
                            <option>Select gender</option>
                        </select>
                    </div>
                    <div className="select_container">
                        <label>Additional Qualifications</label>
                        <select>
                            <option>Select qualifications</option>
                        </select>
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

                .content_select{
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    padding-top:10px;
                    padding-bottom:10px;
                    padding-left: 10px;
                    padding-right: 10px;
                }
                .select_container{
                    width: 100%;
                }
                .select_container label{
                    font-size: 10px;
                    font-weight: 600;
                    padding-left: 15px
                }
                .content_select select{
                    width: 100%;
                    margin: 1px;
                    border: 2px solid #ebeef1;
                    background: #f3f6f9;
                    padding: 10px;
                    border-radius: 5px;
                }

            `}</style>
        </React.Fragment>
    )
}

export default SearchSection2