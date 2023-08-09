import React,{ useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProtectedRestaurant(props) {
     const Navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('Restaurant-info')) {
            Navigate("/")
        }
    }, [])
    let Cmp = props.Cmp;
    return (
        <div>
            <Cmp />
        </div>
    )
}
