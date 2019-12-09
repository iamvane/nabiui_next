import * as React from 'react';
import Link from 'next/link';

import {
  GridList,
  GridListTile
} from '@material-ui/core';
import { popularInstruments } from '../../../../assets/data/popularInstruments';
import { Routes } from '../constants/Routes';

/**
 * Hoempage popular instruments section
 */
class PopularInstruments extends React.Component<{}, {}> {
  componentDidMount() {
    const slides = document.querySelectorAll(`.popular-instrument-card-group`);
    let currentSlide = 0;
    const nextSlide = () =>  {
        slides[currentSlide].className = 'popular-instrument-card-group';
        currentSlide = (currentSlide + 1) % 3;
        slides[currentSlide].className = 'popular-instrument-card-group nabi-showing';
    };
    setInterval(nextSlide, 4000);

    const slidesMobile = document.querySelectorAll(`.popular-instrument-card-group-mobile`);
    let currentSlideMobile = 0;
    const nextSlideMobile = () =>  {
        slidesMobile[currentSlideMobile].className = 'popular-instrument-card-group-mobile';
        currentSlideMobile = (currentSlideMobile + 1) % 5;
        slidesMobile[currentSlideMobile].className = 'popular-instrument-card-group-mobile nabi-showing';
    };
    setInterval(nextSlideMobile, 4000);
  }

  public render() {
    const popularInstrumentsFirstTrio = popularInstruments.slice(0, 5);
    const popularInstrumentsSecondTrio = popularInstruments.slice(5, 10);
    const popularInstrumentsThirdTrio = popularInstruments.slice(10, 15);
    const popularInstrumentsFirstMobile = popularInstruments.slice(0, 3);
    const popularInstrumentsSecondMobile = popularInstruments.slice(3, 6);
    const popularInstrumentsThirdMobile = popularInstruments.slice(6, 9);
    const popularInstrumentsFourthMobile = popularInstruments.slice(9, 12);
    const popularInstrumentsFifthMobile = popularInstruments.slice(12, 15);

    const renderfirstTrio = (array: string[], numberOfColumns: number): JSX.Element => {
      return (
        <GridList className="" cols={numberOfColumns}>
        {array.map((instrument, i) => (
          <GridListTile key={i} cols={1}>
            <Link
              href={Routes.Registration}
            >
              <a
                className="nabi-text-mediumbold"
                key={i}
              >
                {instrument}
              </a>
            </Link>
          </GridListTile>
          )
        )}
        </GridList>
      );
    };

    return (
      <div className="nabi-padding-bottom-small nabi-background-orange">
        <div className="nabi-container nabi-text-center">
          {/* tslint:disable-next-line:max-line-length */}
          <div className="hide-on-desktop nabi-popular-instruments nabi-padding-top-small nabi-padding-bottom-small">
            <div className="popular-instrument-card-group-mobile nabi-showing">
              {renderfirstTrio(popularInstrumentsFirstMobile, 3)}
            </div>
            <div className="popular-instrument-card-group-mobile">
              {renderfirstTrio(popularInstrumentsSecondMobile, 3)}
            </div>
            <div className="popular-instrument-card-group-mobile">
              {renderfirstTrio(popularInstrumentsThirdMobile, 3)}
            </div>
            <div className="popular-instrument-card-group-mobile">
              {renderfirstTrio(popularInstrumentsFourthMobile, 3)}
            </div>
            <div className="popular-instrument-card-group-mobile">
              {renderfirstTrio(popularInstrumentsFifthMobile, 3)}
            </div>
          </div>
          <div className="hide-on-mobile nabi-popular-instruments">
            <div className="popular-instrument-card-group nabi-showing">
              {renderfirstTrio(popularInstrumentsFirstTrio, 5)}
            </div>
            <div className="popular-instrument-card-group">
              {renderfirstTrio(popularInstrumentsSecondTrio, 5)}
            </div>
            <div className="popular-instrument-card-group">
              {renderfirstTrio(popularInstrumentsThirdTrio, 5)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PopularInstruments;
