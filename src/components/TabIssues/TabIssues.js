import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import TablePaginationWrapper from './TabPagination/TabPagination';
import TabHeader from './TabHeader/TabHeader';
import Issues from '../Issue/Issue';

const styles = theme => ({
  root        : {
    width      : '95%',
    marginTop  : theme.spacing.unit * 3,
    marginLeft : '2.5%',
    marginRight: '2.5%'
  },
  table       : {
    minWidth: 500
  },
  tableWrapper: {
    overflowX: 'auto'
  }
});

/**
 * Trie les 2 issues reçus en paramètre par date de création.
 * @param issue1
 * @param issue2
 * @returns {number}
 */
function sortByissueTime(issue1, issue2) {
  if (issue1.state === issue2.state) {
    const orderBy = 'issueTime';
    if (issue2[orderBy] < issue1[orderBy]) {
      return -1;
    }
    if (issue2[orderBy] > issue1[orderBy]) {
      return 1;
    }
  }
  return 0;
}

/**
 * Trie les 2 issues reçues en paramètre selon leur champ 'orderBy', dans l'ordre 'order' (asc/desc)
 * @param issue1
 * @param issue2
 * @param order, l'ordre du tri (asc / desc).
 * @param orderBy, le champ de l'issue selon lequel on souhaite effectuer le tri (ex: state pour trier selon 'open' / 'closed').
 * @returns {number}
 */
function sortBy(issue1, issue2, order, orderBy) {
  if (issue2[orderBy] < issue1[orderBy]) {
    return -1;
  }
  if (issue2[orderBy] > issue1[orderBy]) {
    return 1;
  }

  // a et b ont la même valeur pour le champ 'orderBy' ---> on les trie par date de création
  return order === 'desc' ? sortByissueTime(issue1, issue2) : -sortByissueTime(issue1, issue2);
}

/**
 * Fonction de comparaison utilisée pour trier les issues.
 * @param order, l'ordre du tri (asc / desc).
 * @param orderValue, la valeur actuelle du tri (ex: open / closed)
 * @param orderBy, le champ de l'issue selon lequel on souhaite effectuer le tri (ex: state pour trier selon 'open' / 'closed').
 * @returns {function(*=, *=): number}
 */
function sortFunction(order, orderValue, orderBy) {
  return orderValue === 'open' ? (a, b) => sortBy(a, b, order, orderBy) : (a, b) => -sortBy(a, b, order, orderBy);
}

/**
 * Effectue le tri du tableau 'array' selon la fonction de comparaison 'cmp'.
 * @param array, le tableau à trier.
 * @param cmp, la fonction de comparaison à utiliser pour trier le tableau
 * @returns {*}
 */
function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) {
      return order;
    }

    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

/**
 * Composant gérant le tableau d'issues.
 */
class TabIssues extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows        : [
        {
          id          : 0,
          title       : 'Issue Title',
          state       : 'open',
          nbComments  : 5,
          user        : 'Ovolo',
          issueTime: '20181031'
        },
        {
          id          : 1,
          title       : 'Koch Becker',
          state       : 'closed',
          nbComments  : 1,
          user        : 'Eventage',
          issueTime: '20181030'
        },
        {
          id          : 2,
          title       : 'Lowery Hopkins',
          state       : 'closed',
          nbComments  : 0,
          user        : 'Comtext',
          issueTime: '20181102'
        },
        {
          id          : 3,
          title       : 'Walters Mays',
          state       : 'open',
          nbComments  : 0,
          user        : 'Corporana',
          issueTime: '20171112'
        },
        {
          id          : 4,
          title       : 'Shaw Lowe',
          state       : 'closed',
          nbComments  : 3,
          user        : 'Isologica',
          issueTime: '20180402'
        },
        {
          id          : 5,
          title       : 'Mayer Leonard',
          state       : 'open',
          nbComments  : 5,
          user        : 'Ovolo',
          issueTime: '20181102'
        },
        {
          id          : 6,
          title       : 'Koch Becker',
          state       : 'open',
          nbComments  : 0,
          user        : 'Eventage',
          issueTime: '20180802'
        },
        {
          id          : 7,
          title       : 'Lowery Hopkins',
          state       : 'closed',
          nbComments  : 5,
          user        : 'Comtext',
          issueTime: '20180920'
        },
        {
          id          : 8,
          title       : 'Walters Mays',
          state       : 'closed',
          nbComments  : 4,
          user        : 'Corporana',
          issueTime: '20180812'
        },
        {
          id          : 9,
          title       : 'Shaw Lowe',
          state       : 'closed',
          nbComments  : 9,
          user        : 'Isologica',
          issueTime: '20181109'
        }
      ],
      order       : 'desc',
      valueOrderBy: 'open',
      orderBy     : 'state',
      page        : 0,
      rowsPerPage : 5
    };
  }

  /**
   * Fonction appelée lorsqu'on clique sur un élément du header du tableau pour trier le tableau en fonction de cet élément.
   * @param event
   * @param property
   */
  handleRequestSort = (event, property) => {
    const valueOrderBy = property;
    let order = 'desc';
    const { valueOrderBy: stateOrderBy, order: stateOrder } = this.state;

    if (stateOrderBy === property && stateOrder === 'desc') {
      order = 'asc';
    }

    this.setState({ order, valueOrderBy });
  };

  /**
   * Fonction appelée lorsqu'on change de page à l'aide des boutons de pagination du footer du tableau.
   * @param event
   * @param page
   */
  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  /**
   * Fonction appelée lorsqu'on change, dans le footer du tableau, le nombre d'éléments à afficher dans le tableau.
   * @param event
   */
  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const {
      rows, order, orderBy, valueOrderBy, rowsPerPage, page
    } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
      <Paper className = {styles.root}>
        <div className = {styles.tableWrapper}>
          <Table className = {styles.table}>
            <TabHeader
              order = {order}
              valueOrderBy = {valueOrderBy}
              onRequestSort = {this.handleRequestSort}
            />

            <TableBody>
              {stableSort(rows, sortFunction(order, valueOrderBy, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => (
                  <TableRow key = {row.id}>
                    <Issues data = {row} />
                  </TableRow>
                ))}
              {emptyRows > 0 && (
                <TableRow style = {{ height: 48 * emptyRows }}>
                  <TableCell colSpan = {3} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan = {3}
                  count = {rows.length}
                  rowsPerPage = {rowsPerPage}
                  page = {page}
                  onChangePage = {this.handleChangePage}
                  onChangeRowsPerPage = {this.handleChangeRowsPerPage}
                  ActionsComponent = {TablePaginationWrapper}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(TabIssues);
