import * as React from 'react';
import Link from 'next/link';
import Head from 'next/head';

import { Routes } from '../constants/Routes';
import { pageTitlesAndDescriptions } from '../constants/TitlesAndDescriptions';

export const InstructorPolicy: React.StatelessComponent<{}> = props => {
  // tslint:disable
  return (
    <div className="nabi-container">
      <Head>
        <title>{pageTitlesAndDescriptions.instructorPolicy.title}</title>
        <meta name="description" content={pageTitlesAndDescriptions.instructorPolicy.description}></meta>
      </Head>
      At Nabi Music, both instructors and students are required to follow certain guidelines when using our Website and Service(s).
      <h5>As an Instructor, you are required to:</h5>
      <ul>
        <li>
          Let Nabi Music handle the billing for all lessons (initial and subsequent lessons) for all students provided by Nabi Music, for as long as you work with them
        </li>
        <br />
        <li>
          Maintain accurate information regarding location, availability and services offered
        </li>
        <br />
        <li>
          Render services at the rate established at the time of booking
        </li>
        <br />
        <li>
          Honor scheduling agreements between you and your students
        </li>
        <br />
        <li>
          Not possess, use, sell, or be under the influence of alcohol or drugs while conducting instruction 
        </li>
      </ul>
      <h5>As an Instructor, you are encouraged to:</h5>
      <ul>
        <li>
          Address all schedule details directly with your Students
        </li>
        <br />
        <li>
          Notify Nabi Music if your Student misses more than 3 consecutive lessons in a row
        </li>
        <br />
        <li>
          Alert Nabi Music if your Student is having any trouble with billing that we can assist with
        </li>
      </ul>
      <h5>You also agree that:</h5>
      <ul>
        <li>
          Your relationship with us is that of an independent contractor, and nothing in these Guidelines, the <Link href={Routes.TermsOfUse}>Terms of Use</Link>, or any agreement is intended to, or shall be construed to create a partnership, agency, joint venture, employment or similar relationship between you and us.
        </li>
        <br />
        <li>
          You will not list personal information on your teaching profile, such as your last name, phone number, email address and/or links to other websites.
        </li>
        <br />
        <li>
          You are not entitled to any of the benefits that we may make available to our employees, such as group health or life insurance, profit-sharing or retirement benefits.
        </li>
        <br />
        <li>
          You are not authorized to make any representation, contract, or commitment on our behalf unless specifically requested or authorized by us in writing to do so.
        </li>
        <br />
        <li>
          You are solely responsible for, and will file on a timely basis, all tax returns and payments required to be filed with, or made to, any federal, state or local tax authority with respect to the performance of the services and receipt of compensation from us.
        </li>
        <br />
        <li>
          No part of your compensation will be subject to withholding by us for the payment of any social security, federal, state or any other employee payroll taxes. We will regularly report amounts paid to you by filing Form 1099MISC with the Internal Revenue Service as required by law.
        </li>
        <br />
        <li>
          You will accurately mark lessons in your Nabi Music account after lessons are complete in order to receive payment for those lessons
        </li>
        <br />
        <li>
          You will observe all anti-harassment and non-discrimination laws in the performance of your services.
        </li>
        <br />
        <li>
          For your reference, <Link href={Routes.StudentPolicy}>here are our Student and Parent guidelines</Link> that students and parents are required to follow.
        </li>
      </ul>
    </div>
  )
};
