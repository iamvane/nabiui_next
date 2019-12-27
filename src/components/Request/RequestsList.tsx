import * as React from 'react';
import { connect } from 'react-redux';

import { StoreState } from 'redux/store';
import ListTemplate from 'components/common/Templates/ListTemplate';
import { PlaceForLessonsType } from 'components/PlaceForLessons/model';
import RequestFilter from 'components/Request/RequestsFilter';
import Requests from 'components/Request/Requests';
import { RequestsListComponent } from 'components/Request/constants';

interface OwnProps {
}

interface StateProps {
  // TODO: set to RequestType when api integration is done
  requests: any;
}

interface Props extends OwnProps, StateProps {}

interface State extends
  PlaceForLessonsType {
  instrument: string;
  zipCode: string;
  lessonDuration: string;
  sortBy: string;
  skillLevel: string;
}

export class RequestsList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      instrument: '',
      zipCode: '',
      sortBy: '',
      lessonDuration: 'Any',
      skillLevel: 'Any',
      home: false,
      studio: false,
      online: false,
    };
  }

  public handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      ...this.state,
      [name]: value,
    });
  }

  public render() {
    return (
      <div>
        <ListTemplate
          pageTitle={RequestsListComponent.pageTitle}
          results={0}
          handleChange={this.handleChange}
          instrument=""
          address=""
          hasCallToAction={true}
          getLatLng={() => console.log('foo')}
          getLocation={() => console.log('foo')}
          isRequesting={false}
          filterSection={
            <RequestFilter
              instrument={this.state.instrument}
              handleChange={this.handleChange}
              distance={this.state.distance}
              home={this.state.home}
              skillLevel={this.state.skillLevel}
              studio={this.state.studio}
              online={this.state.online}
              zipCode={this.state.zipCode}
              lessonDuration={this.state.lessonDuration}
            />
          }
          mainContent={<Requests requests={this.props.requests} />}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: StoreState, _ownProps: OwnProps): StateProps => {
  return {
    requests: state.requests.requests,
  };
};

export default connect(mapStateToProps, {})(RequestsList);
