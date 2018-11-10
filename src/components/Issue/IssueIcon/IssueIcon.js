import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import Avatar from '@material-ui/core/Avatar/Avatar';
import Icon from '@material-ui/core/Icon';

const styles = {
  avatar: {
    flexGrow       : 1,
    width          : '5%',
    minWidth       : 60,
    backgroundColor: 'white',
    padding         : '2%'
  },
  opened: {
    color   : green[500],
    fontSize: 30,
    style   : 'small'
  },
  closed: {
    color   : red[500],
    fontSize: 30,
    style   : 'round'
  }
};

/**
 * Composant gérant l'icone de l'issue.
 * @param props.state, l'état de l'issue (open / closed).
 * @returns {*}
 */
function IssueIcon(props) {
  const { classes, state } = props;

  // affiche une icone verte avec un point d'exclamation si l'issue est open.
  if (state === 'open') {
    return (
      <Avatar aria-label = "Recipe" className = {classes.avatar}>
        <Icon aria-label = "Recipe" className = {classes.opened}>error_outline</Icon>
      </Avatar>
    );
  }

  // affiche une icone rouge avec un vu si l'issue est closed.
  if (state === 'closed') {
    return (
      <Avatar aria-label = "Recipe" className = {classes.avatar}>
        <Icon aria-label = "Recipe" className = {classes.closed}>check_circle_outline</Icon>
      </Avatar>);
  }

  // lève une erreur si le state est pas égal à 'open' ou à 'closed'.
  throw new Error(`Invalid state! Must be equal to 'open' or 'closed'. Was ${state}`);
}

IssueIcon.propTypes = {
  classes: PropTypes.shape().isRequired,
  state  : PropTypes.string.isRequired
};

export default withStyles(styles)(IssueIcon);
