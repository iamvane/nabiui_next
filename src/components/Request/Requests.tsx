import * as React from 'react';

import { RequestType } from './models';
import RequestCard from './RequestCard';

interface Props {
  requests: RequestType[];
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
