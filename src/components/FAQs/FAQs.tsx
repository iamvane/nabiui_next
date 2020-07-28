import React from "react"
import Link from 'next/link';
const reactStringReplace = require('react-string-replace');
import Head from 'next/head';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import {
  parentStudentFaqs,
  instructorFaqs,
  linkReplace,
  FAQItem
} from '../../../assets/data/faqs';
import { Role } from '../../constants/Roles';
import { pageTitlesAndDescriptions } from '../common/constants/TitlesAndDescriptions';
import PageBanner from "../common/PageBanner"
import PageBannerCta from "../common/PageBannerCta"
import * as constants from './constants';
import { Routes } from '../common/constants/Routes';

interface Props {
  role: Role;
}
export const FAQs = (props: Props) => {
  const [expanded, setExpanded] = React.useState<string | false>('');
  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  const items: FAQItem[] = props.role === Role.instructor ? instructorFaqs : parentStudentFaqs;
  const description = props.role === Role.instructor ? constants.descriptionInstructor : constants.descriptionParent;
  const ctaText = props.role === Role.instructor ? constants.ctaParent : constants.ctaInstructor;
  const ctaLink = props.role === Role.instructor ? Routes.FAQParents : Routes.FAQInstructors;
  const docTitle = props.role === Role.instructor ? pageTitlesAndDescriptions.faqInstructors.title :
    pageTitlesAndDescriptions.faqParentsStudents.title;
  const docDescription = props.role === Role.instructor ? pageTitlesAndDescriptions.faqInstructors.description :
    pageTitlesAndDescriptions.faqParentsStudents.description;

  const checkAbsoulteUrl = (url: string) => {
    return url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  }

  const replaceMultipleLinkTexts = (
    linkTexts: string[], linkUrls: string[], replacementTexts: string[], answer: string
  ) => {
    let replacedText = answer;
    for (let text = 0; text < replacementTexts.length; text += 1) {
      const isAbsoluteUrl = checkAbsoulteUrl(linkUrls[text]);
      replacedText = reactStringReplace(
        replacedText,
        replacementTexts[text],
        (i: number) => (
          isAbsoluteUrl ? <a key={i} href={linkUrls[text]} target={'_blank'} rel="noreferrer">{linkTexts[text]}</a> :
          <Link key={i} href={linkUrls[text]}><a target={'_blank'} rel="noreferrer">{linkTexts[text]}</a></Link>
        )
      );
    }
    return replacedText;
  }
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
                <ExpansionPanel key={key} expanded={expanded === `panel${key}`} onChange={handleChange(`panel${key}`)}>
                  <ExpansionPanelSummary aria-controls={`panel${key}d-content`} id={`panel${key}d-header`} expandIcon={<ExpandMoreIcon />}>
                    <Typography>{item.question}</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Typography>
                      {
                        item.linkText ?
                          reactStringReplace(
                            item.answer,
                            linkReplace,
                            (i: number) => {
                              const isAbsoluteUrl = checkAbsoulteUrl(item.linkUrl);
                              const link = !isAbsoluteUrl ? <Link key={i} href={item.linkUrl}><a target={item.targetBlank && '_blank'} rel="noreferrer">{item.linkText}</a></Link> :
                              <a key={i} href={item.linkUrl} target={item.targetBlank && '_blank'} rel="noreferrer">{item.linkText}</a>
                              return link;
                            }
                          ) :
                          item.linkTexts ?
                          replaceMultipleLinkTexts(item.linkTexts, item.linkUrls, item.replacementTexts, item.answer) :
                          item.answer
                      }
                    </Typography>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              )
            })
          }
        </div>
      </div>
      <PageBannerCta description={ctaText} url={ctaLink} buttonText={constants.ctaButton} />
    </React.Fragment>
  )
}
