import axios from 'axios';
import { useQuery } from 'react-query';

import { baseUrl } from 'utils/baseUrl';
import { accessToken } from 'utils/token';

const API = () => { 

    const { isLoading, error, data } = useQuery('orderHistory', async () => {
        const { data } = await axios.get(`${baseUrl}/server/orders/client`, {
            headers: { authorization: `Bearer ${accessToken}` }
        })
        return data;
    });

    return {
        isLoading, error, data
    };
};

export default API;