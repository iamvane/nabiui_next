import React from 'react'

const Title = () => {
    return (
        <React.Fragment>
            <div className="container">
                <h1>Instructors</h1>
            </div>
            <style jsx>{`
                .container{
                    color: #06c3e1;
                    text-align:center
                }
                .container h1{
                    text-transform:uppercase;
                    font-weight: 500
                }
            `}</style>
        </React.Fragment>
    )
}

export default Title