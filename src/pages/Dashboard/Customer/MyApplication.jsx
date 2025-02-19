

import { Helmet } from 'react-helmet-async';
import CustomerOrderDataRow from '../../../components/Dashboard/TableRows/CustomerOrderDataRow';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';

const MyApplication = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: orders = [], isLoading, refetch } = useQuery({
    queryKey: ['orders', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/customer-orders/${user?.email}`);
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

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
                    <CustomerOrderDataRow
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
