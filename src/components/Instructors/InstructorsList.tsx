import * as React from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';

import {
  Action,
  Dispatch
} from 'redux';

import { StoreState } from 'redux/store';
import { ListResource } from 'redux/models/models';
import ListTemplate from 'components/common/Templates/ListTemplate';
import InstructorsFilter from 'components/Instructors/InstructorsFilter';
import InstructorsFilterMobile from 'components/Instructors/InstructorsFilterMobile';
import Instructors from 'components/Instructors/Instructors';

import { Instructor, InstructorType } from 'redux/models/InstructorModel';
import { fetchInstructors, fetchInstructor } from 'redux/actions/InstructorActions';
import { ListTemplateComponent } from 'components/common/constants/ListTemplate';

import {
  InstructorsComponent,
  InstructorFilterComponent,
  InstructorListQueryParams,
  defaultQueryParams,
  defaultQualifications,
  defaultPlaceForLessons
} from 'components/Instructors/constants';

interface StateProps {
  instructors: ListResource<Instructor>;
  isRequesting: boolean;
  isRequestingInstructor: boolean;
  instructor: InstructorType;
}

interface OwnProps { }

interface DispatchProps {
  fetchInstructors: (params?: any) => void;
  fetchInstructor: (id: number) => void;
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
  const [availability, setAvailability] = React.useState([]);
  const [priceRange, setPriceRange] = React.useState<number[]>([0, 200]);
  const [age, setAge] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [qualifications, setQualifications] = React.useState([]);
  const [distanceMobile, setDistanceMobile] = React.useState(50);
  const [placeForLessonsMobile, setPlaceForLessonsMobile] = React.useState(defaultPlaceForLessons);
  const [availabilityMobile, setAvailabilityMobile] = React.useState('');
  const [ageMobile, setAgeMobile] = React.useState('');
  const [genderMobile, setGenderMobile] = React.useState('');
  const [qualificationsMobile, setQualificationsMobile] = React.useState(defaultQualifications);
  const [queryParams, setQueryParams] = React.useState(defaultQueryParams);

