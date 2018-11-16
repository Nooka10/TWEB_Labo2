import React from 'react';
import TableRow from '@material-ui/core/TableRow/TableRow';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell/TableCell';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import TableSortLabel from '@material-ui/core/TableSortLabel/TableSortLabel';

const styles = {
  headerRow  : {
    display     : 'flex',
    alignItems  : 'center',
    paddingLeft : '5%',
    borderBottom: '1px solid rgba(224, 224, 224, 1)'
  },
  headerCells: {
    margin  : 0,
    border  : 0,
    width   : 100,
    fontSize: 16
  }
};

/**
 * Composant gérant l'entête du tableau permettant de trier les issues par état (open / closed) et par date (asc / desc).
 */
class TabHeader extends React.Component {
  createSortHandler = property => (event) => {
    const { onRequestSort } = this.props;
    onRequestSort(event, property);
  };

  render() {
    const {
      classes, order, valueOrderBy
    } = this.props;

    const rows = [
      {
        issueState: 'OPEN', numeric: false, disablePadding: false, label: 'Open'
      },
      {
        issueState: 'CLOSED', numeric: false, disablePadding: false, label: 'Closed'
      }
    ];

    return (
      <TableRow className = {classes.headerRow}>
        {rows.map(row => (
          <TableCell
            key = {row.issueState}
            numeric = {row.numeric}
            padding = {row.disablePadding ? 'none' : 'default'}
            sortDirection = {valueOrderBy === row.issueState ? order.toLowerCase() : false}
            className = {classes.headerCells}
          >
            <Tooltip
              title = "Sort"
              placement = {row.numeric ? 'bottom-end' : 'bottom-start'}
              enterDelay = {300}
            >
              <TableSortLabel
                active = {valueOrderBy === row.issueState}
                direction = {order.toLowerCase()}
                onClick = {this.createSortHandler(row.issueState)}
              >
                {row.label}
              </TableSortLabel>
            </Tooltip>
          </TableCell>
        ), this)}
      </TableRow>
    );
  }
}

TabHeader.propTypes = {
  classes      : PropTypes.shape().isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order        : PropTypes.string.isRequired,
  valueOrderBy : PropTypes.string.isRequired
};

export default withStyles(styles)(TabHeader);
