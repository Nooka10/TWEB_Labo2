import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import IssueImg from '../components/Issue/IssueIcon/IssueIcon';
import IssueComments from '../components/Issue/IssueComments/IssueComments';
import IssueTitle from '../components/Issue/IssueTitle/IssueTitle';
import Issue from '../components/Issue/Issue';
import TablePaginationActionsWrapped from '../components/TabIssues/TabPagination/TabPagination';
import PropTypes from 'prop-types';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp = {linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick = {action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => (
    <Button onClick = {action('clicked')}>
      <span role = "img" aria-label = "so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ));

storiesOf('IssueImg', module)
  .add('Closed issue', () => <IssueImg state = "closed" />)
  .add('Open issue', () => <IssueImg state = "open" />);

storiesOf('IssueComments', module)
  .add('Issue with 0 comments (n\'affiche rien)', () => <IssueComments nbComments = "0" />)
  .add('Issue with 3 comments', () => <IssueComments nbComments = "3" />)
  .add('Issue with 10 comments', () => <IssueComments nbComments = "10" />);

const dateNow = new Date();

storiesOf('IssueTitle', module)
  .add('Issue Title opened on 31.10.2018',
    () => (
      <IssueTitle data = {{
        id: '1234', title: 'Ya rien qui maaaarche!', state: 'open', user: 'Nooka10', issueTime: '20181031'
      }}
      />
    ))
  .add('Issue Title closed on 09.11.2018',
    () => (
      <IssueTitle data = {{
        id: '1234', title: 'Ya rien qui maaaarche!', state: 'closed', user: 'Nooka10', issueTime: '20181109'
      }}
      />
    ))
  .add('Issue Title opened just now',
    () => (
      <IssueTitle data = {{
        id: '1234', title: 'Ya rien qui maaaarche!', state: 'open', user: 'Nooka10', issueTime: dateNow
      }}
      />
    ));

storiesOf('Issue', module)
  .add('Issue opened on 31.10.2018 without any comment',
    () => (
      <Issue data = {{
        id          : '1234',
        title       : 'Ya rien qui maaaarche!',
        state       : 'open',
        nbComments  : '0',
        user        : 'Nooka10',
        issueTime: '20181031'
      }}
      />
    )).add('Issue closed on 09.11.2018 with 3 comments',
    () => (
      <Issue data = {{
        id          : '1234',
        title       : 'Ya rien qui maaaarche!',
        state       : 'closed',
        nbComments  : '3',
        user        : 'Nooka10',
        issueTime: '20181109'
      }}
      />
    )).add('Issue opened on 31.10.2018 with 10 comments',
    () => (
      <Issue data = {{
        id          : '1234',
        title       : 'Ya rien qui maaaarche!',
        state       : 'open',
        nbComments  : '10',
        user        : 'Nooka10',
        issueTime: dateNow
      }}
      />
    ));
