import * as React from 'react';

import { Request } from '../../redux/models/RequestModel';
import { UserType } from '../../redux/models/UserModel';
import RequestCard from './RequestCard';

interface Props {
  requests: Request[];
  isRequesting: boolean;
  user: UserType
  toggleRegisterModal: () => void;
}

const Requests: React.StatelessComponent<Props> = props => {
  return (
    <div>
      {props.requests && props.requests.map((request, i) => (
        <RequestCard key={i} request={request} user={props.user} toggleRegisterModal={props.toggleRegisterModal} />
      ))}
    </div>
  );
};

export default Requests;
