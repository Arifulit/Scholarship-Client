import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import { FaReceipt, FaCalendarAlt, FaDollarSign } from 'react-icons/fa';

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading, isError } = useQuery({
    queryKey: ['payments', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure(`/payments/${user?.email}`);
      return data;
    },
    retry: 1,
    staleTime: 2 * 60 * 1000,
  });

  if (isLoading) return <LoadingSpinner />;

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Failed to Load Payment History</h2>
          <p className="text-gray-600">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Payment History | Dashboard</title>
      </Helmet>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <FaReceipt className="text-3xl text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Payment History</h1>
        </div>

        {payments.length === 0 ? (
          <div className="text-center py-12">
            <FaReceipt className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Payments Yet</h3>
            <p className="text-gray-600 dark:text-gray-400">Your payment history will appear here</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white uppercase">
                    Transaction ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white uppercase">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white uppercase">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white uppercase">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {payments.map((payment) => (
                  <tr key={payment._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <FaReceipt className="text-blue-500 mr-2" />
                        <span className="text-sm text-gray-900 dark:text-white font-mono">
                          {payment.transactionId}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900 dark:text-white">
                        {payment.name || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <FaDollarSign className="text-green-500 mr-1" />
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                          {payment.Fee?.toFixed(2)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <FaCalendarAlt className="text-gray-400 mr-2" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {new Date(payment.date).toLocaleDateString()}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        payment.status === 'pending' 
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
                          : 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                      }`}>
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-6 text-sm text-gray-600 dark:text-gray-400">
          Total Payments: {payments.length}
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;