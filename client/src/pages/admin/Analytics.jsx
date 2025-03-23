// import { Bar } from 'react-chartjs-2';

// export default function AnalyticsPage() {
//     const data = {
//         labels: ['Event A', 'Event B', 'Event C'],
//         datasets: [
//             {
//                 label: 'Participants',
//                 data: [150, 200, 300],
//                 backgroundColor: 'rgba(54, 162, 235, 0.6)',
//             },
//             {
//                 label: 'Volunteers',
//                 data: [20, 35, 40],
//                 backgroundColor: 'rgba(255, 99, 132, 0.6)',
//             },
//         ],
//     };

//     return (
//         <div className="min-h-screen bg-tertiary flex items-center justify-center p-8">
//             <div className="bg-accent p-8 rounded-lg shadow-md w-full max-w-md">
//                 <h1 className="text-3xl font-bold text-primary mb-6 text-center">Analytics</h1>

//                 <div className="bg-secondary p-4 rounded-md">
//                     <Bar data={data} />
//                 </div>
//             </div>
//         </div>
//     );
// }



import { Bar } from 'react-chartjs-2';

export default function AnalyticsPage() {
    const data = {
        labels: ['Event A', 'Event B', 'Event C'],
        datasets: [
            {
                label: 'Participants',
                data: [150, 200, 300],
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
            },
            {
                label: 'Volunteers',
                data: [20, 35, 40],
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
            },
        ],
    };

    return (
        <div className="min-h-screen bg-tertiary flex items-center justify-center p-8">
            <div className="bg-accent p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-3xl font-bold text-primary mb-6 text-center">Analytics</h1>

                <div className="bg-secondary p-4 rounded-md">
                    <Bar data={data} />
                </div>

                {/* Insights Section */}
                <div className="mt-6 text-center">
                    <p>Total Volunteer Hours: 400</p>
                    <p>Total Events Conducted: 25</p>
                </div>
            </div>
        </div>
    );
}
