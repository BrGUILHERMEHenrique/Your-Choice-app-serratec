import React from 'react';


import { User, Image, UserText } from './styles';


const LikedUser = (props) => {
    const { name } = props;

    return(
    <User>

        <Image source={{uri: props.user.photo}} />
        <UserText>{props.user.name}</UserText>
        <UserText>{props.user.phone}</UserText>


    </User>
);
}

export default LikedUser;