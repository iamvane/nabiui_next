import React, { useEffect, useState } from "react";
import OfferContent from "./OfferContent";
import { useDispatch, useSelector } from "react-redux";
import { fetchOffer } from "../../redux/actions/UserActions";
import { StoreState } from "../../redux/reducers/store";
import moment from "moment";

const Offer = () => {
  const dispatch = useDispatch();
  const { content, hideAt } = useSelector(
    (state: StoreState) => state.user.offer
  );

  const { error } = useSelector(
    (state: StoreState) => state.user.actions.fetchOffer
  );

  const [expireAt, setExpireAt] = useState({});
  let interval = null;

  useEffect(() => {
    dispatch(fetchOffer());
    if (hideAt) {
      interval = setInterval(() => {
        const countdown = moment(
          Date.parse(String(new Date(hideAt))) - Date.parse(String(new Date()))
        );
        const days = countdown.format("D");
        const hours = countdown.format("HH");
        const minutes = countdown.format("mm");
        const seconds = countdown.format("ss");
        setExpireAt({ days, hours, minutes, seconds });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [hideAt]);

  return (
    <>{!error ? <OfferContent content={content} expireAt={expireAt} /> : ""}</>
  );
};

export default Offer;
