import * as React from 'react';
import Link from 'next/link';
import { useRouter } from "next/router";

import {
  Button,
  Typography
} from '@material-ui/core';

import { getCookie } from '../../utils/cookies';

interface Props {}

/**
 * Contains the registration form fields
 */
const StudentProfileBuilder: React.StatelessComponent<Props> = props => {
  const [hbspt, setHbspt] = React.useState(typeof window !== 'undefined' && (window as any)['hbspt']);
  const isLoggedIn = getCookie('token');
  const router = useRouter();

  React.useEffect(() => {
    if (!isLoggedIn) {
      if (!hbspt) {
        setHubSpot();
        return;
      }

      hbspt.forms.create({
        portalId: '7039981',
        formId: '64989638-3b12-4ba0-a53c-4e7a2e5e50f6',
        target: '#hubspotProfileBuilder'
      });
    }
  }, [hbspt, router]);

  const setHubSpot = () => {
    const hs = typeof window !== 'undefined' && (window as any)['hbspt'];
    setHbspt(hs);
  }

  return (
    <div className="nabi-container nabi-margin-bottom-small">
      <div className="nabi-background-white nabi-section nabi-text-center">
        <div id="hubspotProfileBuilder"></div>
      </div>
    </div>
  );
};

export default StudentProfileBuilder;
