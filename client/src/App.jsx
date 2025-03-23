import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/common/NavBar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import VolunteerForm from './pages/VolunteerForm';
import ParticipantForm from './pages/ParticipantForm';
import EventDetails from './pages/EventDetails';
import TaskList from './pages/TaskList';
import Events from './pages/Events';
import About from './pages/About';
import Contact from './pages/Contact';
import ScrollToTop from './components/common/ScrollToTop';
import ScreenReader from './components/accessibility/ScreenReader';

function App() {
  return (
    <Router>
      <ScreenReader/>
      <NavBar />
      <ScrollToTop />
      <div className="pt-16">      
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/events" element={<Events />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/volunteer" element={<VolunteerForm />} />
          <Route path="/volunteer/:eventId" element={<VolunteerForm />} />
          <Route path="/participant/:eventId" element={<ParticipantForm />} />
          <Route path="/event/:eventId" element={<EventDetails />} />
          <Route path="/tasks/:eventId" element={<TaskList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;