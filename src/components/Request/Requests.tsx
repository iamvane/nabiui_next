import * as React from 'react';

import { Request } from '../../redux/models/RequestModel';
import RequestCard from './RequestCard';

interface Props {
  requests: Request[];
  isRequesting: boolean;
}

const Requests: React.StatelessComponent<Props> = props => {
  return (
    <div>
      {props.requests && props.requests.map((request, i) => (
        <RequestCard key={i} request={request} />
      ))}
    </div>
  );
};

export default Requests;
