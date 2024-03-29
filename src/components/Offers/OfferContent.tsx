import React from "react";

import { Typography } from "@material-ui/core";
import Countdown from "react-countdown-now";
import { OfferContentComponent } from "./constants";

interface Props {
  expireAt: any;
  content: string;
}

const OfferContent = (props: Props) => {
  const { expireAt, content } = props;
  const renderCountDown = ({ days, hours, minutes, seconds, completed }) => {
    const daysText =
      days > 1 ? OfferContentComponent.days : OfferContentComponent.day;
    const daysValue = days > 0 ? days + " " + daysText + "," : "";

    if (completed) {
      return "";
    } else {
      return (
        <div className={`special-offer-wrapper ${content ? 'display-block' : 'display-none'}}`}>
          <div className="special-offer">
            <Typography className="nabi-color-white nabi-text-semibold">
              {content}.{" "}
            </Typography>
          </div>
        </div>
      );
    }
  };
  return <Countdown date={new Date(expireAt)} renderer={renderCountDown} />;
};

export default OfferContent;
