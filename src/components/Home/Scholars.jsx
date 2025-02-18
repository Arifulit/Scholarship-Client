
import Card from "./Card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../Shared/LoadingSpinner";
import Container from "../Shared/Container";
import { Link } from "react-router-dom";

const Scholars = () => {
  // Fetching scholarship data using React Query
  const { data: scholarships, isLoading } = useQuery({
    queryKey: ["scholarships"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/scholarship`
      );
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  console.log("Fetched Scholarships:", scholarships);

  // Sort scholarships: Lowest application fees first, then most recent posts
  const sortedScholarships = scholarships
    ? [...scholarships].sort((a, b) =>
        a.applicationFee !== b.applicationFee
          ? a.applicationFee - b.applicationFee
          : new Date(b.postedDate) - new Date(a.postedDate)
      )
    : [];

  // Display only the top 6 scholarships
  const topScholarships = sortedScholarships.slice(0, 6);

  return (
    <Container>
      {scholarships?.length > 0 ? (
        <section className="pt-6">
          {/* Title */}
          <h2 className="text-center text-3xl font-bold mb-6">
            Top Scholarships
          </h2>

          {/* Scholarship Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {topScholarships.map((scholar) => (
              <Card key={scholar._id} scholar={scholar} />
            ))}
          </div>

          {/* "View All Scholarships" Button */}
          {sortedScholarships.length > 6 && (
            <div className="mt-8 flex justify-center">
              <Link
                to="/all-scholarship"
                className="px-6 py-3 text-lg font-semibold bg-blue-600 rounded-md shadow-md hover:bg-blue-700 transition duration-300"
              >
                View All Scholarships
              </Link>
            </div>
          )}
        </section>
      ) : (
        <p className="text-center  mt-10">No scholarships available at the moment.</p>
      )}
    </Container>
  );
};

export default Scholars;
