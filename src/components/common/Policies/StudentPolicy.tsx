import * as React from 'react';
import Link from 'next/link';
import { Routes } from '../constants/Routes';

export const StudentPolicy: React.StatelessComponent<{}> = props => {
  // tslint:disable
  return (
    <div className="nabi-container">
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
          Manage all schedule details directly with your Instructor
        </li>
        <br />
        <li>
          Work directly with Nabi Music to change Instructors
        </li>
      </ul>
      For your reference, <Link href={Routes.InstructorPolicy}>here are the Instructors guidelines</Link> that your instructors are required to follow.

    </div>
  )
};