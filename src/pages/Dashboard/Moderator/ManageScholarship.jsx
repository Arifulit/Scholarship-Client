import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { FaEdit, FaTrash, FaInfoCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { SiModal } from "react-icons/si";

const ManageScholarship = () => {
  const axiosSecure = useAxiosSecure();
  const [editScholarship, setEditScholarship] = useState(null);
  const [sortOption, setSortOption] = useState("appliedDate"); // Default sorting by applied date
  const [filterOption, setFilterOption] = useState("all"); // Default filter to show all scholarships

  const { data: scholarships = [], isLoading, refetch } = useQuery({
    queryKey: ["scholarships"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/scholarship");
      return data;
    },
  });

  // Sort function based on the selected option
  const sortScholarships = (scholarships) => {
    if (sortOption === "appliedDate") {
      return [...scholarships].sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate)); // Sorting by Applied Date (newest first)
    } else if (sortOption === "deadline") {
      return [...scholarships].sort((a, b) => new Date(a.deadline) - new Date(b.deadline)); // Sorting by Scholarship Deadline
    }
    return scholarships;
  };

  // Filter function to filter by the applied date or scholarship deadline
  const filteredScholarships = scholarships.filter((scholarship) => {
    if (filterOption === "applied") {
      return scholarship.status === "Applied"; // Filter scholarships by applied status
    } else if (filterOption === "approved") {
      return scholarship.status === "Approved"; // Filter scholarships by approved status
    }
    return true; // No filtering applied (default option)
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosSecure.delete(`/scholarship/${id}`);
          if (response.data.success) {
            refetch();
            Swal.fire("Deleted!", "The scholarship has been deleted.", "success");
          } else {
            Swal.fire("Error!", response.data.message, "error");
          }
        } catch (error) {
          console.error("Error deleting scholarship:", error);
          Swal.fire("Error!", "Failed to delete the scholarship.", "error");
        }
      }
    });
  };

  const handleEdit = async (updatedData) => {
    try {
      const response = await axiosSecure.put(`/scholarship/${editScholarship._id}`, updatedData);
      if (response.data.success) {
        refetch();
        setEditScholarship(null); // Close the modal
        Swal.fire("Updated!", "The scholarship has been updated.", "success");
      } else {
        Swal.fire("Error!", response.data.message, "error");
      }
    } catch (error) {
      console.error("Error updating scholarship:", error);
      Swal.fire("Error!", "Failed to update the scholarship.", "error");
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <Helmet>
        <title>Manage Scholarships</title>
      </Helmet>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="flex justify-center mb-4">
            {/* Sorting/Filtering Dropdowns */}
            <div className="mr-4">
              <label className="text-sm font-semibold">Sort By</label>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md"
              >
                <option value="appliedDate">Applied Date</option>
                <option value="deadline">Scholarship Deadline</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold">Filter By</label>
              <select
                value={filterOption}
                onChange={(e) => setFilterOption(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md"
              >
                <option value="all">All</option>
                <option value="applied">Applied</option>
                <option value="approved">Approved</option>
              </select>
            </div>
          </div>

          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden bg-white">
              <table className="min-w-full leading-normal text-black">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left">Scholarship Name</th>
                    <th className="px-4 py-2 text-left">University Name</th>
                    <th className="px-4 py-2 text-left">Subject Category</th>
                    <th className="px-4 py-2 text-left">Application Fees</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sortScholarships(filteredScholarships).map((scholarship) => (
                    <tr key={scholarship._id} className="border-b hover:bg-gray-100">
                      <td className="px-4 py-2 text-black">{scholarship.scholarshipName}</td>
                      <td className="px-4 py-2 text-black">{scholarship.universityName}</td>
                      <td className="px-4 py-2 text-black">{scholarship.subjectCategory}</td>
                      <td className="px-4 py-2 text-black">${scholarship.applicationFees}</td>
                      <td className="px-4 py-2 flex space-x-4">
                        <button
                          onClick={() =>
                            Swal.fire({
                              title: "Scholarship Details",
                              html: `<strong>Name:</strong> ${scholarship.scholarshipName}<br/>
                              <strong>University:</strong> ${scholarship.universityName}<br/>
                              <strong>Category:</strong> ${scholarship.subjectCategory}<br/>
                              <strong>Fees:</strong> $${scholarship.applicationFees}`,
                              icon: "info",
                            })
                          }
                          className="text-blue-500 hover:text-blue-700 focus:outline-none"
                        >
                          <FaInfoCircle />
                        </button>
                        <button
                          onClick={() => setEditScholarship(scholarship)}
                          className="text-yellow-500 hover:text-yellow-700 focus:outline-none"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(scholarship._id)}
                          className="text-red-500 hover:text-red-700 focus:outline-none"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Editing Scholarship */}
      {editScholarship && (
        <SiModal
          title="Edit Scholarship"
          onClose={() => setEditScholarship(null)}
          onSubmit={handleEdit}
          defaultValues={editScholarship}
        >
          {/* Modal content - form for editing */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const updatedData = {
                scholarshipName: e.target.scholarshipName.value,
                universityName: e.target.universityName.value,
                subjectCategory: e.target.subjectCategory.value,
                applicationFees: e.target.applicationFees.value,
              };
              handleEdit(updatedData);
            }}
            className="space-y-4 text-black"
          >
            <div>
              <label htmlFor="scholarshipName" className="block text-gray-700">Scholarship Name</label>
              <input
                id="scholarshipName"
                name="scholarshipName"
                type="text"
                defaultValue={editScholarship.scholarshipName}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label htmlFor="universityName" className="block text-gray-700">University Name</label>
              <input
                id="universityName"
                name="universityName"
                type="text"
                defaultValue={editScholarship.universityName}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label htmlFor="subjectCategory" className="block text-gray-700">Subject Category</label>
              <input
                id="subjectCategory"
                name="subjectCategory"
                type="text"
                defaultValue={editScholarship.subjectCategory}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label htmlFor="applicationFees" className="block text-gray-700">Application Fees</label>
              <input
                id="applicationFees"
                name="applicationFees"
                type="number"
                defaultValue={editScholarship.applicationFees}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>
            <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">Save Changes</button>
          </form>
        </SiModal>
      )}
    </>
  );
};

export default ManageScholarship;
