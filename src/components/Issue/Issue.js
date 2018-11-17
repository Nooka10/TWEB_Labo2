import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import IssueComments from './IssueComments/IssueComments';
import IssueIcon from './IssueIcon/IssueIcon';
import IssueTitle from './IssueTitle/IssueTitle';

const styles = {
  cardActionArea: {
    width  : '100%',
    display: 'flex'
  },
  link          : {

  }
};

/**
 * Composant gérant l'afficahge d'une issue (correspondant à une ligne du tableau TabIssue).
 * @param props.issueNumber, le numéro d'identifiant de l'issue.
 * @param props.title, le titre de l'issue.
 * @param props.state, l'état de l'issue (open / closed).
 * @param props.nbComments, le nombre de commentaires de l'issue.
 * @param props.user, l'utilisateur ayant créé l'issue.
 * @param props.issueTime, la date de création (ou de clôture) de l'issue.
 * @returns {*}
 */
function Issue(props) {
  const {
    classes,
    data: {
      number: id, title, state, comments: { totalCount: nbComments }, author: { login: user }, createdAt: issueTime
    },
    repo,
    repoOwner
  } = props;

  const titleData = {
    id, title, state, user, issueTime
  };
  return (
    <Link to = {`/${repoOwner}/${repo}/${id}`} target = "_blank" className = {classes.link} style={{ textDecoration: 'none' }}>
      <Card>
        <CardActionArea className = {classes.cardActionArea}>
          <IssueIcon state = {state} />
          <IssueTitle data = {titleData} />
          <IssueComments nbComments = {nbComments} />
        </CardActionArea>
      </Card>
    </Link>
  );
}

Issue.propTypes = {
  classes  : PropTypes.shape().isRequired,
  data     : PropTypes.shape(
    {
      author   : PropTypes.shape(
        {
          login: PropTypes.string.isRequired
        }
      ).isRequired,
      comments : PropTypes.shape(
        {
          totalCount: PropTypes.number.isRequired
        }
      ).isRequired,
      createdAt: PropTypes.string.isRequired,
      number   : PropTypes.number.isRequired,
      state    : PropTypes.string.isRequired,
      title    : PropTypes.string.isRequired
    }
  ).isRequired,
  repo     : PropTypes.string.isRequired,
  repoOwner: PropTypes.string.isRequired
};

export default withStyles(styles)(Issue);
