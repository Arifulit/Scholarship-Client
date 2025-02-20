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
      <div className="container mx-auto mt-8 px-4 sm:px-8">
        <div className="py-8">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden ">
              <table className="min-w-full leading-normal ">
                <thead>
                  <tr>
                    <th className="px-5 py-3  border-gray-200 text-left text-sm uppercase font-bold">University</th>
                    <th className="px-5 py-3  border-gray-200  text-left text-sm uppercase font-bold">Scholarship Category</th>
                    <th className="px-5 py-3  border-gray-200  text-left text-sm uppercase font-bold">Subject Category</th>
                    <th className="px-5 py-3  border-gray-200  text-left text-sm uppercase font-bold">Degree</th>
        
                    <th className="px-5 py-3  border-gray-200  text-left text-sm uppercase font-bold">Actions</th>
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
