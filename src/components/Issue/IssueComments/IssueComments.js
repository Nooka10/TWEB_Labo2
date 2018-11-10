import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';

const styles = theme => ({
  cell      : {
    flexGrow: 7,
    width   : '10%',
    minWidth: 60,
    display : 'flex',
    border  : 0,
    margin  : 0,
    padding : 0
  },
  icon      : {
    margin   : theme.spacing.unit,
    fontSize : 32,
    color    : '#505050',
    textAlign: 'left'
  },
  nbComments: {
    fontSize  : 16,
    color     : '#878787',
    margin    : 'auto',
    marginLeft: 0,
    border    : 0
  }
});

/**
 * Composant gérant l'icone indiquant le nombre de commentaires de l'issue.
 * @param props.nbComments, le nombre de commentaires de l'issue.
 * @returns {*}
 */
function IssueComments(props) {
  const { classes, nbComments } = props;

  // affiche une icone de commentaire et le nombre de commentaires s'il y en a au moins 1.
  if (nbComments > 0) {
    return (
      <div className = {classes.cell}>
        <Icon aria-label = "Recipe" className = {classes.icon}>
          comment
        </Icon>
        <div className = {classes.nbComments}>
          {nbComments}
        </div>
      </div>);
  }
  // n'affiche rien sinon.
  return null;
}

IssueComments.propTypes = {
  classes   : PropTypes.shape().isRequired,
  nbComments: PropTypes.number.isRequired
};

export default withStyles(styles)(IssueComments);
