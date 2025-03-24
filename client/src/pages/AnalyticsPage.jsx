import axios from "axios";
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { useEffect, useState } from "react";
import { Chart } from "react-chartjs-2";

// Register required components
ChartJS.register(
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);




export default function AnalyticsPage() {
  const [eventData, setEventData] = useState([]);
  
  const [allEvents, setAllEvents] = useState([]);
  const [eventName, setEventName] = useState([]);
  const [numParticipants, setNumParticipants] = useState([]);
  const [registeredParticipants, setRegisteredParticipants] = useState([]);
  const [totalParticipants, setTotalParticipants] = useState(0);
  const [totalVolunteers, setTotalVolunteers] = useState(0);
  const data = {
    labels: eventName,
    datasets: [
      {
        type: "bar",
        label: "Registered Participants",
        data: registeredParticipants,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },  
      {
        type: "bar",
        label: "Number of Participants",
        data: numParticipants,
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        fill: false,
      },  
    ],  
  };  

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },  
    },  
    scales: {
      x: {
        barPercentage: 1.0,
        categoryPercentage: 0.8,
      },  
    },  
  };  


  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  console.log(error)
  console.log(loading)

  const API_URL = 'http://localhost:4000/api/v1';
  const API_ANALYTICS = 'http://localhost:4003';
const api = axios.create({
  baseURL: API_URL,
});

const apiAnalytics = axios.create({
  baseURL: API_ANALYTICS,
});

    

  const getEvents = async (e) => {
    e?.preventDefault();
    setLoading(true);
    setError('');
    
    try {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    const response = await api.post('/event/get-events-by-id', 
        {"user": user._id},
        { 
            headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
      
      if (response?.data?.success) {
        setEventData(response?.data?.data);
      } else {
        setError(response?.data?.message);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred while fetching events');
    } finally {
      setLoading(false);
    }
  };


  const getOrganizerAnalytics = async (e) => {
    e?.preventDefault();
    setLoading(true);
    setError('');
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    const response = await apiAnalytics.post('/analytics/get-organizer-analytics', 
        {
          id: user._id
      },
        { 
            headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
      
      if (response?.data?.success) {
        const data = response?.data?.data;
        setAllEvents(data?.events);
        setEventName(data?.eventName);
        setNumParticipants(data?.numParticipants);
        setRegisteredParticipants(data?.registeredParticipants);
        setTotalParticipants(data?.totalParticipants);
        setTotalVolunteers(data?.totalVolunteers);
        
      } else {
        setError(response?.data?.message);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred while fetching events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEvents();
    getOrganizerAnalytics();
  }, []);

  return (
    <>
      <div className="max-h-full bg-tertiary flex items-center justify-center p-8">
        <div className="bg-accent p-2 md:p-8 rounded-lg shadow-md w-[98%] md:w-[90%] h-[500px]">
          <h1 className="text-xl md:text-3xl font-bold text-primary mb-2 md:mb-6 text-center">
            Analytics
          </h1>
          <div className="bg-white p-2 md:p-4 rounded-md h-[85%]">
            <Chart type="bar" data={data} options={options} />
          </div>
        </div>
      </div>

      {/* totals */}
      <div className="max-h-full bg-tertiary flex items-center justify-center p-8">
        <div className="bg-accent p-2 md:p-8 rounded-lg shadow-md w-[98%] md:w-[90%] h-max">
          <h1 className="text-xl md:text-3xl font-bold text-primary mb-2 md:mb-6 text-center">
            Totals
          </h1>
          <div className="border-2 md:flex mx-auto text-center md:justify-between mb-2 rounded-lg border-gray-300 p-2 md:p-4">
            <div className="md:ml-10 flex gap-4 mx-auto">
              <div className="text-xl font-bold">Total Participants: </div>
              <div className="my-auto text-lg">{totalParticipants}</div>
            </div>
            <div className="md:mr-10 flex gap-4">
              <div className="text-xl font-bold">Total Volunteers: </div>
              <div className="my-auto text-lg">{totalVolunteers}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-h-full bg-tertiary flex items-center justify-center p-8">
        <div className="bg-accent p-2 md:p-8 rounded-lg shadow-md w-[98%] md:w-[90%] h-max">
          <h1 className="text-xl md:text-3xl font-bold text-primary mb-2 md:mb-6 text-center">
            Past Events
          </h1>
          <div>
            {/* USE FOREACH HERER */}
            {eventData?.map((event) => (
              <div className="border-2 mb-2 rounded-lg border-gray-300 p-2 md:p-4">
                <div className="md:flex justify-between">
                  <div className="text-xl font-bold">{event?.name}</div>
                  <div className="flex gap-3 my-auto">
                    <div className="font-bold">Start Date:</div>
                    <div>{event?.startDate?.substr(0, 10)}</div>
                  </div>
                </div>

                <div className="md:flex mt-2 gap-x-10 justify-between">
                  <div className="md:flex gap-x-10">
                    <div className="flex gap-3 my-auto">
                      <div className="font-bold">Location: </div>
                      <div>{event?.location}</div>
                    </div>
                    <div className="flex gap-3 my-auto">
                      <div className="font-bold">Total Participants: </div>
                      <div>{event?.registeredParticipants?.length}</div>
                    </div>
                    <div className="flex gap-3 my-auto">
                      <div className="font-bold">Total volunteer: </div>
                      <div>{event?.volunteers?.length}</div>
                    </div>
                  </div>
                  <div className="flex mt-2 my-auto">
                    <button
                      //   onClick={logout}
                      className="inline-flex my-auto items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-accent-100 bg-primary-500 hover:bg-secondary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600 transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-md active:scale-95"
                    >
                      Get Feedback
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
