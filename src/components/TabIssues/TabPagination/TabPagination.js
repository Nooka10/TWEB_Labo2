import React from 'react';
import IconButton from '@material-ui/core/IconButton/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import PropTypes from 'prop-types';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { withStyles } from '@material-ui/core';

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color     : theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5
  }
});

/**
 * Composant gérant le footer du tableau contenant les boutons de pagination.
 */
function TablePaginationActions(props) {
  const {
    classes, page, theme, count, rowsPerPage, onChangePage
  } = props;

  /**
   * Fonction appelée lorsqu'on clique sur le bouton pour afficher la 1ère page de pagination.
   * @param event
   */
  function handleFirstPageButtonClick(event) {
    onChangePage(event, 0);
  }

  /**
   * Fonction appelée lorsqu'on clique sur le bouton pour afficher la page de pagination précédente.
   * @param event
   */
  function handleBackButtonClick(event) {
    onChangePage(event, page - 1);
  }

  /**
   * Fonction appelée lorsqu'on clique sur le bouton pour afficher la page de pagination suivante.
   * @param event
   */
  function handleNextButtonClick(event) {
    onChangePage(event, page + 1);
  }

  /**
   * Fonction appelée lorsqu'on clique sur le bouton pour afficher la page dernière de pagination.
   * @param event
   */
  function handleLastPageButtonClick(event) {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  }

  // FIXME: comment faire de la pagination avec graphQL?
  return (
    <div className = {classes.root}>
      <IconButton
        onClick = {handleFirstPageButtonClick}
        disabled = {page === 0}
        aria-label = "First Page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick = {handleBackButtonClick}
        disabled = {page === 0}
        aria-label = "Previous Page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick = {handleNextButtonClick}
        disabled = {page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label = "Next Page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick = {handleLastPageButtonClick}
        disabled = {page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label = "Last Page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  classes     : PropTypes.shape().isRequired,
  count       : PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page        : PropTypes.number.isRequired,
  rowsPerPage : PropTypes.number.isRequired,
  theme       : PropTypes.shape().isRequired
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions
);

export default TablePaginationActionsWrapped;
