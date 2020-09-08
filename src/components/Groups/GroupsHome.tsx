import * as React from 'react';
import { Container } from '@material-ui/core';
import GroupsList from './MyGroupsList';
import GroupCreationTemplate from './GroupCreationTemplate';
import connect, {GroupProps} from '../../containers/GroupList.container';


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

    const showLoading = this.props.group.isCreatingGroup &&  !this.props.group.isCreatedGroup

    return (
      <div>
        <section className='jumbotron text-center' >
          <Container>
            <h1 className="display-3">Create Groups</h1>
            <hr className="my-2" />
            <p className="lead">You can bookmark with Booky!</p>                  
          </Container>
          <GroupCreationTemplate createGroup={this.handleCreate} showloading={showLoading}/>
        </section>
        <GroupsList {...this.props.group} />
      </div>
    );
  }
}

export default connect(GroupsHome)

