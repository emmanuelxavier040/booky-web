import * as React from 'react';
import GoogleLogin from 'react-google-login';
import connect, { LoginProps } from '../../containers/Login.container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';


class Login extends React.Component<LoginProps, any> {

    login() {
        let element: HTMLElement = document.getElementsByClassName('Google_Login')[0] as HTMLElement;
        element.click();
    }

    render() {
        if (this.props.authentication.loggedIn === true) {
            window.location.href = '/'
        }
        return (
            <React.Fragment>
                <div>
                    <section className='jumbotron text-center' >
                        <Container>
                            <h1 className="display-3">Booky</h1>
                            <hr className="my-2" />
                            <p className="lead">Bookmarks anything you find on internet!</p>
                            <p>
                                <GoogleLogin
                                    className={"Google_Login"}
                                    clientId={process.env.REACT_APP_CLIENT_ID + ''}
                                    onSuccess={this.props.userActions.loginUser}
                                    onFailure={() => { }}
                                    redirectUri={'http://localhost:3000'}
                                    cookiePolicy={'single_host_origin'}
                                />
                            </p>
                            {this.props.authentication.loggingIn &&
                                <CircularProgress />
                            }
                            
                        </Container>
                    </section>
                </div>
            </React.Fragment>
        )
    }
}
export default connect(Login)
