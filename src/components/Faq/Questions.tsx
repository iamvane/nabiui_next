import React from "react";
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';

const ExpansionPanel = withStyles({
    root: {

        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
    root: {
        backgroundColor: 'rgba(255, 255, 255, .03)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: 1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiExpansionPanelDetails);



const questionList = [
    {
        question: "What age does my child needs to be?",
        answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, 
                sit amet blandit leo lobortis eget.Lorem ipsum dolor sit amet, consectetur adipiscing
                elit.Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.`
    },
    {
        question: "What are the prices? / How much is the lesson?",
        answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, 
                sit amet blandit leo lobortis eget.Lorem ipsum dolor sit amet, consectetur adipiscing
                elit.Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.`
    },
    {
        question: "What are the teaching locations?",
        answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, 
                sit amet blandit leo lobortis eget.Lorem ipsum dolor sit amet, consectetur adipiscing
                elit.Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.`
    },
    {
        question: "Does Nabi provide group lessons? ",
        answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, 
                sit amet blandit leo lobortis eget.Lorem ipsum dolor sit amet, consectetur adipiscing
                elit.Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.`
    },
    {
        question: "Does Nabi run backgroud checks on instructors? ",
        answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, 
                sit amet blandit leo lobortis eget.Lorem ipsum dolor sit amet, consectetur adipiscing
                elit.Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.`
    },
    {
        question: "How does Nabi vet instructors?",
        answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, 
                sit amet blandit leo lobortis eget.Lorem ipsum dolor sit amet, consectetur adipiscing
                elit.Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.`
    },
    {
        question: "Does Nabi have a free trial?",
        answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, 
                sit amet blandit leo lobortis eget.Lorem ipsum dolor sit amet, consectetur adipiscing
                elit.Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.`
    },
    {
        question: "Can I take lessons at home?",
        answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, 
                sit amet blandit leo lobortis eget.Lorem ipsum dolor sit amet, consectetur adipiscing
                elit.Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.`
    },
    {
        question: "Does Nabi provide lessons for adults?",
        answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, 
                sit amet blandit leo lobortis eget.Lorem ipsum dolor sit amet, consectetur adipiscing
                elit.Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.`
    },
    {
        question: "Does Nabi provide lessons for adults?",
        answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, 
                sit amet blandit leo lobortis eget.Lorem ipsum dolor sit amet, consectetur adipiscing
                elit.Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.`
    },
];

const Questions = () => {
    const [expanded, setExpanded] = React.useState<string | false>('panel0');

    const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false);
    };



    return (<React.Fragment>
        <div className="questions-box">
            {
                questionList.map(function (item, key) {
                    return (
                        <>
                            <ExpansionPanel key={key} square expanded={expanded === `panel${key}`} onChange={handleChange(`panel${key}`)}>
                                <ExpansionPanelSummary aria-controls={`panel${key}d-content`} id={`panel${key}d-header`}>
                                    <Typography>{item.question}</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Typography>
                                        {item.answer}
                                    </Typography>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </>
                    )
                })
            }

        </div>

        <style jsx>{`                
                .questions-box{
                    width: 50%;
                    margin:auto;
                    margin-top: 40px;
                    margin-bottom: 40px;
                    height: auto;
                    background: white;
                    border-radius: 5px;
                    box-shadow: -1px 1px 3px 2px rgba(0, 0, 0, 0.2);
                    padding: 10px 60px 10px 60px
                }                
            
            `}
        </style>

    </React.Fragment >)
}

export default Questions