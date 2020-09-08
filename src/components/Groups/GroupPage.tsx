import * as React from 'react';


const GroupPage = (props: any) => {
    const groupId = props.match.params.groupId

    return (
        <React.Fragment>

            <div>
                <h1>Inside Group {groupId}</h1>
            </div>

        </React.Fragment>
    )
}

export default GroupPage

