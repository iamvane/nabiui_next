import * as React from 'react';
import moment from 'moment';
const reactStringReplace = require('react-string-replace');

import {
  Typography
} from '@material-ui/core';

import SectionTitle from '../common/SectionTitle';
import { RequestViewComponent } from './constants';

interface Props {
  // TODO: set to ApplicationType on api integration
  application: any;
}

const RequestApplied: React.StatelessComponent<Props> = props => {
  const rateReplaceAmount = RequestViewComponent.applicationRate.replace(
    RequestViewComponent.ratePlaceholder,
    props.application.rate
  );

  const rateReplaceText = reactStringReplace(
    rateReplaceAmount,
    RequestViewComponent.rateTextPlaceholder,
    (i: number) => (
      <span key={i} className="nabi-text-uppercase nabi-text-mediumbold">{RequestViewComponent.rate}</span>
    )
  );

  return (
    <React.Fragment>
      <SectionTitle text={RequestViewComponent.applicationDate} />
      <Typography className="nabi-margin-bottom-small">{moment(props.application.dateApplied).format("MMM Do YYYY")}</Typography>
      <SectionTitle text={RequestViewComponent.application} />
      <Typography className="nabi-margin-bottom-xsmall">
        {rateReplaceText}
      </Typography>
      <Typography className="nabi-margin-bottom-xsmall">
        <span className="nabi-text-uppercase nabi-text-mediumbold">
          {RequestViewComponent.message}
        </span>
      </Typography>
      <Typography>{props.application.message}</Typography>
    </React.Fragment>
  );
};

export default RequestApplied;
