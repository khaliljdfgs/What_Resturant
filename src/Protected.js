import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Protected(props) {
    const Navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('User-info')) {
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

export default Protected