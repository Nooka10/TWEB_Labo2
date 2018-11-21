import React from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react';
import IssueIcon from '../components/Issue/IssueIcon/IssueIcon';
import IssueComments from '../components/Issue/IssueComments/IssueComments';
import IssueTitle from '../components/Issue/IssueTitle/IssueTitle';
import Issue from '../components/Issue/Issue';

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

// FIXME: comment faire pour régler l'erreur de routage...?
storiesOf('Issue', module)
  .add('Issue opened on 31.10.2018 without any comment',
    () => (
      <Issue
        data = {{
          author   : { login: 'Nooka10' },
          comments : { totalCount: '0' },
          createdAt: '20181031',
          number   : '1234',
          state    : 'OPEN',
          title    : 'Ya rien qui maaaarche!'
        }}
        repo = "Migueeeel"
        repoOwner = "aideMoiiii"
      />
    )).add('Issue closed on 09.11.2018 with 3 comments',
    () => (
      <Issue data = {{
        author   : { login: 'Nooka10' },
        comments : { totalCount: '3' },
        createdAt: '20181109',
        number   : '1235',
        state    : 'CLOSED',
        title    : 'Au secouuuuuuuuur!'
      }}
      />
    )).add('Issue opened on 31.10.2018 with lots of comments',
    () => (
      <Issue data = {{

        author   : { login: 'Nooka10' },
        comments : { totalCount: '25671' },
        createdAt: dateNow,
        number   : '1236',
        state    : 'OPEN',
        title    : 'Dis, j\'ai une petite question...'
      }}
      />
    ));
