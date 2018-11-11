import React from 'react';
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
      number: id, title, state, comments: nbComments, user: userObj, created_at: issueTime
    }
  } = props;

  const { login: user } = userObj;

  const titleData = {
    id, title, state, user, issueTime
  };
  return (
    <Card>
      <CardActionArea className = {classes.cardActionArea} href = {`/${id}`} target = "_blank">
        <IssueIcon state = {state} />
        <IssueTitle data = {titleData} />
        <IssueComments nbComments = {nbComments} />
      </CardActionArea>
    </Card>
  );
}

Issue.propTypes = {
  classes: PropTypes.shape().isRequired,
  data   : PropTypes.shape(
    {
      number    : PropTypes.number.isRequired,
      title     : PropTypes.string.isRequired,
      state     : PropTypes.string.isRequired,
      comments  : PropTypes.number.isRequired,
      user      : PropTypes.shape().isRequired,
      created_at: PropTypes.string.isRequired
    }
  ).isRequired
};

export default withStyles(styles)(Issue);
