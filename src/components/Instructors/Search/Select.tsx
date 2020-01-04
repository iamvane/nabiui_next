import React from 'react'



const index = ({ children }) => {
    return (
        <>
            <select className="select_design">
                {children}
            </select>
            <style jsx>
                {`
                .select_design{
                    border: none;
                    background: #f3f6f9;
                    padding: 10px;
                    color: #7f8796;
                    border-radius: 4px;
                    margin-top: 7px;
                    margin-bottom: 7px;
                    margin-right: 7px;
                    margin-left: 7px;
                }

                .select_design:focus{
                    outline: none
                }
            `}
            </style>
        </>
    )
}


export default index