import * as React from "react";
import { connect } from "react-redux";
import * as _ from "lodash";
import { Action, Dispatch } from "redux";
import Link from 'next/link';
import Head from 'next/head';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';

import { fetchUser } from "../../redux/actions/UserActions";
import { StoreState } from "../../redux/reducers/store";
import { ListResource } from "../../redux/models/models";
import { Request } from "../../redux/models/RequestModel";
import {
  fetchRequestsList,
  fetchMoreRequestsList
} from "../../redux/actions/RequestActions";
import { Routes } from '../common/constants/Routes';
import ListTemplate from "../common/Templates/ListTemplate";
import { ListTemplateComponent } from "../common/constants/ListTemplate";
import { pageTitlesAndDescriptions } from '../common/constants/TitlesAndDescriptions';
import RequestsFilter from "./RequestsFilter";
import RequestsFilterMobile from "./RequestsFilterMobile";
import Requests from "./Requests";
import RegisterModal from "./RegisterModal";
import {
  RequestsListComponent,
  RequestFilterComponent,
  RequestListQueryParams,
  defaultQueryParams
} from "./constants";

import { defaultPlaceForLessons } from "../Instructors/constants";

interface StateProps {
  requests: ListResource<Request>;
  isRequesting: boolean;
  isRequestingMoreRequest: boolean;
  error: string;
  isLoggedIn: boolean;
}

interface OwnProps {}

interface DispatchProps {
  fetchRequestList: (params?: any) => void;
  fetchUser: () => void;
  fetchMoreRequests: (params: any) => void
}

interface Props extends OwnProps, StateProps, DispatchProps {}

export const ReuqestsList = (props: Props) => {
  const [instrument, setInstrument] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [sortBy, setSortBy] = React.useState("");
  const [distance, setDistance] = React.useState(50);
  const [placeForLessons, setPlaceForLessons] = React.useState([]);
  const [age, setAge] = React.useState("");
  const [distanceMobile, setDistanceMobile] = React.useState(50);
  const [placeForLessonsMobile, setPlaceForLessonsMobile] = React.useState(
    defaultPlaceForLessons
  );
  const [ageMobile, setAgeMobile] = React.useState("");
  const [queryParams, setQueryParams] = React.useState(defaultQueryParams);
  const [register, setRegister] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      await props.fetchUser();
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

    let queryParamsValues: RequestListQueryParams = { ...queryParams };

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
        queryParamsValues.placeForLessons = value.join(",") || undefined;
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

  const toggleRegisterModal = () => {
    setRegister(prevOpen => !prevOpen);
  };

  const handleMobileChange = (event: any) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    switch (name) {
      case RequestFilterComponent.FieldNames.Distance:
        setDistanceMobile(value);
        break;
      case "studio":
      case "home":
      case "online":
        setPlaceForLessonsMobile({
          ...placeForLessonsMobile,
          [name]: event.target.checked
        });
        break;
      case RequestFilterComponent.FieldNames.Location:
        setPlaceForLessonsMobile({
          ...placeForLessonsMobile,
          [name]: event.target.checked
        });
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

    let queryParamsValues: RequestListQueryParams = { ...queryParams };
    queryParamsValues.sort = value || undefined;
    setSortBy(value);
    setQueryParams(queryParamsValues);
  };

  const getLocation = (location: string) => {
    setAddress(location);
  };

  const getLatLng = (lat: string, lng: string) => {
    let queryParamsValues: RequestListQueryParams = { ...queryParams };
    queryParamsValues.location = `${lat},${lng}`;
    setQueryParams(queryParamsValues);
  };

  const setQueryParamsMobile = () => {
    let queryParamsValues: RequestListQueryParams = { ...queryParams };
    queryParamsValues.distance = distanceMobile || undefined;
    queryParamsValues.placeForLessons =
      _.keys(_.pickBy(placeForLessonsMobile)).join(",") || undefined;
    queryParamsValues.distance = distanceMobile || undefined;
    setQueryParams(queryParamsValues);
  };

  const fetchMoreRequestsList = () => {
    const hasMoreData =
      props.requests.results.length + 1 >= props.requests.count;
    if (props.isRequesting || props.isRequestingMoreRequest || hasMoreData) return;
    props.fetchMoreRequests(queryParams);
  }

  return (
    <React.Fragment>
      <Head>
        <title>{pageTitlesAndDescriptions.requests.title}</title>
        <meta name="description" content={pageTitlesAndDescriptions.requests.description}></meta>
      </Head>
      <ListTemplate
        pageTitle={RequestsListComponent.pageTitle}
        results={props.requests.count}
        handleChange={handleChange}
        getLatLng={getLatLng}
        getLocation={getLocation}
        instrument={instrument}
        address={address}
        isRequesting={props.isRequesting}
        loadMoreData={fetchMoreRequestsList}
        isRequestingMoreData={props.isRequestingMoreRequest}
        breadcrumbs={
          <div className="nabi-margin-bottom-xsmall">
            <Breadcrumbs aria-label="breadcrumb">
              <Link href={props.isLoggedIn ? Routes.Dashboard : Routes.HomePage}>
                <a>{RequestsListComponent.breadcrumbLabels.home}</a>
              </Link>
              <Typography> {RequestsListComponent.breadcrumbLabels.requests}</Typography>
            </Breadcrumbs>
          </div>
        }
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
            isLoggedIn={props.isLoggedIn}
            requests={props.requests.results}
            isRequesting={props.isRequesting}
            toggleRegisterModal={toggleRegisterModal}
          />
        }
      />
      <RegisterModal isOpen={register} handleClose={toggleRegisterModal} />
    </React.Fragment>
  );
};

const mapStateToProps = (
  state: StoreState,
  _ownProps: OwnProps
): StateProps => {
  const {
    requestsList,
    actions: {
      fetchRequestList: { isRequesting, error },
      fetchMoreRequestList: { isRequesting: isRequestingMoreRequest }
    }
  } = state.requests;

  return {
    requests: requestsList,
    isRequesting,
    isRequestingMoreRequest,
    error,
    isLoggedIn: !!state.user.user.email
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => ({
  fetchRequestList: (params?) => dispatch(fetchRequestsList(params)),
  fetchUser: () => dispatch(fetchUser()),
  fetchMoreRequests: (params: any) => dispatch(fetchMoreRequestsList(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(ReuqestsList);
