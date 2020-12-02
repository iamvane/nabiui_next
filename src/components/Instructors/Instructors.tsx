import * as React from "react";
import {
  Action,
  Dispatch
} from 'redux';
import { ThunkAction } from 'redux-thunk';
import { connect } from 'react-redux';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getCookie, setCookie } from '../../utils/cookies';
import PageTitle from '../common/PageTitle';
import { Header } from '../Header/Header';
import {
  Instructor,
  Rates,
  InstructorListType
} from "../../redux/models/InstructorModel";
import { StoreState } from '../../redux/reducers/store';
import { pageTitlesAndDescriptions } from '../common/constants/TitlesAndDescriptions';
import { fetchInstructorsMatch } from '../../redux/actions/RequestActions';
import InstructorCard from "./InstructorCard";

interface StateProps {
  instructorsMatch: InstructorListType[];
  isFetchingInstructorsMatch: boolean;
  fetchInstructorsMatchError: string;
}

interface DispatchProps {
  fetchInstructorsMatch: (requestId: number, instuctorId: number) => void;
}

interface OwnProps {
}

interface Props extends
  StateProps,
  DispatchProps,
  OwnProps { }

export const Instructors = (props: Props) => {
  const router = useRouter();
  const instructorId = Number(router.query.instructorId);

  React.useEffect(() => {
    const requestId = router.query.requestId;

    // Set the bestMatchId cookie
    const fetchInstructors = async () => {
      props.fetchInstructorsMatch(Number(requestId), instructorId);
    }
    fetchInstructors();
  }, []);

  return (
    <div>
      {
        <React.Fragment>
          <Head>
            <title>{pageTitlesAndDescriptions.instructors.title}</title>
            <meta name="description" content={pageTitlesAndDescriptions.instructors.description}></meta>
          </Head>
          <Header />
          <div className="nabi-container nabi-margin-bottom-medium nabi-margin-top-medium">
            <PageTitle pageTitle="Featured Instructors" />
            {props.instructorsMatch?.length > 0 && props.instructorsMatch.map((instructor: InstructorListType, i: number) => (
              <InstructorCard
                key={i}
                instructor={instructor}
                bestMatchId={instructorId}
              />
            ))}
          </div>
        </React.Fragment>}
    </div>
  );
};

const mapStateToProps = (state: StoreState, _ownProps: {}): StateProps => {
  const {
    requests: {
      instructorsMatch,
      actions: {
        fetchInstructorsMatch: {
          isRequesting: isFetchingInstructorsMatch,
          error: fetchInstructorsMatchError
        },
      }
    }
  } = state;
  return {
    isFetchingInstructorsMatch,
    fetchInstructorsMatchError,
    instructorsMatch
  };
};

function mapDispatchToProps(
  dispatch: Dispatch<Action | ThunkAction<{}, {}, {}>>,
  _ownProps: OwnProps
): DispatchProps {
  return {
    fetchInstructorsMatch: (requestId: number, instructorId: number) => dispatch(fetchInstructorsMatch(requestId, instructorId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Instructors);

