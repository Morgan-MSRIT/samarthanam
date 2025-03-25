import { Link } from 'react-router-dom';

export default function AdminDashboard() {
    return (
        <div className="min-h-screen bg-tertiary flex items-center justify-center p-8">
            <div className="bg-accent p-8 rounded-lg shadow-md w-full max-w-lg text-center">
                <h1 className="text-3xl font-bold text-primary mb-6">Admin Dashboard</h1>

                {/* Quick Stats */}
                <div className="bg-secondary p-4 rounded-md mb-6">
                    <p>Total Events: 12</p>
                    <p>Total Organizers: 8</p>
                    <p>Total Volunteers: 145</p>
                </div>

                {/* Actions */}
                <Link to="/admin/create-organizer" className="block bg-primary text-white p-2 rounded-md w-full mb-4">
                    Create Organizer
                </Link>

                <Link to="/admin/remove-organizer" className="block bg-primary text-white p-2 rounded-md w-full mb-4">
                    Remove Organizer
                </Link>

                <Link to="/admin/analytics" className="block bg-primary text-white p-2 rounded-md w-full">
                    View Analytics
                </Link>
            </div>
        </div>
    );
}
