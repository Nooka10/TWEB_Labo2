import React from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react';
import IssueIcon from '../components/Issue/IssueIcon/IssueIcon';
import IssueComments from '../components/Issue/IssueComments/IssueComments';
import IssueTitle from '../components/Issue/IssueTitle/IssueTitle';

storiesOf('IssueComments', module)
  .add('Issue with 0 comments (n\'affiche rien)', () => <IssueComments nbComments = "0" />)
  .add('Issue with 3 comments', () => <IssueComments nbComments = "3" />)
  .add('Issue with 10 comments', () => <IssueComments nbComments = "10" />);

storiesOf('IssueIcon', module)
  .add('Closed issue', () => <IssueIcon state = "CLOSED" />)
  .add('Open issue', () => <IssueIcon state = "OPEN" />);

const dateNow = new Date();

storiesOf('IssueTitle', module)
  .add('Issue Title opened on 31.10.2018',
    () => (
      <IssueTitle data = {{
        issueNumber: '1234', title: 'Ya rien qui maaaarche!', state: 'OPEN', user: 'Nooka10', issueTime: '20181031'
      }}
      />
    ))
  .add('Issue Title closed on 09.11.2018',
    () => (
      <IssueTitle data = {{
        issueNumber: '1234', title: 'Ya rien qui maaaarche!', state: 'CLOSED', user: 'Nooka10', issueTime: '20181109'
      }}
      />
    ))
  .add('Issue Title opened just now',
    () => (
      <IssueTitle data = {{
        issueNumber: '1234', title: 'Ya rien qui maaaarche!', state: 'OPEN', user: 'Nooka10', issueTime: dateNow
      }}
      />
    ));
