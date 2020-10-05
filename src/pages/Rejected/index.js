import React, { useCallback, useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';


import RejectedUser from '../../components/RejectedUser'

import { AsyncStorage, ScrollView } from 'react-native';


const Rejected = () => {
    const inFocus = useIsFocused();
    const [rejectedList, setRejectList] = useState([]);

    const loadRejectedList = useCallback (
        async () => {
            try{
                const response = await AsyncStorage.getItem('@YOURCHOICE:rejectedList');
                setRejectList(JSON.parse(response));
                console.log(response);
            }catch(error) {
                console.log(error);
            }
        }, []
    );

    useEffect(
        () => {
            loadRejectedList();
        }, [loadRejectedList, inFocus]
    )

    return(
        <ScrollView>
            {
        rejectedList.map(user => {

            return(

                <RejectedUser user={user} />
            )
        })
    }
        </ScrollView>
    )

}

export default Rejected;