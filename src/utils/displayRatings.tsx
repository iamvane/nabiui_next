
import Star from "@material-ui/icons/Star";

export const displayRatings = (reviewsNumber: number) => {
  let ratingStars: JSX.Element[] = [];
  for (let i = 0; i < 5; i++) {
    if (i < reviewsNumber) {
      ratingStars.push(<Star color="primary" key={i} />);
    } else {
      ratingStars.push(<Star color="disabled" key={i} />);
    }
  }
  return ratingStars;
};
