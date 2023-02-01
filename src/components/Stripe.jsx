import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { Context } from 'context/user-context'; 

const Stripe = ({ orderItems }) => {

    const params = useParams();
    const { id: orderId } = params;

    const { state } = useContext(Context);  
    const { userInfo } = state;

    const paymentHandler = async () => {
        try {
            const res = await axios.post(
                `https://empress-api.onrender.com/server/payment/create-checkout-session/${orderId}`, {
                    orderItems,
                    userId: userInfo.user._id,
                    headers: { authorization: `Bearer ${userInfo.user.token}` }
                }
            );
            localStorage.removeItem('cart');
            if (res.data.url) {
                window.location.href = res.data.url;
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <button 
            onClick={paymentHandler} 
            className="w-[100%] px-4 py-2 text-sm text-white tracking-wider bg-primaryDark border border-primaryDark hover:text-primaryDark hover:bg-white transition duration-200"
        >
            Check Out
        </button>
    )
};

export default Stripe;