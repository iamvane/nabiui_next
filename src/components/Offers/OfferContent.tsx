import React from "react";

import { Typography } from "@material-ui/core";

interface Props {
  expireAt: string;
  content: string;
}

const OfferContent = (props: Props) => {
  const { expireAt, content } = props;
  return (
    <div className="special-offer">
      <Typography className="nabi-color-white nabi-text-semibold">
        {content}. Expire: {expireAt}
      </Typography>
    </div>
  );
};

export default OfferContent;
