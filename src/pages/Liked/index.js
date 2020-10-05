import React, { useCallback, useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';

import LikedUser from '../../components/LikedUser'

import { AsyncStorage, ScrollView } from 'react-native';



const Liked = () => {
    const inFocus = useIsFocused();

    const [likedList, setLikedList] = useState([]);

    const loadLiked = useCallback(
    async () =>{
        try {
            const response = await AsyncStorage.getItem('@YOURCHOICE:likedList');
            setLikedList(JSON.parse(response.split(',')));
            console.log(response);
        }catch(error){
            console.log(error);
        }
    } ,[],
    )

    const clearLikedList = useCallback (
        async () => {
            try{
                if(likedList.length >= 50){
                    setLikedList([]);
                    await AsyncStorage.setItem('@YOURCHOICE:likedList', JSON.stringify(likedList));
                }
            }catch(error){
                console.log(error)
            }
        }, [],
    )

    useEffect(
        () =>{
            loadLiked();
        }, [loadLiked, inFocus]
    )

    return(
        <ScrollView>
            {
        likedList.map(user => {
            return(
           <LikedUser user={user} />
                )
            })
        }
            </ScrollView>
            )
}

export default Liked;