import * as React from 'react';
import BooksHome from '../Books/BooksHome';


const GroupPage = (props: any) => {
    const groupId = parseInt(props.match.params.groupId)

    return (
        <React.Fragment>

        <BooksHome groupId={groupId}/>

        </React.Fragment>
    )
}

export default GroupPage

