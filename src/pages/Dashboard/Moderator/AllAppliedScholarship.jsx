import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import ModeratorOrderDataRow from '../../../components/Dashboard/TableRows/ModeratorOrderDataRow';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AllAppliedScholarship = () => {
  const axiosSecure = useAxiosSecure();
  const { data: orders = [], isLoading, refetch } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const { data } = await axiosSecure('/scholar/moderator');
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <Helmet>
        <title>Manage Applied Scholarships</title>
      </Helmet>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden bg-white">
              <table className="min-w-full leading-normal text-black">
                <thead>
                  <tr>
                    <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">University</th>
                    <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">Scholarship Category</th>
                    <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">Subject Category</th>
                    <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">Degree</th>
        
                    <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(orderData => (
                    <ModeratorOrderDataRow
                      key={orderData?._id}
                      orderData={orderData}
                      refetch={refetch}
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

export default AllAppliedScholarship;
