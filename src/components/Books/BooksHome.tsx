import * as React from 'react';
import { Container } from '@material-ui/core';
import BooksList from './BooksList';
import BookCreationTemplate from './BookCreationTemplate';
import connect, { CardProps } from '../../containers/CardList.container';
import Box from '@material-ui/core/Box';


class BooksHome extends React.Component<CardProps, any> {

  constructor(props: any) {
    super(props)
    this.state = {}
    this.handleCreate = this.handleCreate.bind(this)
  }

  componentDidMount() {
    this.props.getAllCardsInGroup(this.props.groupId)
    this.props.getGroup(this.props.groupId)
  }

  handleCreate(card: any) {
    this.props.createCard(card)
  }

  render() {
    const isAdmin = this.props.card.group.adminIds.includes(this.props.authentication.userId)
    return (
      <div>
        <Container>
          <h1 className="display-3">Books in {this.props.card.group.context}</h1>
          <hr className="my-2" />
          <p className="lead">You can bookmark with Booky!</p>
          <Container>
            <Box display="flex" flexDirection="row" p={1} m={1}>
              <Box p={1}>
                <BookCreationTemplate createCard={this.handleCreate} showloading={false} groupId={this.props.groupId} />
              </Box>              
            </Box>
          </Container>
          <p />
          <p />
        </Container>
        <BookDashboard card={this.props.card} updateCard={this.props.updateCard} groupId={this.props.groupId} isAdmin={isAdmin}/>        
      </div>
    );
  }
}

const BookDashboard = (props: any) => {
  
  return (
    <Container>
      <BooksList card={props.card} updateCard={props.updateCard} groupId={props.groupId} isAdmin={props.isAdmin}/>
    </Container>
  )
}

export default connect(BooksHome)

