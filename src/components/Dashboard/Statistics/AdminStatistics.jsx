import { Calendar } from 'react-date-range'
import { FaUserAlt, FaDollarSign, FaArrowUp, FaArrowDown } from 'react-icons/fa'
import { BsFillCartPlusFill, BsFillHouseDoorFill } from 'react-icons/bs'
import { MdTrendingUp, MdCalendarToday } from 'react-icons/md'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const AdminStatistics = () => {
  // Example data for the bar chart (total revenue per month)
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], // Months
    datasets: [
      {
        label: 'Total Revenue ($)',
        data: [500, 600, 800, 1200, 1500, 2000], // Example revenue data
        backgroundColor: 'rgba(99, 102, 241, 0.8)', // Modern indigo color
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Monthly Revenue Analytics',
        font: {
          size: 18,
          weight: 'bold'
        },
        color: '#374151'
      },
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          font: {
            size: 11
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 11
          }
        }
      }
    },
    elements: {
      bar: {
        borderRadius: 4
      }
    }
  }

  // Statistics data with growth indicators
  const stats = [
    {
      title: "Total Revenue",
      value: "$54,239",
      change: "+12.5%",
      isPositive: true,
      icon: FaDollarSign,
      gradient: "from-emerald-500 to-teal-600",
      shadowColor: "shadow-emerald-500/40"
    },
    {
      title: "Total Applications",
      value: "1,847",
      change: "+8.2%",
      isPositive: true,
      icon: BsFillCartPlusFill,
      gradient: "from-blue-500 to-indigo-600",
      shadowColor: "shadow-blue-500/40"
    },
    {
      title: "Active Scholarships",
      value: "342",
      change: "+15.3%",
      isPositive: true,
      icon: BsFillHouseDoorFill,
      gradient: "from-purple-500 to-pink-600",
      shadowColor: "shadow-purple-500/40"
    },
    {
      title: "Total Users",
      value: "12,450",
      change: "-2.1%",
      isPositive: false,
      icon: FaUserAlt,
      gradient: "from-orange-500 to-red-600",
      shadowColor: "shadow-orange-500/40"
    }
  ]

  return (
    <div className="space-y-8">
      {/* Statistics Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className="relative group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 overflow-hidden border border-gray-100 dark:border-gray-700"
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
              <div className={`w-full h-full bg-gradient-to-br ${stat.gradient} rounded-full transform translate-x-8 -translate-y-8`}></div>
            </div>
            
            {/* Icon */}
            <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${stat.gradient} rounded-xl shadow-lg ${stat.shadowColor} mb-4 group-hover:scale-110 transition-transform duration-300`}>
              <stat.icon className="w-7 h-7 text-white" />
            </div>
            
            {/* Content */}
            <div className="relative z-10">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                {stat.title}
              </p>
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </h3>
                <div className={`flex items-center space-x-1 text-sm font-medium ${
                  stat.isPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.isPositive ? (
                    <FaArrowUp className="w-3 h-3" />
                  ) : (
                    <FaArrowDown className="w-3 h-3" />
                  )}
                  <span>{stat.change}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Calendar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                <MdTrendingUp className="w-6 h-6 text-indigo-600 mr-2" />
                Revenue Analytics
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Monthly performance overview
              </p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>
              <span>Revenue</span>
            </div>
          </div>
          <div className="h-80">
            <Bar data={data} options={options} />
          </div>
        </div>

        {/* Calendar */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center mb-6">
            <MdCalendarToday className="w-6 h-6 text-purple-600 mr-2" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Calendar
            </h3>
          </div>
          <div className="calendar-container">
            <Calendar 
              color='#8b5cf6'
              className="rounded-xl"
            />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
            <BsFillCartPlusFill className="w-5 h-5 mr-2" />
            View All Applications
          </button>
          <button className="flex items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
            <FaUserAlt className="w-5 h-5 mr-2" />
            Manage Users
          </button>
          <button className="flex items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
            <BsFillHouseDoorFill className="w-5 h-5 mr-2" />
            Add Scholarship
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminStatistics
