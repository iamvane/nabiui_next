import React from 'react'

const Title = () => {
    return (
        <React.Fragment>
            <div className="container">
                <h3>4 result(s)</h3>
            </div>
            <style jsx>{`
                .container{
                    color: #06c3e1;
                    text-align:center
                }
                .container h3{
                    text-transform:lowercase;
                    font-weight: 300
                }
            `}</style>
        </React.Fragment>
    )
}

export default Title