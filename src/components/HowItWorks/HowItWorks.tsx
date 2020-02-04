import React from "react"
import Link from 'next/link';
import Head from 'next/head';
const reactStringReplace = require('react-string-replace');

import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar'

import '../../../assets/scss/HowItWorks.scss';

import { Role } from '../../constants/Roles';
import PageBanner from "../common/PageBanner"
import PageBannerCta from "../common/PageBannerCta"
import * as constants from './constants';
import { Routes } from '../common/constants/Routes';
import { pageTitlesAndDescriptions } from '../common/constants/TitlesAndDescriptions';

interface Props {
  role: Role;
}
export const HowItWorks = (props: Props) => {
  const items = props.role === Role.instructor ? constants.howItWorksInstructor : constants.howItWorksParentStudent;
  const description = props.role === Role.instructor ? constants.descriptionInstructor : constants.descriptionParent;
  const ctaText = props.role === Role.instructor ? constants.ctaParent : constants.ctaInstructor;
  const ctaLink = props.role === Role.instructor ? Routes.HowItWorksParents : Routes.HowItWorksInstructors;
  const docTitle = props.role === Role.instructor ? pageTitlesAndDescriptions.howItWorksInstructors.title :
    pageTitlesAndDescriptions.howItWorksParentsStudents.title;
  const docDescription =  props.role === Role.instructor ? pageTitlesAndDescriptions.howItWorksInstructors.description :
    pageTitlesAndDescriptions.howItWorksParentsStudents.description;

  return (
    <React.Fragment>
       <Head>
        <title>{docTitle}</title>
        <meta name="description" content={docDescription}></meta>
      </Head>
      <PageBanner title={constants.pageTitle} description={description} />
      <div className="nabi-container">
        <div className="nabi-background-white nabi-section nabi-margin-top-large nabi-margin-bottom-large nabi-border-radius">
          {
            items.map((item, key) => {
              return (
                <Grid container={true} key={key} className="nabi-margin-bottom-large nabi-text-center nabi-text-left-md">
                  <Grid item={true} xs={12} md={8} className="nabi-padding-top-small">
                    <p className="nabi-text-semibold nabi-font-medium">{item.stepTitle}</p>
                    <p className="nabi-font-medium">
                      {
                        item.linkText ?
                          reactStringReplace(
                            item.stepDescription,
                            constants.linkReplace,
                            (i: number) => (
                              <Link key={i} href={item.linkUrl}><a>{item.linkText}</a></Link>
                            )
                          ):
                          item.stepDescription
                        }
                    </p>
                  </Grid>
                  <Grid item={true} xs={12} md={2}>
                    <Avatar alt={item.stepTitle} src={item.image} className="how-it-works-avatar nabi-display-inline-block" />
                  </Grid>
                </Grid>
              )
            })
          }
        </div>
      </div>
      <PageBannerCta description={ctaText} url={ctaLink} buttonText={constants.ctaButton} />
    </React.Fragment>
 )
}
