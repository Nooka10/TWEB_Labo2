import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  textField  : {
    marginLeft : theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  button     : {
    margin: 20
  },
  rightIcon  : {
    marginLeft: theme.spacing.unit
  },
  formControl: {
    marginTop   : theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit,
    minWidth    : 180
  }
});

/**
 * Classe pour la barre de recherche
 */
class SearchBar extends Component {
  constructor(props) {
    super(props);
    const { mainState: { username, repo, issuesState } } = this.props;
    this.state = { username, repo, issuesState };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    if (event.target.name === 'state') {
      this.setState({ issuesState: event.target.value });
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  };

  render() {
    const { username, repo, issuesState } = this.state;
    const { classes, setMainState } = this.props;

    return (
      <div>
        <TextField
          id = "standard-username"
          className = {classes.textField}
          label = "Username"
          name = "username"
          value = {username}
          margin = "normal"
          onChange = {event => this.handleChange(event)}
        />
        <TextField
          id = "standard-repo"
          className = {classes.textField}
          label = "Repo"
          name = "repo"
          value = {repo}
          margin = "normal"
          onChange = {event => this.handleChange(event)}
        />

        <FormControl className = {classes.formControl}>
          <InputLabel shrink htmlFor = "age-label-placeholder">
            {'State (Open / Closed)'}
          </InputLabel>
          <Select
            value = {issuesState}
            input = {<Input name = "state" id = "age-label-placeholder" />}
            displayEmpty
            name = "state"
            className = {classes.selectEmpty}
            onChange = {event => this.handleChange(event)}
          >
            <MenuItem value = "OPEN">Open</MenuItem>
            <MenuItem value = "CLOSED">Closed</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant = "outlined"
          color = "default"
          className = {classes.button}
          onClick = {() => setMainState({ username, repo, issuesState, firstSearchDone: true })}
        >
          {'Search'}
          <SearchIcon className = {classes.rightIcon} />
        </Button>
      </div>
    );
  }
}

SearchBar.propTypes = {
  classes     : PropTypes.shape().isRequired,
  setMainState: PropTypes.func.isRequired,
  mainState   : PropTypes.shape(
    {
      username   : PropTypes.string.isRequired,
      repo       : PropTypes.string.isRequired,
      issuesState: PropTypes.string.isRequired
    }
  ).isRequired
};

export default withStyles(styles)(SearchBar);
