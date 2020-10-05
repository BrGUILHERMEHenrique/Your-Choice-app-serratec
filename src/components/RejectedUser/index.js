import React from 'react';

import {User, Image, UserText} from './styles';

const RejectedUser = (props) => (
        <User>

            <Image source={{uri: props.user.photo}} />
            <UserText>{props.user.name}</UserText>

        </User>
)


export default RejectedUser;    