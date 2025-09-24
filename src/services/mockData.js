// // Temporary mock data service for testing
// export const mockScholarships = [
//   {
//     _id: '1',
//     universityName: 'Harvard University',
//     scholarshipName: 'Merit Scholarship',
//     subjectCategory: 'Computer Science',
//     scholarshipCategory: 'Full Fund',
//     degree: 'Masters',
//     tuitionFees: '$50,000',
//     applicationFees: '$100',
//     serviceCharge: '$50',
//     applicationDeadline: '2024-03-15',
//     scholarshipDescription: 'Full scholarship for outstanding students',
//     universityImage: 'https://via.placeholder.com/300x200',
//     universityCountry: 'USA',
//     universityCity: 'Cambridge',
//     universityRank: '1',
//     postDate: '2024-01-15',
//     applicationCount: 150
//   },
//   {
//     _id: '2',
//     universityName: 'MIT',
//     scholarshipName: 'Research Fellowship',
//     subjectCategory: 'Engineering',
//     scholarshipCategory: 'Partial Fund',
//     degree: 'PhD',
//     tuitionFees: '$45,000',
//     applicationFees: '$75',
//     serviceCharge: '$25',
//     applicationDeadline: '2024-04-01',
//     scholarshipDescription: 'Research fellowship for engineering students',
//     universityImage: 'https://via.placeholder.com/300x200',
//     universityCountry: 'USA',
//     universityCity: 'Cambridge',
//     universityRank: '2',
//     postDate: '2024-01-20',
//     applicationCount: 200
//   }
// ];

// export const mockApplications = [
//   {
//     _id: '1',
//     scholarshipId: '1',
//     applicantEmail: 'user@example.com',
//     university: 'Harvard University',
//     category: 'Computer Science',
//     degree: 'Masters',
//     fees: '$50,000',
//     serviceCharge: '$50',
//     status: 'pending',
//     applicationDate: '2024-02-01',
//     feedback: ''
//   },
//   {
//     _id: '2',
//     scholarshipId: '2',
//     applicantEmail: 'user2@example.com',
//     university: 'MIT',
//     category: 'Engineering',
//     degree: 'PhD',
//     fees: '$45,000',
//     serviceCharge: '$25',
//     status: 'processing',
//     applicationDate: '2024-02-05',
//     feedback: 'Under review'
//   }
// ];

// export const mockUsers = [
//   {
//     _id: '1',
//     name: 'John Doe',
//     email: 'john@example.com',
//     role: 'user',
//     status: 'verified'
//   },
//   {
//     _id: '2',
//     name: 'Jane Smith',
//     email: 'jane@example.com',
//     role: 'moderator',
//     status: 'verified'
//   }
// ];

// // Mock API service functions
// export const mockApiService = {
//   getScholarships: () => Promise.resolve({ data: mockScholarships }),
//   getApplications: () => Promise.resolve({ data: mockApplications }),
//   getUsers: () => Promise.resolve({ data: mockUsers }),
//   getStatistics: () => Promise.resolve({ 
//     data: {
//       totalScholarships: mockScholarships.length,
//       totalApplications: mockApplications.length,
//       totalUsers: mockUsers.length,
//       pendingApplications: mockApplications.filter(app => app.status === 'pending').length
//     }
//   })
// };