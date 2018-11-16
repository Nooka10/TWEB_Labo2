import React, { Component } from 'react';

import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import SearchBar from '../SearchBar/SearchBar';
import TabIssues from '../TabIssues/TabIssues';

const styles = theme => ({
  root: {
    width      : '95%',
    marginTop  : theme.spacing.unit * 3,
    marginLeft : '2.5%',
    marginRight: '2.5%'
  }
});

/**
 * Classe pour la page principale permettant de rechercher différentes issues
 */
class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username       : 'facebook',
      repo           : 'create-react-app',
      issuesState    : 'OPEN',
      firstSearchDone: false
    };

    this.setMainState = this.setMainState.bind(this);
  }

  setMainState(newState) {
    this.setState(newState);
  }

  render() {
    const { classes } = this.props;
    const { firstSearchDone } = this.state;
    return (
      <div className = {classes.root}>
        <SearchBar setMainState = {this.setMainState} mainState = {this.state} />
        {firstSearchDone && <TabIssues mainState = {this.state} />}
      </div>
    );
  }
}

Page.propTypes = {
  classes: PropTypes.shape().isRequired
};

export default withStyles(styles)(Page);
