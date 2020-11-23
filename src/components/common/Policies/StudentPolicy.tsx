import * as React from 'react';
import Link from 'next/link';
import Head from 'next/head';

import { Routes } from '../constants/Routes';
import { pageTitlesAndDescriptions } from '../constants/TitlesAndDescriptions';
import { Header } from '../../Header/Header';
import { Footer } from "../../common/Footer";

export const StudentPolicy: React.StatelessComponent<{}> = props => {
  // tslint:disable
  return (
    <div className="nabi-container">
      <div className="nabi-section nabi-background-white nabi-margin-bottom-medium">
        <Head>
          <title>{pageTitlesAndDescriptions.studentPolicy.title}</title>
          <meta name="description" content={pageTitlesAndDescriptions.studentPolicy.description}></meta>
        </Head>
        <Header />
        At Nabi Muisc, we encourage both teachers and students follow certain guidelines. These guidelines supplement our Terms of Use and are conditional to the use of our Website and Service(s).
        <h5>As a Student or Parent, you will be required to:</h5>
        <ul>
          <li>
            Pay for lessons in advance and manage billing & account status via your Nabi Music account
          </li>
          <br />
          <li>
            Understand and comply with our refund policy
          </li>
          <br />
          <li>
            Manage all schedule details directly with your Nabi Music
          </li>
          <br />
          <li>
            Work directly with Nabi Music to change Instructors
          </li>
        </ul>
        <h5>Scheduling policy:</h5>
          You must reschedule a class at least 12 hours in advance of the scheduled class to avoid missing a class. A missed class cannot be refunded.
          <br />
          <br />
          For your reference, <Link href={Routes.InstructorPolicy}><a>here are the Instructors guidelines</a></Link> that your instructors are required to follow.
      </div>
      <Footer />
    </div>
  )
};
