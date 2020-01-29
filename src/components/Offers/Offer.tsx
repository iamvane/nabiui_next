import React, { useEffect } from "react";
import OfferContent from "./OfferContent";
import { useDispatch, useSelector } from "react-redux";
import { fetchOffer } from "../../redux/actions/UserActions";
import { StoreState } from "../../redux/reducers/store";

const Offer = () => {
  const dispatch = useDispatch();
  const { content, hideAt } = useSelector(
    (state: StoreState) => state.user.offer
  );

  useEffect(() => {
    dispatch(fetchOffer());
  }, []);

  return (
    <>
      <OfferContent content={content} expireAt={hideAt} />
    </>
  );
};

export default Offer;
