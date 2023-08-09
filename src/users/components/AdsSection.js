import React, { useEffect } from 'react'
import { useState } from 'react';

export default function AdsSection() {
    const [showAd, setShowAd] = useState(true);
    const [Ad, setAd] = useState();
    const [img, setImg] = useState();

    const handleAdClose = () => {
        setShowAd(false);
    };

    useEffect(()=>{
        async function getData() {
            try {
                let result = await fetch('http://localhost:8000/api/getLatestAd');
                result = await result.json();
                setAd(result);
            } catch (error) {
                alert(error)
            }
        }
        getData();
    },[])
    useEffect(()=>{
       if(Ad)
       {
           setImg(Ad.imgUrl);
       }
    },[Ad])
    return (
        <div className='container-xxl bg-white p-0'>
            <div className="container-xxl py-5">
                <>
                    {showAd && (
                        <div className="ad-section">
                            <button className="close-button" onClick={handleAdClose}>
                                &#x2716;
                            </button>
                            <img className="ad-image" src={'http://localhost:8000/'+img} alt="Advertisement" />
                        </div>
                    )}
                </>
            </div>
        </div>
    );
}
