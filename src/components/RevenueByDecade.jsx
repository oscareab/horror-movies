import { useEffect, useState } from 'react';

function RevenueByDecade() {
    const [decades, setDecades] = useState([]);

    const formatRevenue = (revenue) => {
        return revenue.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
        });
    };

    useEffect(() => {
        const fetchRevenueByDecade = async () => {
            try {
                const apiUrl = `https://${import.meta.env.VITE_API_URL}/getRevenueByDecade`;

                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error('Failed to fetch movies');
                }

                const data = await response.json();
                setDecades(data);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchRevenueByDecade();
    }, []);

    return (
        <div className="flex justify-center">
            <div className='carousel carousel-center'>
                {decades.map((decade) => (
                    <div key={decade.decade} className="bg-secondary p-2 rounded-lg shadow-lg m-2">
                        <p className="text-center text-xl">{decade.decade}</p>
                        <p className="text-center">{formatRevenue(parseInt(decade.revenue))}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RevenueByDecade;