import React, { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Link } from "react-router-dom";
import { getEventById } from "../../services/apiService";

export default function OrganizerEventDetailsPopup({
  eventId,
  isOpen,
  onClose,
}) {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openSections, setOpenSections] = useState({
    details: true,
    tasks: true,
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await getEventById(eventId);
        if (response.success) {
          setEvent(response.data);
        } else {
          setError("Failed to fetch event details");
        }
      } catch (err) {
        setError("Error fetching event details");
      } finally {
        setLoading(false);
      }
    };
    if (isOpen) fetchEvent();
  }, [eventId, isOpen]);

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  if (!isOpen) return null;

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      {/* Semi-transparent overlay */}
      <Dialog.Overlay className="fixed inset-0 bg-gray-900 opacity-40 z-40" />

      {/* Modal content */}
      <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 z-50 max-h-[80vh] overflow-y-auto">
        {loading ? (
          <p className="text-center text-secondary">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <>
            {/* Header */}
            <div className="bg-accent p-4 rounded-t-lg">
              <Dialog.Title className="text-2xl font-bold text-primary">
                {event.name}
              </Dialog.Title>
              {event.image && (
                <img
                  src={event.image}
                  alt={event.name}
                  className="w-full h-40 object-cover rounded-md mt-3"
                />
              )}
            </div>

            {/* Content */}
            <div className="mt-4 space-y-4">
              {/* Details Section */}
              <div className="bg-tertiary-100 rounded-md">
                <button
                  onClick={() => toggleSection("details")}
                  className="w-full text-left p-3 flex justify-between items-center bg-tertiary-200 rounded-t-md"
                >
                  <h3 className="text-lg font-semibold text-primary">
                    Event Details
                  </h3>
                  <span className="text-secondary">
                    {openSections.details ? "−" : "+"}
                  </span>
                </button>
                {openSections.details && (
                  <div className="p-4 space-y-2 text-secondary">
                    <p>
                      <span className="font-medium text-primary">
                        Description:
                      </span>{" "}
                      {event.description}
                    </p>
                    <p>
                      <span className="font-medium text-primary">
                        Location:
                      </span>{" "}
                      {event.location}
                    </p>
                    <p>
                      <span className="font-medium text-primary">
                        Start Date:
                      </span>{" "}
                      {new Date(event.startDate).toLocaleString()}
                    </p>
                    <p>
                      <span className="font-medium text-primary">
                        End Date:
                      </span>{" "}
                      {new Date(event.endDate).toLocaleString()}
                    </p>
                    <p>
                      <span className="font-medium text-primary">Tags:</span>{" "}
                      {event.tags.map((tag) => tag.name).join(", ")}
                    </p>
                    <p>
                      <span className="font-medium text-primary">
                        Volunteers:
                      </span>{" "}
                      {event.volunteers.length}
                    </p>
                    <p>
                      <span className="font-medium text-primary">
                        Participants:
                      </span>{" "}
                      {event.registeredParticipants.length}
                    </p>
                    <p>
                      <span className="font-medium text-primary">
                        Total Volunteers Required:
                      </span>{" "}
                      {event.totalVolunteerReq}
                    </p>
                    <p>
                      <span className="font-medium text-primary">
                        Registration Required:
                      </span>{" "}
                      {event.isRegistrationRequired ? "Yes" : "No"}
                    </p>
                  </div>
                )}
              </div>

              {/* Tasks Section */}
              <div className="bg-tertiary-100 rounded-md">
                <button
                  onClick={() => toggleSection("tasks")}
                  className="w-full text-left p-3 flex justify-between items-center bg-tertiary-200 rounded-t-md"
                >
                  <h3 className="text-lg font-semibold text-primary">Tasks</h3>
                  <span className="text-secondary">
                    {openSections.tasks ? "−" : "+"}
                  </span>
                </button>
                {openSections.tasks && (
                  <div className="p-4 space-y-3 max-h-48 overflow-y-auto">
                    {event.tasks.length > 0 ? (
                      event.tasks.map((task) => (
                        <div
                          key={task._id}
                          className="p-3 bg-accent rounded-md shadow-sm text-secondary"
                        >
                          <h4 className="font-medium text-primary">
                            {task.name}
                          </h4>
                          <p className="text-sm">
                            Start: {new Date(task.startTime).toLocaleString()}
                          </p>
                          <p className="text-sm">
                            End: {new Date(task.endTime).toLocaleString()}
                          </p>
                          <p className="text-sm">
                            Volunteers: {task.currentVolunteerCount}/
                            {task.maxVolunteerNeeded}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-secondary">No tasks available.</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex justify-end space-x-3">
              <Link
                to={`/organizer/manage-event/${event._id}`}
                className="bg-primary text-accent-100 px-4 py-2 rounded-md hover:bg-secondary transition-colors duration-200"
              >
                Edit Event
              </Link>
              <Dialog.Close asChild>
                <button className="bg-tertiary-400 text-primary px-4 py-2 rounded-md hover:bg-tertiary-500 transition-colors duration-200">
                  Close
                </button>
              </Dialog.Close>
            </div>
          </>
        )}
      </Dialog.Content>
    </Dialog.Root>
  );
}
