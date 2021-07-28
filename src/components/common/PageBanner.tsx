import React from "react"

import '../../../assets/scss/PageBanner.module.scss';

export interface Props {
  title: string;
  description: string;
}

const Banner = (props: Props) => {
  return (
    <div className="page-banner nabi-text-center">
      <div className="page-banner-title">{props.title}</div>
      <div className="page-banner-description">{props.description}</div>
    </div>
  )
}

export default Banner;
