import { useState } from 'react';
import axios from 'axios';

const BackendSeeder = () => {
  const [seeding, setSeeding] = useState(false);
  const [result, setResult] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const sampleScholarships = [
    {
      scholarshipName: "Harvard University Merit Scholarship",
      universityName: "Harvard University",
      universityLogo: "https://i.ibb.co/9yMG3x8/harvard-logo.jpg",
      universityCountry: "United States",
      universityCity: "Cambridge",
      universityRank: 1,
      scholarshipCategory: "Merit-Based",
      subjectCategory: "All Subjects",
      applicationDeadline: "2024-12-31",
      applicationFees: 0,
      rating: 5.0,
      serviceCharge: 25,
      description: "Full scholarship for outstanding students",
      eligibility: "GPA 3.8+, SAT 1400+"
    },
    {
      scholarshipName: "MIT Engineering Excellence Award",
      universityName: "Massachusetts Institute of Technology",
      universityLogo: "https://i.ibb.co/9yMG3x8/mit-logo.jpg",
      universityCountry: "United States",
      universityCity: "Cambridge", 
      universityRank: 2,
      scholarshipCategory: "Academic",
      subjectCategory: "Engineering",
      applicationDeadline: "2024-11-30",
      applicationFees: 50,
      rating: 4.9,
      serviceCharge: 30,
      description: "For aspiring engineers and technologists",
      eligibility: "Engineering background required"
    },
    {
      scholarshipName: "Oxford Rhodes Scholarship",
      universityName: "University of Oxford",
      universityLogo: "https://i.ibb.co/9yMG3x8/oxford-logo.jpg",
      universityCountry: "United Kingdom",
      universityCity: "Oxford",
      universityRank: 3,
      scholarshipCategory: "International",
      subjectCategory: "All Subjects",
      applicationDeadline: "2024-10-15",
      applicationFees: 100,
      rating: 4.8,
      serviceCharge: 35,
      description: "Prestigious international scholarship program",
      eligibility: "International students with leadership experience"
    },
    {
      scholarshipName: "Stanford Innovation Grant",
      universityName: "Stanford University",
      universityLogo: "https://i.ibb.co/9yMG3x8/stanford-logo.jpg",
      universityCountry: "United States",
      universityCity: "Stanford",
      universityRank: 4,
      scholarshipCategory: "Innovation",
      subjectCategory: "Technology",
      applicationDeadline: "2025-01-15",
      applicationFees: 75,
      rating: 4.7,
      serviceCharge: 40,
      description: "Supporting innovative minds in technology",
      eligibility: "Tech entrepreneurship experience preferred"
    },
    {
      scholarshipName: "Cambridge Academic Excellence",
      universityName: "University of Cambridge",
      universityLogo: "https://i.ibb.co/9yMG3x8/cambridge-logo.jpg",
      universityCountry: "United Kingdom", 
      universityCity: "Cambridge",
      universityRank: 5,
      scholarshipCategory: "Academic",
      subjectCategory: "Sciences",
      applicationDeadline: "2024-12-01",
      applicationFees: 0,
      rating: 4.9,
      serviceCharge: 20,
      description: "Excellence in scientific research and study",
      eligibility: "Strong background in sciences"
    }
  ];

  const seedBackend = async () => {
    setSeeding(true);
    setResult(null);

    const backendUrl = import.meta.env.VITE_API_URL || 'https://assignment-scholarship-server.vercel.app';
    
    try {
      console.log('🌱 Starting backend seeding...');
      
      let successCount = 0;
      const errors = [];

      for (const scholarship of sampleScholarships) {
        try {
          console.log(`📝 Adding: ${scholarship.scholarshipName}`);
          
          const response = await axios.post(`${backendUrl}/scholarship`, scholarship);
          
          if (response.status === 200 || response.status === 201) {
            successCount++;
            console.log(`✅ Added: ${scholarship.scholarshipName}`);
          }
        } catch (error) {
          console.log(`❌ Failed: ${scholarship.scholarshipName} - ${error.message}`);
          errors.push({
            name: scholarship.scholarshipName,
            error: error.message
          });
        }
      }

      setResult({
        success: true,
        added: successCount,
        total: sampleScholarships.length,
        errors: errors
      });

    } catch (error) {
      console.error('❌ Seeding failed:', error);
      setResult({
        success: false,
        error: error.message
      });
    } finally {
      setSeeding(false);
    }
  };

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-28 right-4 bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded-full text-xs font-bold shadow-lg z-50"
        title="Seed Backend Data"
      >
        🌱 Seed
      </button>
    );
  }

  return (
    <div className="fixed top-4 right-80 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl border max-w-sm z-50 max-h-96 overflow-y-auto">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white">
          🌱 Backend Seeder
        </h3>
        <div className="flex gap-2">
          <button 
            onClick={seedBackend}
            disabled={seeding}
            className="px-2 py-1 bg-purple-500 text-white rounded text-xs hover:bg-purple-600 disabled:opacity-50"
          >
            {seeding ? '⏳' : '🌱'} Seed
          </button>
          <button 
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>
      </div>

      <div className="text-xs text-gray-600 mb-3">
        This will add {sampleScholarships.length} sample scholarships to your backend database.
      </div>

      {seeding && (
        <div className="text-center text-sm text-purple-600 mb-3">
          🌱 Seeding backend database...
        </div>
      )}

      {result && (
        <div className={`p-3 rounded border ${
          result.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
        }`}>
          {result.success ? (
            <div className="text-green-700">
              <div className="font-medium mb-1">✅ Seeding Completed!</div>
              <div className="text-sm">
                Added: {result.added}/{result.total} scholarships
              </div>
              {result.errors.length > 0 && (
                <div className="mt-2">
                  <div className="text-red-600 text-xs">Errors:</div>
                  {result.errors.slice(0, 3).map((err, idx) => (
                    <div key={idx} className="text-red-600 text-xs truncate">
                      • {err.name}: {err.error}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="text-red-700">
              <div className="font-medium mb-1">❌ Seeding Failed</div>
              <div className="text-sm">{result.error}</div>
            </div>
          )}
        </div>
      )}

      <div className="mt-3 p-2 bg-blue-50 rounded text-xs">
        <div className="font-medium text-blue-700 mb-1">
          💡 Note:
        </div>
        <div className="text-blue-600">
          This adds sample data to your backend. Make sure your backend accepts POST requests to /scholarship endpoint.
        </div>
      </div>
    </div>
  );
};

export default BackendSeeder;