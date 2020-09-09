import * as React from 'react';
import { Container } from '@material-ui/core';
import BooksList from './BooksList';
import BookCreationTemplate from './BookCreationTemplate';
import connect, {CardProps} from '../../containers/CardList.container';


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
    return (
      <div>  
        <Container>          
            <h1 className="display-3">Books of {this.props.card.group.context}</h1>
            <hr className="my-2" />
            <p className="lead">You can bookmark with Booky!</p>         
            <BookCreationTemplate createCard={this.handleCreate} showloading={false} groupId={this.props.groupId}/>
            <p/>
            <p/>
          </Container>
        <BooksList {...this.props.card} />
      </div>
    );
  }
}

export default connect(BooksHome)

