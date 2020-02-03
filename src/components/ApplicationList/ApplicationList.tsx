import * as React from 'react';
import moment from 'moment';
import {
  Action,
  Dispatch
} from 'redux';
import { ThunkAction } from 'redux-thunk';
import { connect } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';

import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import PageTitle from '../common/PageTitle';
import { Routes } from '../common/constants/Routes';
import { pageTitlesAndDescriptions } from '../common/constants/TitlesAndDescriptions';
import { StoreState } from '../../redux/reducers/store';
import { setPathname } from '../../redux/actions/UserActions';
import { fetchApplicationList } from '../../redux/actions/RequestActions';
import {
  Application,
  ApplicationListType
} from './model';
import { ApplicationListComponent } from './constants';
import ApplicationCard from './ApplicationCard';

interface StateProps {
  applicationList: ApplicationListType;
  error: string;
  isRequesting: boolean;
}

interface DispatchProps {
  fetchApplicationList: (id: number) => void;
  setPathname: (pathname: string) => void;
}

interface OwnProps { }

interface Props extends
  StateProps,
  DispatchProps { }

export const ApplicationList = (props: Props) => {
  const router = useRouter();
  const id = Number(router.query.id);

  React.useEffect(() => {
    const fetchData = async () => {
      if (id) {
        await props.fetchApplicationList(id);
      }
    };
    fetchData();
    props.setPathname(router.asPath);
    /* tslint:disable */
  }, []);

  return (
    <div className="nabi-container">
      <Head>
        <title>{pageTitlesAndDescriptions.applicationList.title}</title>
        <meta name="description" content={pageTitlesAndDescriptions.applicationList.description}></meta>
      </Head>
      <PageTitle pageTitle={ApplicationListComponent.pageTitle} />
      {props.isRequesting ? <div className="nabi-text-center"><CircularProgress /></div> :
      <React.Fragment>
        <Breadcrumbs aria-label="breadcrumb">
          <Link  href={Routes.Dashboard}>
            <a>{ApplicationListComponent.breadcrumbLabels.home}</a>
          </Link>
          <Typography> {ApplicationListComponent.breadcrumbLabels.applications}</Typography>
        </Breadcrumbs>
        <div className="nabi-section nabi-margin-top-xsmall nabi-padding-top-small nabi-padding-bottom-small nabi-margin-bottom-small nabi-background-white nabi-text-center">
          <p className="nabi-text-normalbold nabi-color-nabi nabi-margin-remove nabi-jennasue-title">
            {props.applicationList.requestTitle}
          </p>
          <Typography className="nabi-margin-top-xsmall">{moment(props.applicationList.dateCreated).format("MMM Do YYYY")}</Typography>
        </div>
        <Typography
          color="primary"
          className="nabi-margin-top-small nabi-margin-bottom-small nabi-text-center nabi-text-mediumbold"
        >
          {props.applicationList.applications.length} result(s)
        </Typography>
        {props.applicationList.applications.map((item: Application, i: number) =>
          <ApplicationCard key={i} application={item} />
        )}
      </React.Fragment>}
    </div>
  )
}

const mapStateToProps = (state: StoreState, _ownProps: {}): StateProps => {
  const {
    applicationList,
    actions: {
      fetchApplicationList: {
        isRequesting,
        error
      }
    }
  } = state.requests;
  return {
    applicationList,
    isRequesting,
    error
  };
};

function mapDispatchToProps(
  dispatch: Dispatch<Action | ThunkAction<{}, {}, {}>>,
  _ownProps: OwnProps
): DispatchProps {
  return {
    fetchApplicationList: (id: number) => dispatch(fetchApplicationList(id)),
    setPathname: (pathname: string) => dispatch(setPathname(pathname))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationList);
