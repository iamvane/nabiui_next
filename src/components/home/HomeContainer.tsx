import React from 'react';
import { Banner } from './home-components/Banner';
import { PopularInstruments }from './home-components/PopularInstruments';
import { BecomeATeacher } from './home-components/BecomeATeacher/'

class Home extends React.Component {
    render() {
        return (
            <div>
                <Banner />
                <PopularInstruments />
                <BecomeATeacher />
            </div>
        );
    }
}

export default Home;