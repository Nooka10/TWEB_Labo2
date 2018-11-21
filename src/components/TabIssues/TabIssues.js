import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import TablePaginationWrapper from './TabPagination/TabPagination';
import TabHeader from './TabHeader/TabHeader';
import Issues from '../Issue/Issue';

const styles = theme => ({
  root: {
    width    : '100%',
    marginTop: theme.spacing.unit * 3
  }
});

const GET_ISSUES = gql`
    query Issues($owner: String!, $repo: String!, $state: IssueState!, $nbIssues: Int!, $order: OrderDirection!) {
        repository(owner: $owner, name: $repo) {
            issues(first: $nbIssues, states: [$state], orderBy: {field: CREATED_AT, direction: $order}) {
                edges {
                    cursor
                    node {
                        title
                        number
                        state
                        createdAt
                        comments{totalCount}
                        author {login}
                    }
                }
                totalCount
            }
        }
    }
`;

/**
 * Trie les 2 issues reçus en paramètre par date de création.
 * @param issue1
 * @param issue2
 * @returns {number}
 */
function sortByissueTime(issue1, issue2) {
  if (issue1.state === issue2.state) {
    const orderBy = 'created_at';
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
  return order === 'DESC' ? sortByissueTime(issue1, issue2) : -sortByissueTime(issue1, issue2);
}

/**
 * Fonction de comparaison utilisée pour trier les issues.
 * @param order, l'ordre du tri (asc / desc).
 * @param orderValue, la valeur actuelle du tri (ex: open / closed)
 * @param orderBy, le champ de l'issue selon lequel on souhaite effectuer le tri (ex: state pour trier selon 'open' / 'closed').
 * @returns {function(*=, *=): number}
 */
function sortFunction(order, orderValue, orderBy) {
  return orderValue === 'OPEN' ? (a, b) => sortBy(a, b, order, orderBy) : (a, b) => -sortBy(a, b, order, orderBy);
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
      order      : 'DESC',
      issueState : props.mainState.issuesState,
      orderBy    : 'state',
      page       : 0,
      rowsPerPage: 5
    };
  }

  /**
   * Fonction appelée lorsqu'on clique sur un élément du header du tableau pour trier le tableau en fonction de cet élément.
   * @param event
   * @param property
   */
  handleRequestSort = (event, property) => {
    const issueState = property;
    let order = 'DESC';
    const { issueState: stateOrderBy, order: stateOrder } = this.state;

    if (stateOrderBy === property && stateOrder === 'DESC') {
      order = 'ASC';
    }

    this.setState({ order, issueState });
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

  setIssueStateState = (issueStateMain) => {
    // FIXME: comment faire pour modifier le state sans avoir l'erreur :
    // Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state.
    this.setState({ issueState: issueStateMain });
  };

  render() {
    const { classes, mainState: { username, repo, issuesState: issueStateMain } } = this.props;
    const {
      order, orderBy, rowsPerPage, issueState, page
    } = this.state;

    if (issueStateMain !== undefined && issueState !== issueStateMain) {
      this.setIssueStateState(issueStateMain);
    }

    // FIXME: comment reset une erreur graphQL? Là, si un répertoire n'existe pas, on ne peut plus en rechercher ensuite...
    return (
      <Query
        query = {GET_ISSUES}
        variables = {{
          owner: username, repo, state: issueState, nbIssues: rowsPerPage, order
        }}
      >
        {({ loading, error, data }) => {
          if (loading) {
            return <div >Loading...</div >;
          }
          if (error) {
            return (
              <Paper className = {classes.root} >
                <div >
                  <Table >
                    <TableBody >
                      <TabHeader
                        order = {order}
                        valueOrderBy = {issueState}
                        issueState = {issueState}
                        onRequestSort = {this.handleRequestSort}
                      />
                    </TableBody >
                    <TableFooter >
                      <TableRow >
                        <TablePagination
                          count = {0}
                          rowsPerPage = {rowsPerPage}
                          page = {page}
                          onChangePage = {this.handleChangePage}
                          onChangeRowsPerPage = {this.handleChangeRowsPerPage}
                          ActionsComponent = {TablePaginationWrapper}
                        />
                      </TableRow >
                    </TableFooter >
                  </Table >
                </div >
              </Paper >
            );
          }

          const { issues } = data.repository;
          const { edges } = data.repository.issues;
          const emptyRows = rowsPerPage - Math.min(rowsPerPage, edges.length - page * rowsPerPage);

          return (
            <Paper className = {classes.root} >
              <div >
                <Table >
                  <TableBody >
                    <TabHeader
                      order = {order}
                      valueOrderBy = {issueState}
                      issueState = {issueState}
                      onRequestSort = {this.handleRequestSort}
                    />
                    {stableSort(edges, sortFunction(order, issueState, orderBy))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map(row => (
                        <TableRow key = {row.node.number} >
                          <TableCell colSpan = {2} >
                            <Issues data = {row.node} repo = {repo} repoOwner = {username} />
                          </TableCell >
                        </TableRow >
                      ))}
                    {emptyRows > 0 && (
                      <TableRow style = {{ height: 48 * emptyRows }} >
                        <TableCell colSpan = {2} />
                      </TableRow >
                    )}
                  </TableBody >
                  <TableFooter >
                    <TableRow >
                      <TablePagination
                        count = {issues.totalCount}
                        rowsPerPage = {rowsPerPage}
                        page = {page}
                        onChangePage = {this.handleChangePage}
                        onChangeRowsPerPage = {this.handleChangeRowsPerPage}
                        ActionsComponent = {TablePaginationWrapper}
                      />
                    </TableRow >
                  </TableFooter >
                </Table >
              </div >
            </Paper >
          );
        }}
      </Query >
    );
  }
}

TabIssues.propTypes = {
  classes  : PropTypes.shape().isRequired,
  mainState: PropTypes.shape(
    {
      username   : PropTypes.string.isRequired,
      repo       : PropTypes.string.isRequired,
      issuesState: PropTypes.string.isRequired
    }
  ).isRequired
};

export default withStyles(styles)(TabIssues);
