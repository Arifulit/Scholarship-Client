

import { Helmet } from 'react-helmet-async';
import StudentOrderDataRow from '../../../components/Dashboard/TableRows/StudentOrderDataRow';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';

const MyApplication = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: orders = [], isLoading, refetch, isError, error } = useQuery({
    queryKey: ['orders', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure(`/student-orders/${user?.email}`);
      return data;
    },
    retry: 1,
    staleTime: 2 * 60 * 1000,
    onError: (error) => {
      console.error('❌ Error fetching applications:', error)
    }
  });

  if (isLoading) return <LoadingSpinner />;

  // Show empty state if error or no data
  if (isError || orders.length === 0) {
    return (
      <>
        <Helmet>
          <title>My Applications</title>
        </Helmet>
        <div className="container mx-auto px-4 mt-8 sm:px-8">
          <div className="py-8">
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {isError ? 'Unable to load applications' : 'No Applications Yet'}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                {isError 
                  ? 'There was an error loading your applications. Please try again.' 
                  : 'You haven\'t applied for any scholarships yet.'}
              </p>
              {isError && (
                <button
                  onClick={() => refetch()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Try Again
                </button>
              )}
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Helmet>
        <title>My Applications</title>
      </Helmet>
      <div className="container mx-auto px-4 mt-8 sm:px-8">
        <div className="py-8">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal text-sm">
                <thead>
                  <tr >
                    {[
                      'User Name',
                      'University Name',
                      'Scholarship Category',
                      'Subject Category',
                      'Applying Degree',
                      'Study Gap',
                      'Actions',
                    ].map((heading, index) => (
                      <th
                        key={index}
                        className="px-3 py-3 border-b border-gray-200 text-left uppercase font-bold"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.map((orderData) => (
                    <StudentOrderDataRow
                      key={orderData._id}
                      refetch={refetch}
                      orderData={orderData}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyApplication;
