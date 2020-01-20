import * as React from 'react';

import { Request } from '../../redux/models/RequestModel';
import { UserType } from '../../redux/models/UserModel';
import RequestCard from './RequestCard';

interface Props {
  requests: Request[];
  isRequesting: boolean;
  isLoggedIn: boolean;
  toggleRegisterModal: () => void;
}

const Requests: React.StatelessComponent<Props> = props => {
  return (
    <div>
      {props.requests && props.requests.map((request, i) => (
        <RequestCard key={i} request={request} isLoggedIn={props.isLoggedIn} toggleRegisterModal={props.toggleRegisterModal} />
      ))}
    </div>
  );
};

export default Requests;
