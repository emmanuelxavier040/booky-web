import * as React from 'react';
import { Container } from '@material-ui/core';
import GroupsList from './GroupsList';
import GroupCreationTemplate from './GroupCreationTemplate';
import connect, { GroupProps } from '../../containers/GroupList.container';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

class GroupsHome extends React.Component<GroupProps, any> {

  constructor(props: any) {
    super(props)
    this.state = {}
    this.handleCreate = this.handleCreate.bind(this)
  }

  componentDidMount() {
    this.props.getMyGroups()
  }

  handleCreate(group: any) {
    this.props.createGroup(group)
  }

  render() {

    const showLoading = this.props.group.isCreatingGroup && !this.props.group.isCreatedGroup

    return (
      <div>
        <section className='jumbotron text-center' >
          <Container>
            <h1 className="display-4">Create Groups</h1>
            <hr className="my-2" />
            <p className="lead">You can bookmark with Booky!</p>
          </Container>
          <GroupCreationTemplate createGroup={this.handleCreate} showloading={showLoading} />
        </section>
        <GroupDashBoard group={this.props.group} userId={this.props.authentication.userId} />
      </div>
    );
  }
}

const GroupDashBoard = (props: any) => {
  const [state, setState] = React.useState({
    showmygroups: false,
  });

  const handleChange = (event: any) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  return (
    <React.Fragment>
      <Container>
        <FormGroup row >
          <FormControlLabel
            control={
              <Switch
                checked={state.showmygroups}
                onChange={handleChange}
                name="showmygroups"
                color="primary"
              />
            }
            label={<h5>My Groups</h5>}
          />
        </FormGroup>
        <br />
        <GroupsList groups={props.group} userId={props.userId} mygroups={state.showmygroups} />
      </Container>
    </React.Fragment>
  )
}



export default connect(GroupsHome)

