import React from "react";

import { Typography } from "@material-ui/core";

interface Props {
  expireAt: any;
  content: string;
}

const OfferContent = (props: Props) => {
  const { expireAt, content } = props;
  return (
    <div className="special-offer">
      <Typography className="nabi-color-white nabi-text-semibold">
        {content}. Expire: {expireAt.days} Days, {expireAt.hours}h:{expireAt.minutes}m:{expireAt.seconds}s
      </Typography>
    </div>
  );
};

export default OfferContent;
