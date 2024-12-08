import { useEffect, useState } from 'react';

function TopGrossingProductionCompanies() {
    const [companies, setCompanies] = useState([]);

    const formatRevenue = (revenue) => {
        return revenue.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
        });
    };

    useEffect(() => {
        const fetchTopGrossing = async () => {
            try {
                const apiUrl = `https://${import.meta.env.VITE_API_URL}/getTopGrossingProductionCompanies`;

                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error('Failed to fetch movies');
                }

                const data = await response.json();
                setCompanies(data);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchTopGrossing();
    }, []);

    return (
        <div className="flex justify-center">
            {companies.map((company) => (
                <div key={company.name} className="bg-secondary p-2 rounded-lg shadow-lg m-2">
                    <p className="text-center text-xl">{company.production_company_name}</p>
                    <p className="text-center">{formatRevenue(parseInt(company.revenue))}</p>
                </div>
            ))}
        </div>
    )
}

export default TopGrossingProductionCompanies;