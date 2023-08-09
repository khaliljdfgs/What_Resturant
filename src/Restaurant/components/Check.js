import React from 'react'
import { Button } from 'react-bootstrap';

export default function Check() {
    async function checkingData() {
        const apiKey = 'oZgQtcoTTLruzpvSN7nV2l5I4oq34Xx7V3OeE5HJ';
        const category = 'fast food'; // The category you want to retrieve

        // Make the API request
        fetch(`https://api.nal.usda.gov/fdc/v1/foods/list?api_key=${apiKey}&dataType=Survey (FNDDS)&category=${category}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // Check if the response data is valid
                // if (!data || !data.foods || !Array.isArray(data.foods)) {
                //     throw new Error('Invalid response data');
                // }
                // Process the response data
                // const foods = data.foods;
                // foods.forEach(food => {
                //     const foodName = food.description;
                //     const servingSize = food.servingSize;
                //     const servingSizeUnit = food.servingSizeUnit;

                //     console.log(`${foodName}: ${servingSize} ${servingSizeUnit}`);
                // });
            })
            .catch(error => {
                console.error('Error:', error);
            });

    }
    return (
        <div className="content-wrapper">
            <Button onClick={checkingData}>Click</Button>
        </div>
    )
}
