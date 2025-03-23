import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import NavBar from './components/common/NavBar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import VolunteerForm from './pages/VolunteerForm';
import ParticipantForm from './pages/ParticipantForm';
import EventDetails from './pages/EventDetails';
import TaskList from './pages/TaskList';
import Events from './pages/Events';
import About from './pages/About';
import ScrollToTop from './components/common/ScrollToTop';
import ScreenReader from './components/accessibility/ScreenReader';
import CreateEvents from './pages/CreateEvents';
import ManageEvents from './pages/ManageEvents';
import AnalyticsPage from './pages/AnalyticsPage';
import CreateTasks from './pages/CreateTasks';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScreenReader />
        <NavBar />
        <ScrollToTop />
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/events" element={<Events />} />
            <Route path="/about" element={<About />} />
            <Route path="/volunteer" element={<VolunteerForm />} />
            <Route path="/volunteer/:eventId" element={<VolunteerForm />} />
            <Route path="/participant/:eventId" element={<ParticipantForm />} />
            <Route path="/event/:eventId" element={<EventDetails />} />
            <Route path="/tasks/:eventId" element={<TaskList />} />
            <Route
              path="/organizer/create-events"
              element={
                <ProtectedRoute allowedRoles={['organiser']}>
                  <CreateEvents />
                </ProtectedRoute>
              }
            />
            <Route
              path="/organizer/manage-events"
              element={
                <ProtectedRoute allowedRoles={['organiser']}>
                  <ManageEvents />
                </ProtectedRoute>
              }
            />
            <Route
              path="/organizer/analytics"
              element={
                <ProtectedRoute allowedRoles={['organiser']}>
                  <AnalyticsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/organizer/create-tasks"
              element={
                <ProtectedRoute allowedRoles={['organiser']}>
                  <CreateTasks />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;