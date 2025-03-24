import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import NavBar from "./components/common/NavBar";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import VolunteerForm from "./pages/VolunteerForm";
import EventVolunteerForm from "./pages/EventVolunteerForm";
import ParticipantForm from "./pages/ParticipantForm";
import EventDetails from "./pages/EventDetails";
import TaskList from "./pages/TaskList";
import Events from "./pages/Events";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ScrollToTop from "./components/common/ScrollToTop";
import ScreenReader from "./components/accessibility/ScreenReader";
import CreateEvents from "./pages/CreateEvents";
import ManageEvents from "./pages/ManageEvents";
import AnalyticsPage from "./pages/AnalyticsPage";
import CreateTasks from "./pages/CreateTasks";
import OrganizerDashboard from "./pages/OrganizerDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateOrganizer from "./pages/admin/CreateOrganizer";
import RemoveOrganizer from "./pages/admin/RemoveOrganizer";
import Analytics from "./pages/admin/Analytics";
import ChangePassword from "./pages/ChangePassword";
import EventManagement from "./pages/EventManagement";
import Notifications from './pages/Notifications';
import FeedbackForm from "./pages/CreateFeedback";
import FeedbackPage from "./pages/FeedbackPage";



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
            <Route path="/contact" element={<Contact />} />
            <Route path="/volunteer" element={<VolunteerForm />} />
            <Route 
              path="/volunteer/:eventId" 
              element={
                <ProtectedRoute allowedRoles={["volunteer"]}>
                  <EventVolunteerForm />
                </ProtectedRoute>
              } 
            />
            <Route path="/make-feedback/:eventId" element={<FeedbackForm />} />
            <Route
              path="/feedback/:eventId"
              element={
                // <ProtectedRoute allowedRoles={['organiser']}>
                <FeedbackPage/>
                // </ProtectedRoute>
              }
            />
            <Route path="/participant/:eventId" element={<ParticipantForm />} />
            <Route path="/event/:eventId" element={<EventDetails />} />
            <Route path="/tasks/:eventId" element={<TaskList />} />
            <Route path="/notification" element={<Notifications/>} />
            <Route
              path="/organizer/create-events"
              element={
                <ProtectedRoute allowedRoles={["organiser"]}>
                  <CreateEvents />
                </ProtectedRoute>
              }
            />
            <Route
              path="/organizer/dashboard"
              element={
                <ProtectedRoute allowedRoles={["organiser"]}>
                  <OrganizerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/organizer/manage-event/:eventId"
              element={
                <ProtectedRoute allowedRoles={["organiser"]}>
                  <EventManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/organizer/analytics"
              element={
                <ProtectedRoute allowedRoles={["organiser"]}>
                  <AnalyticsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/organizer/create-tasks"
              element={
                <ProtectedRoute allowedRoles={["organiser"]}>
                  <CreateTasks />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/create-organizer"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <CreateOrganizer />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/remove-organizer"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <RemoveOrganizer />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/analytics"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <Analytics />
                </ProtectedRoute>
              }
            />
            <Route
              path="/change-password"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <ChangePassword />
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
