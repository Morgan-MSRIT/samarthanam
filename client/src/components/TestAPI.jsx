import React, { useEffect, useState } from 'react';
import { eventServices, tagServices } from '../services/eventServices';

const TestAPI = () => {
    const [events, setEvents] = useState([]);
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Test getAllEvents
    const fetchEvents = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await eventServices.getAllEvents();
            console.log('Events Response:', response);
            setEvents(response.data || []);
        } catch (err) {
            console.error('Error fetching events:', err);
            setError(err.message || 'Failed to fetch events');
        } finally {
            setLoading(false);
        }
    };

    // Test getTags
    const fetchTags = async () => {
        try {
            const response = await tagServices.getTags();
            console.log('Tags Response:', response);
            setTags(response.data || []);
        } catch (err) {
            console.error('Error fetching tags:', err);
        }
    };

    useEffect(() => {
        fetchEvents();
        fetchTags();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div style={{ padding: '20px' }}>
            <h1>API Test Component</h1>
            
            <section>
                <h2>Events List</h2>
                {events.length === 0 ? (
                    <p>No events found</p>
                ) : (
                    <ul>
                        {events.map((event) => (
                            <li key={event._id}>
                                <h3>{event.name}</h3>
                                <p>Description: {event.description}</p>
                                <p>Location: {event.location}</p>
                                <p>Start Date: {new Date(event.startDate).toLocaleDateString()}</p>
                                <p>End Date: {new Date(event.endDate).toLocaleDateString()}</p>
                                <div>
                                    <strong>Tags: </strong>
                                    {event.tags.map(tag => (
                                        <span key={tag._id} style={{ 
                                            margin: '0 5px',
                                            padding: '2px 8px',
                                            backgroundColor: '#e0e0e0',
                                            borderRadius: '12px'
                                        }}>
                                            {tag.name}
                                        </span>
                                    ))}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            <section style={{ marginTop: '20px' }}>
                <h2>Tags List</h2>
                {tags.length === 0 ? (
                    <p>No tags found</p>
                ) : (
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        {tags.map((tag) => (
                            <span key={tag._id} style={{
                                padding: '5px 10px',
                                backgroundColor: '#e0e0e0',
                                borderRadius: '15px'
                            }}>
                                {tag.name}
                            </span>
                        ))}
                    </div>
                )}
            </section>

            <div style={{ marginTop: '20px' }}>
                <button onClick={fetchEvents} style={{ marginRight: '10px' }}>
                    Refresh Events
                </button>
                <button onClick={fetchTags}>
                    Refresh Tags
                </button>
            </div>
        </div>
    );
};

export default TestAPI; 