import React, { useEffect, useState } from "react";
import { getOrganizers, removeOrganizer } from "../../services/apiService";
import { toast } from "react-toastify";
import { MdOutlineDelete } from "react-icons/md";

const RemoveOrganizer = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const deleteFunction = async (id) => {
    const response = await removeOrganizer(id);
    if (response.success) {
      toast.success("Organizer deleted successfully");
      const newData = data.filter((organizer) => organizer._id !== id);
      setData(newData);
    } else {
      toast.error(response.message);
    }
  };

  const getFunction = async () => {
    const response = await getOrganizers();
    if (response.success) {
      console.log("-------------", response.organizers);
      setData(response.organizers);
    } else {
      setError(response.message);
      toast.error(error);
    }
  };

  useEffect(() => {
    getFunction();
  }, []);

  return (
    <div className="bg-accent min-h-screen">
      <div className="text-xl md:text-3xl pt-2 font-bold text-primary mb-2 md:mb-6 text-center">
        Manage Organizer
      </div>
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {data?.map((organizer) => (
          <div className="border-2 bg-tertiary mb-2 text-center rounded-lg border-gray-300 gap-y-3 p-2 md:p-4">
            <div className="mx-auto font-bold">
              Name: <span className="font-normal">{organizer?.name}</span>
            </div>

            <div className="mx-auto font-bold">
              Email: <span className="font-normal">{organizer?.email}</span>
            </div>
            <button
              onClick={() => deleteFunction(organizer?._id)}
              className="inline-flex my-auto items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-accent-100 bg-primary-500 hover:bg-secondary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600 transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-md active:scale-95"
            >
              <MdOutlineDelete className="mr-2" />
              Delete account
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RemoveOrganizer;
