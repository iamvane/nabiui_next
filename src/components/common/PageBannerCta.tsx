import React from "react"
import Link from 'next/link';

import { Button } from '@material-ui/core';

export interface Props {
  description: string;
  url: string;
  buttonText: string;
}

const PageBannerCta = (props: Props) => {
  return (<React.Fragment>
    <style jsx>{`
      .banner{
        background: #;
        width: 100%;
        height: 200px;
        display: flex;
        flex-direction: column;
        align-items:center;
        justify-content: center;
        color: white
      }
      .title2{
        font-size: 30px;
        font-weight: 600;
      }
      `
    }
    </style>

    <div className="banner nabi-background-orange">
      <div className="title2 nabi-margin-bottom-small">{props.description}</div>
      <Link href={props.url}>
        <a>
          <Button variant="contained" color="primary">{props.buttonText}</Button>
        </a>
      </Link>
    </div>

    </React.Fragment>)
}

export default PageBannerCta;
