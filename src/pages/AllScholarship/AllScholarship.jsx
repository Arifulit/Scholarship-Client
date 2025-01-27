// import { Helmet } from "react-helmet-async";
// import LoadingSpinner from "../../components/Shared/LoadingSpinner";
// import Container from "../../components/Shared/Container";
// import Card from "../../components/Home/Card";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";




// const AllScholarship = () => {
//     const { data:scholarship, isLoading} = useQuery({
//         querykey:['scholarship'],
//         queryFn: async () =>{
//           const {data}= await axios(`${import.meta.env.VITE_API_URL}/scholarship`)
//           return data
//         },
    
//       })
    
//       if(isLoading) return  <LoadingSpinner></LoadingSpinner>
//         console.log( 'data found:',scholarship)
//     return (
//         <div>
//         <Helmet>
//           <title>All Scholarship| Dashboard</title>
//         </Helmet>
  
//         <Container>
//         <Helmet>
//           <title>All Scholarship| Dashboard</title>
//          </Helmet>
//       {
//         scholarship && scholarship.length>0 ?(
//           <div className='pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
//           {
//             scholarship.map(scholar => (
//               <Card key={scholar._id} scholar={scholar} />
//             ))
//           }
          
          
         
//         </div>
//         ) :<p>No data Available</p>
//       }
//     </Container>
        
        
       
  
//       </div>
//     );
// };

// export default AllScholarship;




import { Helmet } from "react-helmet-async";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import Container from "../../components/Shared/Container";
import Card from "../../components/Home/Card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const ITEMS_PER_PAGE = 6; // Adjust items per page

const AllScholarship = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: scholarships, isLoading } = useQuery({
    queryKey: ["scholarship"],
    queryFn: async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/scholarship`);
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  // Filter scholarships based on search query
  const filteredScholarships = scholarships
    ? scholarships.filter((scholarship) =>
        ["scholarshipName", "universityName", "subjectCategory"].some((key) =>
          scholarship[key].toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : [];

  // Paginated scholarships
  const totalItems = filteredScholarships.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedScholarships = filteredScholarships.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Helmet>
        <title>All Scholarship | Dashboard</title>
      </Helmet>

      <Container>
        {/* Search Box */}
        <div className="flex justify-center items-center mt-6 py-4">
          <input
            type="text"
            placeholder="Search by Scholarship Name, University, or Category"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300  rounded-l-md px-4 py-2 w-2/3 bg-white shadow-md focus:outline-none focus:ring focus:ring-blue-400"
          />
          <button
            onClick={() => setCurrentPage(1)} // Reset to the first page on search
            className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 shadow-md focus:outline-none focus:ring focus:ring-blue-400"
          >
            Search
          </button>
        </div>

        {/* Scholarship Cards or No Data */}
        {paginatedScholarships && paginatedScholarships.length > 0 ? (
          <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {paginatedScholarships.map((scholar) => (
              <Card key={scholar._id} scholar={scholar} />
            ))}
          </div>
        ) : (
          <div className="text-center mt-12">
            <p className="text-xl font-medium text-gray-600">No scholarships found.</p>
            <img
              src="/path/to/no-data-image.png" // Replace with an actual image path
              alt="No Data Available"
              className="mx-auto w-1/3 mt-4"
            />
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 mx-1 rounded-md ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                } hover:bg-blue-400`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default AllScholarship;
