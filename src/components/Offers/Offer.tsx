import React, { useEffect } from "react";
import OfferContent from "./OfferContent";
import { useDispatch, useSelector } from "react-redux";
import { fetchOffer } from "../../redux/actions/UserActions";

const Offer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOffer());
  }, []);

  return (
    <>
      <OfferContent
        content="San Valentin Special, get 10% off music lessons"
        expireAt="21-09-2019"
      />
    </>
  );
};

export default Offer;
