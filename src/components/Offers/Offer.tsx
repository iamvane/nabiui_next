import React, { useEffect, useState } from "react";
import OfferContent from "./OfferContent";
import { useDispatch, useSelector } from "react-redux";
import { fetchOffer } from "../../redux/actions/UserActions";
import { StoreState } from "../../redux/reducers/store";

const Offer = () => {
  const dispatch = useDispatch();
  const { content, hideAt } = useSelector(
    (state: StoreState) => state.user.offer
  );

  const { error, isRequesting } = useSelector(
    (state: StoreState) => state.user.actions.fetchOffer
  );

  useEffect(() => {
    dispatch(fetchOffer());
  }, []);

  return (
    <React.Fragment>
      {!error && !isRequesting ? (
        <OfferContent
          content={content}
          expireAt={hideAt}
        />
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

export default Offer;
