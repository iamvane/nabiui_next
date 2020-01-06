import * as React from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';

import {
  Action,
  Dispatch
} from 'redux';

import { StoreState } from '../../redux/reducers/store';
import { ListResource } from '../../redux/models/models';
import { Request } from '../../redux/models/RequestModel';
import { fetchRequestsList } from '../../redux/actions/RequestActions';
import ListTemplate from '../common/Templates/ListTemplate';
import { ListTemplateComponent } from '../common/constants/ListTemplate';
import RequestsFilter from './RequestsFilter';
import RequestsFilterMobile from './RequestsFilterMobile';
import Requests from './Requests';

import {
  RequestListComponent,
  RequestFilterComponent,
  RequestListQueryParams,
  defaultQueryParams
} from './constants';

import { defaultPlaceForLessons } from '../Instructors/constants';

interface StateProps {
  requests: ListResource<Request>;
  isRequesting: boolean;
  error: string;
}

interface OwnProps { }

interface DispatchProps {
  fetchRequestList: (params?: any) => void;
}

interface Props extends
  OwnProps,
  StateProps,
  DispatchProps { }

export const InstructorsList = (props: Props) => {
  const [instrument, setInstrument] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [sortBy, setSortBy] = React.useState('');
  const [distance, setDistance] = React.useState(10);
  const [placeForLessons, setPlaceForLessons] = React.useState([]);
  const [age, setAge] = React.useState('');
  const [distanceMobile, setDistanceMobile] = React.useState(50);
  const [placeForLessonsMobile, setPlaceForLessonsMobile] = React.useState(defaultPlaceForLessons);
  const [ageMobile, setAgeMobile] = React.useState('');
  const [queryParams, setQueryParams] = React.useState(defaultQueryParams);

  React.useEffect(() => {
    const fetchData = async () => {
      if (queryParams) {
        await props.fetchRequestList(queryParams);
      } else {
        await props.fetchRequestList();
      }
    };
    fetchData();
    /* tslint:disable */
  }, [queryParams]);
  /* tslint:enable */

  const handleChange = (event: any) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    let queryParamsValues: RequestListQueryParams = {...queryParams};

    switch (name) {
      case ListTemplateComponent.FieldNames.Instruments:
        setInstrument(value);
        queryParamsValues.instrument = value || undefined;
        break;
      case RequestFilterComponent.FieldNames.Sort:
        setSortBy(value);
        queryParamsValues.sort = value || undefined;
        break;
      case RequestFilterComponent.FieldNames.Distance:
        setDistance(value);
        queryParamsValues.distance = value || undefined;
        break;
      case RequestFilterComponent.FieldNames.Location:
        setPlaceForLessons(value);
        queryParamsValues.placeForLessons = value.join(',') || undefined;
        break;
      case RequestFilterComponent.FieldNames.Age:
        setAge(value);
        queryParamsValues.age = value || undefined;
        break;
      default:
        return;
    }
    setQueryParams(queryParamsValues);
  };

  const handleMobileChange = (event: any) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    switch (name) {
      case RequestFilterComponent.FieldNames.Distance:
        setDistanceMobile(value);
        break;
      case 'studio':
      case 'home':
      case 'online':
        setPlaceForLessonsMobile({ ...placeForLessonsMobile, [name]: event.target.checked });
        break;
      case RequestFilterComponent.FieldNames.Location:
        setPlaceForLessonsMobile({ ...placeForLessonsMobile, [name]: event.target.checked });
        break;
      case RequestFilterComponent.FieldNames.Age:
        setAgeMobile(value);
        break;
      default:
        return;
    }
  };

  const handleMobileSortBy = (event: any) => {
    const target = event.target;
    const value = target.value;

    let queryParamsValues: RequestListQueryParams = {...queryParams};
    queryParamsValues.sort = value || undefined;
    setSortBy(value);
    setQueryParams(queryParamsValues);
  };

  const getLocation = (location: string)  => {
    setAddress(location);
  };

  const getLatLng = (lat: string, lng: string)  => {
    let queryParamsValues: RequestListQueryParams = {...queryParams};
    queryParamsValues.location = `${lat},${lng}`;
    setQueryParams(queryParamsValues);
  };

  const setQueryParamsMobile = ()  => {
    let queryParamsValues: RequestListQueryParams = {...queryParams};
    queryParamsValues.distance = distanceMobile || undefined;
    queryParamsValues.placeForLessons = _.keys(_.pickBy(placeForLessonsMobile)).join(',') || undefined;
    queryParamsValues.distance = distanceMobile || undefined;
    setQueryParams(queryParamsValues);
  };

  return (
    <ListTemplate
      pageTitle={RequestListComponent.pageTitle}
      results={props.requests.count}
      handleChange={handleChange}
      getLatLng={getLatLng}
      getLocation={getLocation}
      instrument={instrument}
      address={address}
      isRequesting={props.isRequesting}
      filterSection={
        <React.Fragment>
          <RequestsFilter
            sortBy={sortBy}
            distance={distance}
            placeForLessons={placeForLessons}
            age={age}
            handleChange={handleChange}
          />
          <RequestsFilterMobile
            sortBy={sortBy}
            distance={distanceMobile}
            placeForLessons={placeForLessonsMobile}
            age={ageMobile}
            handleChange={handleMobileChange}
            handleMobileSortBy={handleMobileSortBy}
            setQueryParams={setQueryParamsMobile}
          />
        </React.Fragment>
      }
      mainContent={
        <Requests
          requests={props.requests.results}
          isRequesting={props.isRequesting}
        />
      }
    />
  );
};

const mapStateToProps = (state: StoreState, _ownProps: OwnProps): StateProps => {
  const {
    requestsList,
    actions: {
      fetchRequestList: {
        isRequesting,
        error,
      }
    }
  } = state.requests;

  return {
    requests: requestsList,
    isRequesting,
    error
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<Action>
): DispatchProps => ({
  fetchRequestList: (params?) => dispatch(fetchRequestsList(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(InstructorsList);
