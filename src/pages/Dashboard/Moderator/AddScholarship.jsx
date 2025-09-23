import { Helmet } from "react-helmet-async";
import ScholarshipForm from "../../../components/Form/ScholarshipForm";

const AddScholarship = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Helmet>
        <title>Add Scholarship | Dashboard</title>
      </Helmet>

      <div className="space-y-6">
        {/* Page Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Add New Scholarship
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Create a new scholarship opportunity for students
              </p>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Ready to publish
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <ScholarshipForm />
        </div>
      </div>
    </div>
  );
};

export default AddScholarship;
