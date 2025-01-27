
import Card from './Card';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import LoadingSpinner from '../Shared/LoadingSpinner';
import Container from '../Shared/Container';
import { Link } from 'react-router-dom';

const Scholars = () => {
  // Use tanstack query to fetch data from the backend
  const { data: scholarship, isLoading } = useQuery({
    queryKey: ['scholarship'],
    queryFn: async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/scholarship`);
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  console.log('Data found:', scholarship);

  // Sorting based on low application fees and recent posts
  const sortedScholarships = scholarship
    ? [...scholarship].sort((a, b) => {
        // Sort by application fees in ascending order
        if (a.applicationFee !== b.applicationFee) {
          return a.applicationFee - b.applicationFee;
        }
        // If application fees are equal, sort by date (recent first)
        return new Date(b.postedDate) - new Date(a.postedDate);
      })
    : [];

  // Display only the first 6 scholarships
  const topScholarships = sortedScholarships.slice(0, 6);

  return (
    <Container>
      {scholarship && scholarship.length > 0 ? (
        <div className="pt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {topScholarships.map((scholar) => (
              <Card key={scholar._id} scholar={scholar} />
            ))}
          </div>
          {/* "All Scholarship" button */}
          {sortedScholarships.length > 6 && (
            <div className="mt-8 flex justify-center">
              <Link
                to="/all-scholarship"
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              >
                View All Scholarships
              </Link>
            </div>
          )}
        </div>
      ) : (
        <p>No data available</p>
      )}
    </Container>
  );
};

export default Scholars;