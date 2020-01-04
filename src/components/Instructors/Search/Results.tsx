import React from 'react'
import SingleResult from "./SingleResult";


//Podemos enviar los resultados por props haciendole map.
const items = [
    {
        item: ""
    },
    {
        item: ""
    },
]

const Results = () => {
    return (
        <React.Fragment>
            {
                items.map((item, key) => {
                    return (
                        <SingleResult key={key} />
                    )
                })
            }

        </React.Fragment>
    )
}

export default Results