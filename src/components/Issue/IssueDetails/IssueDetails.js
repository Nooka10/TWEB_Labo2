import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import ReactMarkdown from 'react-markdown';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import IssueTitle from '../IssueTitle/IssueTitle';

const styles = () => ({
  card: {
    margin: 'auto',
    width : '95%'
  }
});

// Récupère les détails d'une issue grâce à Apollo
const GET_ISSUE_DETAILS = gql`
    query RepoIssues($user: String!, $repo: String!, $number: Int!) {
        repository(owner: $user, name: $repo) {
            issue(number: $number) {
                title
                author{login}
                createdAt
                body
                state
            }
        }
    }
`;

function IssueDetails(props) {
  const { classes, match: { params } } = props;
  const { user, repo, numberIssue } = params;
  const number = parseInt(numberIssue, 10);

  return (
    <Query
      query = {GET_ISSUE_DETAILS}
      variables = {{ user, repo, number }}
    >
      {({ loading, error, data }) => {
        if (loading) {
          return <div>Loading...</div>;
        }
        if (error) {
          return <div>Sorry, an error occurs or this issue do not exist... :(</div>;
        }
        const {
          title, author: { login: userLogin }, createdAt: issueTime, state, body
        } = data.repository.issue;
        const titleData = {
          number,
          title,
          state,
          user: userLogin,
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
      }}
    </Query>
  );
}

IssueDetails.propTypes = {
  classes: PropTypes.shape().isRequired,
  match  : PropTypes.shape().isRequired
};

export default withStyles(styles)(IssueDetails);
