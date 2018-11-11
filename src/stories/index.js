/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';

import { storiesOf } from '@storybook/react';
import TablePagination from '@material-ui/core/TablePagination/TablePagination';
import IssueIcon from '../components/Issue/IssueIcon/IssueIcon';
import IssueComments from '../components/Issue/IssueComments/IssueComments';
import IssueTitle from '../components/Issue/IssueTitle/IssueTitle';
import Issue from '../components/Issue/Issue';
import TabHeader from '../components/TabIssues/TabHeader/TabHeader';
import TablePaginationWrapper from '../components/TabIssues/TabPagination/TabPagination';

storiesOf('IssueComments', module)
  .add('Issue with 0 comments (n\'affiche rien)', () => <IssueComments nbComments = "0" />)
  .add('Issue with 3 comments', () => <IssueComments nbComments = "3" />)
  .add('Issue with 10 comments', () => <IssueComments nbComments = "10" />);

storiesOf('IssueIcon', module)
  .add('Closed issue', () => <IssueIcon state = "closed" />)
  .add('Open issue', () => <IssueIcon state = "open" />);

const dateNow = new Date();

storiesOf('IssueTitle', module)
  .add('Issue Title opened on 31.10.2018',
    () => (
      <IssueTitle data = {{
        issueNumber: '1234', title: 'Ya rien qui maaaarche!', state: 'open', user: 'Nooka10', issueTime: '20181031'
      }}
      />
    ))
  .add('Issue Title closed on 09.11.2018',
    () => (
      <IssueTitle data = {{
        issueNumber: '1234', title: 'Ya rien qui maaaarche!', state: 'closed', user: 'Nooka10', issueTime: '20181109'
      }}
      />
    ))
  .add('Issue Title opened just now',
    () => (
      <IssueTitle data = {{
        issueNumber: '1234', title: 'Ya rien qui maaaarche!', state: 'open', user: 'Nooka10', issueTime: dateNow
      }}
      />
    ));

storiesOf('Issue', module)
  .add('Issue opened on 31.10.2018 without any comment',
    () => (
      <Issue data = {{
        issueNumber: '1234',
        title      : 'Ya rien qui maaaarche!',
        state      : 'open',
        nbComments : '0',
        user       : 'Nooka10',
        issueTime  : '20181031'
      }}
      />
    )).add('Issue closed on 09.11.2018 with 3 comments',
    () => (
      <Issue data = {{
        issueNumber: '1234',
        title      : 'Ya rien qui maaaarche!',
        state      : 'closed',
        nbComments : '3',
        user       : 'Nooka10',
        issueTime  : '20181109'
      }}
      />
    )).add('Issue opened on 31.10.2018 with 10 comments',
    () => (
      <Issue data = {{
        issueNumber: '1234',
        title      : 'Ya rien qui maaaarche!',
        state      : 'open',
        nbComments : '10',
        user       : 'Nooka10',
        issueTime  : dateNow
      }}
      />
    ));

storiesOf('TabHeader', module)
  .add('TabHeader', () => (
    <TabHeader
      order = "asc"
      valueOrderBy = "state"
      onRequestSort = {() => 0}
    />));

let rowsPerPage = 5;
let noPage = 0;
storiesOf('TabPagination', module)
  .add('TabPagination', () => (
    <TablePagination
      colSpan = {6}
      count = {50}
      rowsPerPage = {rowsPerPage}
      page = {noPage}
      onChangePage = {(event, p) => { noPage = p; }}
      onChangeRowsPerPage = {(event) => { rowsPerPage = event.target.value; }}
      ActionsComponent = {TablePaginationWrapper}
    />));