  React.useEffect(() => {
    const fetchData = async () => {
      if (queryParams) {
        await props.fetchInstructors(queryParams);
      } else {
        await props.fetchInstructors();
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

    let queryParamsValues: InstructorListQueryParams = {...queryParams};

    switch (name) {
      case ListTemplateComponent.FieldNames.Instruments:
        setInstrument(value);
        queryParamsValues.instruments = value || undefined;
        break;
      case InstructorFilterComponent.FieldNames.Sort:
        setSortBy(value);
        queryParamsValues.sort = value || undefined;
        break;
      case InstructorFilterComponent.FieldNames.Distance:
        setDistance(value);
        queryParamsValues.distance = value || undefined;
        break;
      case InstructorFilterComponent.FieldNames.Location:
        setPlaceForLessons(value);
        queryParamsValues.placeForLessons = value.join(',') || undefined;
        break;
      case InstructorFilterComponent.FieldNames.Availability:
        setAvailability(value);
        queryParamsValues.availability = value.join(',') || undefined;
        break;
      case InstructorFilterComponent.FieldNames.Age:
        setAge(value);
        queryParamsValues.age = value || undefined;
        break;
      case InstructorFilterComponent.FieldNames.Gender:
        setGender(value);
        queryParamsValues.gender = value || undefined;
        break;
      case InstructorFilterComponent.FieldNames.Qualifications:
        setQualifications(value);
        queryParamsValues.qualifications = value.join(',') || undefined;
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
      case InstructorFilterComponent.FieldNames.Distance:
        setDistanceMobile(value);
        break;
      case 'studio':
      case 'home':
      case 'online':
        setPlaceForLessonsMobile({ ...placeForLessonsMobile, [name]: event.target.checked });
        break;
      case InstructorFilterComponent.FieldNames.Location:
        setPlaceForLessonsMobile({ ...placeForLessonsMobile, [name]: event.target.checked });
        break;
      case InstructorFilterComponent.FieldNames.Availability:
        setAvailabilityMobile(value);
        break;
      case InstructorFilterComponent.FieldNames.Age:
        setAgeMobile(value);
        break;
      case InstructorFilterComponent.FieldNames.Gender:
        setGenderMobile(value);
        break;
      case 'certifiedTeacher':
      case 'musicTherapy':
      case 'musicProduction':
      case 'earTraining':
      case 'conducting':
      case 'virtuosoRecognition':
      case 'performance':
      case 'musicTheory':
      case 'youngChildrenExperience':
      case 'repertoireSelection':
        setQualificationsMobile({ ...qualificationsMobile, [name]: event.target.checked });
        break;
      default:
        return;
    }
  };

  const handleMobileSortBy = (event: any) => {
    const target = event.target;
    const value = target.value;

    let queryParamsValues: InstructorListQueryParams = {...queryParams};
    queryParamsValues.sort = value || undefined;
    setSortBy(value);
    setQueryParams(queryParamsValues);
  };

  const handlePriceChange = (event: any, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  const setPriceQueryParams = (event: any, newValue: number | number[]) => {
    let queryParamsValues: InstructorListQueryParams = {...queryParams};
    queryParamsValues.min_rate = (newValue as number[])[0];
    queryParamsValues.max_rate = (newValue as number[])[1];
    setQueryParams(queryParamsValues);
  };

  const getLocation = (location: string)  => {
    setAddress(location);
  };

  const getLatLng = (lat: string, lng: string)  => {
    let queryParamsValues: InstructorListQueryParams = {...queryParams};
    queryParamsValues.location = `${lat},${lng}`;
    setQueryParams(queryParamsValues);
  };

  const setQueryParamsMobile = ()  => {
    let queryParamsValues: InstructorListQueryParams = {...queryParams};
    queryParamsValues.distance = distanceMobile || undefined;
    queryParamsValues.placeForLessons = _.keys(_.pickBy(placeForLessonsMobile)).join(',') || undefined;
    queryParamsValues.availability = availabilityMobile || undefined;
    queryParamsValues.gender = genderMobile || undefined;
    queryParamsValues.qualifications = _.keys(_.pickBy(qualificationsMobile)).join(',') || undefined;
    queryParamsValues.distance = distanceMobile || undefined;
    queryParamsValues.min_rate = (priceRange)[0] || undefined;
    queryParamsValues.max_rate = (priceRange)[1] || undefined;
    setQueryParams(queryParamsValues);
  };

  return (
    <ListTemplate
      pageTitle={InstructorsComponent.pageTitle}
      results={props.instructors.count}
      handleChange={handleChange}
      getLatLng={getLatLng}
      getLocation={getLocation}
      instrument={instrument}
      address={address}
      isRequesting={props.isRequesting}
      filterSection={
        <React.Fragment>
          <InstructorsFilter
            sortBy={sortBy}
            distance={distance}
            placeForLessons={placeForLessons}
            availability={availability}
            priceRange={priceRange}
            age={age}
            gender={gender}
            qualifications={qualifications}
            handleChange={handleChange}
            handlePriceChange={handlePriceChange}
            handlePriceCommitted={setPriceQueryParams}
          />
          <InstructorsFilterMobile
            sortBy={sortBy}
            distance={distanceMobile}
            placeForLessons={placeForLessonsMobile}
            availability={availabilityMobile}
            priceRange={priceRange}
            age={ageMobile}
            gender={genderMobile}
            qualifications={qualificationsMobile}
            handleChange={handleMobileChange}
            handlePriceChange={handlePriceChange}
            handleMobileSortBy={handleMobileSortBy}
            setQueryParams={setQueryParamsMobile}
          />
        </React.Fragment>
      }
      mainContent={
        <Instructors
          instructors={props.instructors.results}
          instructor={props.instructor}
          isRequestingInstructor={props.isRequestingInstructor}
          fetchInstructor={props.fetchInstructor}
        />
      }
    />
  );
};

const mapStateToProps = (state: StoreState, _ownProps: OwnProps): StateProps => {
  const {
    instructors,
    instructor,
    actions: {
      fetchInstructors: {
        isRequesting,
      },
      fetchInstructor: {
        isRequesting: isRequestingInstructor
      }
    }
  } = state.instructor;

  return {
    instructors,
    instructor,
    isRequesting,
    isRequestingInstructor
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<Action>
): DispatchProps => ({
  fetchInstructors: (params?) => dispatch(fetchInstructors(params)),
  fetchInstructor: (id: number) => dispatch(fetchInstructor(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(InstructorsList);
