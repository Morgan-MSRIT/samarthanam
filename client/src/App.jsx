import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import VolunteerForm from './pages/VolunteerForm';
import ParticipantForm from './pages/ParticipantForm';
import EventDetails from './pages/EventDetails';
import TaskList from './pages/TaskList';
import ScreenReader from './components/accessibility/ScreenReader';

function App() {
  return (
    <Router>
      <ScreenReader />
      <div id="google_translate_element"></div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/volunteer/:eventId" element={<VolunteerForm />} />
        <Route path="/participant/:eventId" element={<ParticipantForm />} />
        <Route path="/event/:eventId" element={<EventDetails />} />
        <Route path="/tasks/:eventId" element={<TaskList />} />
      </Routes>
    </Router>
  );
}

export default App;
