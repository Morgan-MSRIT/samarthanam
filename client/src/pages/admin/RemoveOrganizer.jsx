import { useState } from 'react';

export default function RemoveOrganizer() {
    const [organizers, setOrganizers] = useState(
        JSON.parse(localStorage.getItem('organizers')) || []
    );

    const removeOrganizer = (index) => {
        if (window.confirm('Are you sure you want to remove this organizer?')) {
            const updatedOrganizers = organizers.filter((_, i) => i !== index);
            setOrganizers(updatedOrganizers);
            localStorage.setItem('organizers', JSON.stringify(updatedOrganizers));
        }
    };

    return (
        <div className="min-h-screen bg-tertiary flex items-center justify-center p-8">
            <div className="bg-accent p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-3xl font-bold text-primary mb-6 text-center">Remove Organizer</h1>

                {organizers.length === 0 ? (
                    <p className="text-center">No organizers found.</p>
                ) : (
                    <ul>
                        {organizers.map((organizer, index) => (
                            <li key={index} className="flex justify-between p-2 bg-secondary rounded-md mb-2">
                                <span>{organizer.email}</span>
                                <button
                                    onClick={() => removeOrganizer(index)}
                                    className="bg-red-500 text-white px-3 py-1 rounded-md"
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
