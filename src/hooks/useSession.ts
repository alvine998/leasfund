import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { CONFIG } from '../config';

export default function useSession() {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const getUser = async () => {
            const user = await AsyncStorage.getItem('login');
            if (user) {
                let detail = JSON.parse(user)
                const result = await axios.get(
                    CONFIG.base_url_api + `/user/list?email=${detail?.email}`,
                    {
                        headers: {
                            access_token: CONFIG.access_token,
                        },
                    },
                )
                setUser(result.data.items[0]);
            }
        }
        getUser();
    }, [])
    
    return { user }
}