import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import Moment from 'react-moment';

const styles = {
  header: {
    flexGrow: 2,
    width         : '85%',
    justifyContent: 'center',
    alignItems    : 'center',
    fontSize : 14,
    textAlign: 'left'
  }
};

/**
 * Composant gérant le titre et le sous-titre de l'issue.
 * @param props.id, le numéro d'identifiant de l'issue.
 * @param props.title, le titre de l'issue.
 * @param props.state, l'état de l'issue (open / closed).
 * @param props.user, l'utilisateur ayant créé l'issue.
 * @param props.issueTime, la date de création (ou de clôture) de l'issue.
 * @returns {*}
 */
function IssueTitle(props) {
  const {
    classes, data: {
      id, title, state, user, issueTime
    }
  } = props;

  // Détermine le contenu du sous-titre de l'issue.
  const subTitle = (
    <Fragment >
      #
      {id}
      {(state === 'opened' ? ' Opened ' : ' Closed ')}
      {/* Calcule le temps écoulé depuis la création ou la clôture de l'issue. */}
      <Moment fromNow >{issueTime}</Moment >
      {' by '}
      {user}
    </Fragment >
  );

  return (
    <CardHeader
      className = {classes.header}
      title = {title}
      subheader = {subTitle}
    />
  );
}

IssueTitle.propTypes = {
  classes: PropTypes.shape().isRequired,
  data   : PropTypes.shape(
    {
      id       : PropTypes.number.isRequired,
      title    : PropTypes.string.isRequired,
      state    : PropTypes.string.isRequired,
      user     : PropTypes.string.isRequired,
      issueTime: PropTypes.string.isRequired
    }
  ).isRequired
};

export default withStyles(styles)(IssueTitle);
