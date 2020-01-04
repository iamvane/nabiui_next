import React from 'react';
import Select from "./Select";

const SearchSection1 = () => {
    return (
        <React.Fragment>
            <div className="container">
                <div >
                    <button className="button_request">Request instructor</button>
                </div>
                <div className="text_between">
                    or search
                </div>
                <div>
                    <Select>
                        <option >Select Instrument</option>
                    </Select>
                </div>
                <div>
                    <input className="input_design" placeholder="Enter Home Address" />
                </div>

            </div>
            <style jsx>{`
                ::-webkit-input-placeholder { /* Edge */
                color: #7f8796;
                }

                :-ms-input-placeholder { /* Internet Explorer 10-11 */
                color: #7f8796;
                }

                ::placeholder {
                color: #7f8796;
                }
                .input_design{
                    border: none;
                    background: #f3f6f9;
                    padding: 11px;
                    color: #7f8796;
                    border-radius: 4px;
                    width: 300px
                    
                }
                .input_design:focus{
                    outline: none
                }

                .container{
                    background: #06c3e1;
                    width: auto;
                    max-width:960px;
                    margin: auto;
                    height: auto;
                    min-height: 100px;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 10px 0px 10px 0px;
                }
                .button_request{
                    border: none;
                    border-bottom: 2px solid #e2e4e7;
                    background: white;
                    color: #06c3e1;
                    padding: 20px 30px 20px 30px;
                    text-transform: uppercase;
                    text-align:center;
                    width:200px;
                    line-height: 17px;
                    font-weight: 500;
                    font-size: 13px;
                    border-radius: 2px
                }
                .text_between{
                    color: white;
                    padding: 13px;
                    width: 50px;
                    font-size: 11px
                }
                .button_request:focus{
                    outline: 0
                }

                @media only screen and (max-width: 960px) {
                    .container{
                        flex-direction: column;
                    }
                }
                

         `}
            </style>
        </React.Fragment>
    )
}


export default SearchSection1