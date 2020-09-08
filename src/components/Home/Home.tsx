import * as React from 'react';
import { Button, Container } from '@material-ui/core';
import { Link } from 'react-router-dom';  

import './css/Home.css';

class Home extends React.Component<any, any> {

  constructor(props: any) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <div>
        <section className='jumbotron text-center' >
          <Container>
            <h1 className="display-3">Booky</h1>
            <hr className="my-2" />
            <p className="lead">You can bookmark with Booky!</p>
            
            <p>
              <Button color="primary" size='large' variant="outlined" >Create Bookmark</Button>{' '}
              <Link to="/groups" style={{textDecoration: 'none'}}> <Button color="secondary" size='large' variant="outlined" >Groups</Button></Link>
            </p>
          </Container>
        </section>
      </div>
    );
  }
}

export default Home