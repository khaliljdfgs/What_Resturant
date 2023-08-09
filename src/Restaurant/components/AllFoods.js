import React, { useState, useEffect } from 'react'

export default function AllFoods() {
    const apiKey = "oZgQtcoTTLruzpvSN7nV2l5I4oq34Xx7V3OeE5HJ";
    const pageSize = 1000; // maximum page size

    const [allFoods, setAllFoods] = useState([]);

    useEffect(() => {
        const fetchAllFoods = async () => {
            let foods = [];
            let currentPage = 1;
            let totalPages = 1;

            while (currentPage <= totalPages) {
                const response = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query=*&pageNumber=${currentPage}&pageSize=${pageSize}&api_key=${apiKey}`);
                const data = await response.json();

                totalPages = data.totalPages;
                foods.push(...data.foods);

                currentPage++;
            }

            setAllFoods(foods);
        }

        fetchAllFoods();
        console.log(allFoods);
    }, []);

    return allFoods;
}
