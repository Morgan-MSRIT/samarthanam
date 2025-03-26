import React, { useEffect, useState } from "react";
import { getOrganizers, removeOrganizer } from "../../services/apiService";
import { toast } from "react-toastify";
import { MdOutlineDelete } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import Swal from "sweetalert2";

const RemoveOrganizer = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const deleteFunction = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const response = await removeOrganizer(id);
      if (response.success) {
        toast.success("Organizer deleted successfully");
        const newData = data.filter((organizer) => organizer._id !== id);
        setData(newData);
      } else {
        toast.error(response.message);
      }
    }
  };

  const getFunction = async () => {
    const response = await getOrganizers();
    if (response.success) {
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
    <div className="bg-tertiary-100 min-h-screen py-6 px-12">
      <div className="text-xl md:text-3xl font-bold text-primary mb-6 text-center">
        Manage Organizers
      </div>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {data?.map((organizer) => (
          <div
            key={organizer._id}
            className="bg-accent rounded-lg  p-4 shadow-md"
          >
            <div className="flex items-center space-x-2 mx-auto font-bold text-primary">
              <FaUser />
              <span>
                Name: <span className="font-normal">{organizer?.name}</span>
              </span>
            </div>
            <div className="mt-2 mx-auto font-bold text-primary">
              Email: <span className="font-normal">{organizer?.email}</span>
            </div>
            <button
              onClick={() => deleteFunction(organizer?._id)}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-accent bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-md active:scale-95 cursor-pointer"
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
