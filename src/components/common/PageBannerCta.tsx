import React from "react"
import Link from 'next/link';

import { Button } from '@material-ui/core';


export interface Props {
  description: string;
  url: string;
  buttonText: string;
}

const PageBannerCta = (props: Props) => {
  return (
    <div className="page-banner-cta nabi-background-orange nabi-text-center">
      <div className="page-banner-cta-description nabi-margin-bottom-small">{props.description}</div>
      <Link href={props.url}>
        <a>
          <Button variant="contained" color="primary">{props.buttonText}</Button>
        </a>
      </Link>
    </div>
  )
}

export default PageBannerCta;
