import React from 'react';
import TableRow from '@material-ui/core/TableRow/TableRow';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import TableHead from '@material-ui/core/TableHead/TableHead';
import TableCell from '@material-ui/core/TableCell/TableCell';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import TableSortLabel from '@material-ui/core/TableSortLabel/TableSortLabel';

const styles = theme => ({
  card      : {
    minWidth: 275
  },
  headerCell: {
    border: 0
  }
});

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
        id: 'open', numeric: false, disablePadding: false, label: 'Open'
      },
      {
        id: 'closed', numeric: false, disablePadding: false, label: 'Closed'
      }
    ];

    return (
      <TableHead>
        <TableRow>
          <TableCell className = {classes.headerCell}>
            {rows.map(row => (
              <TableCell
                key = {row.id}
                numeric = {row.numeric}
                padding = {row.disablePadding ? 'none' : 'default'}
                sortDirection = {valueOrderBy === row.id ? order : false}
                className = {classes.headerCell}
              >
                <Tooltip
                  title = "Sort"
                  placement = {row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay = {300}
                >
                  <TableSortLabel
                    active = {valueOrderBy === row.id}
                    direction = {order}
                    onClick = {this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ), this)}
          </TableCell>
        </TableRow>
      </TableHead>
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
