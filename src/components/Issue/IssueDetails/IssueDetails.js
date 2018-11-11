import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import ReactMarkdown from 'react-markdown';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IssueTitle from '../IssueTitle/IssueTitle';
import jsonDetailsIssue from '../../../data/issueDetails';

const styles = () => ({
  card: {
    margin: 'auto',
    width : '95%'
  }
});

class IssueDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id       : jsonDetailsIssue.number,
      body     : jsonDetailsIssue.body,
      title    : jsonDetailsIssue.title,
      issueTime: jsonDetailsIssue.created_at,
      state    : jsonDetailsIssue.state,
      user     : jsonDetailsIssue.user.login
    };
  }

  render() {
    const {
      id, body, title, issueTime, state, user
    } = this.state;
    const { classes } = this.props;

    const titleData = {
      id,
      title,
      state,
      user,
      issueTime
    };
    return (
      <Card className = {classes.card}>
        <IssueTitle
          data = {titleData}
        />
        <Divider />
        <CardContent>
          {body === '' ? ('This issue doesn\'t have a description.') : <ReactMarkdown source = {body} />}
        </CardContent>
      </Card>
    );
  }
}

IssueDetails.propTypes = {
  classes: PropTypes.shape().isRequired
};

export default withStyles(styles)(IssueDetails);
