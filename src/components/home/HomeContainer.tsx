import React from 'react';
import Banner from './home-components/Banner';
import PopularInstruments from './home-components/PopularInstruments';

class Home extends React.Component {
    render() {
        return (
            <div>
                <Banner />
                <PopularInstruments />
            </div>
        );
    }
}

export default Home;