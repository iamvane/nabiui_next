import React from "react"

export interface Props {
  title: string;
  description: string;
}

const Banner = (props: Props) => {
  return (<React.Fragment>
    <style jsx>{`
      .banner{
          background: #06c3e1;
          width: 100%;
          height: 250px;
          display: flex;
          flex-direction: column;
          align-items:center;
          justify-content: center;
          color: white
      }
      .title1{
          font-size: 50px;
          font-weight: 700                    
      }
      .title2{
          font-size: 40px;
          font-weight: 600                    
      }
      `
    }
    </style>

    <div className="banner">
        <div className="title1">{props.title}</div>
        <div className="title2">{props.description}</div>
    </div>

    </React.Fragment>)
}

export default Banner;
