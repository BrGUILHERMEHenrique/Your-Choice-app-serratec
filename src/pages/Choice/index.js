import React, { useCallback, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { AsyncStorage } from 'react-native';

import { AntDesign } from '@expo/vector-icons'; 

import api from '../../services/api';

import { Container, Image, ButtonContainer, Title, Text } from './styles';

const Choice = () => {
    const[user, setUser] = useState({});
    const[location, setLocation] = useState({});
    const[loading, setLoading] = useState(false);

    const loadPeople = useCallback( 
    async () =>{
        setLoading(true);
        setUser({});
       try{
        const response = await api.get();
        console.log(response.data.results[0]);
        constructUser(response.data.results[0]);

       }catch(error) {
           console.log(error)
       } finally{
           setLoading(false)
       }
           
    } ,[] ,
    );

    const constructUser = (data) => {
        setUser(
            {
                name: `${data.name.first} ${data.name.last}`,
                gender: data.gender,
                email: data.email,
                age: data.dob.age,
                phone: data.phone,
                cellphone: data.cell,
                nat: data.nat,
                photo: data.picture.large 
            }
        )
        setLocation(data.location);
        
    }

    const addUser = useCallback(
    async (info) => {
            try{
                const likedList = await AsyncStorage.getItem('@YOURCHOICE:likedList');
                let list = likedList ? JSON.parse(likedList) : [];
                list.push(info);
                console.log(info);
                await AsyncStorage.setItem('@YOURCHOICE:likedList', JSON.stringify(list))
                loadPeople();
                console.log(likedList); 
            }catch (error){
                console.log(error)
            }
    }, [],
    );

    const rejectUser = useCallback(
        async (info) => {
                try{
                    const rejectedList = await AsyncStorage.getItem('@YOURCHOICE:rejectedList');
                    let list = rejectedList ? JSON.parse(rejectedList) : [];
                    list.push(info);
                    console.log(info);
                    await AsyncStorage.setItem('@YOURCHOICE:rejectedList', JSON.stringify(list))
                    console.log(rejectedList); 
                    loadPeople();
                }catch (error){
                    console.log(error)
                }
        }, [],
        );

    useEffect (
        () =>{
            loadPeople();
        }, [loadPeople],
    )

    return(
    <Container>

        <Title>Your Choice</Title>
        
        <Image source={{uri: user.photo}} />
        <Text>{user.name}, {user.age}</Text>
        <Text>{location.country}</Text>


        <ButtonContainer>
        <TouchableOpacity
            onPress={() => addUser(user)}
        >
           <AntDesign name="adduser" size={30} color="blue" />
           <Text>Add</Text>

        </TouchableOpacity>
         
        <TouchableOpacity
            onPress={() => rejectUser(user)}
        >
            <AntDesign name="dislike2" size={30} color="red" />
            <Text>Pass</Text>
        </TouchableOpacity>
        </ButtonContainer>

    </Container>
    )

}

export default Choice;