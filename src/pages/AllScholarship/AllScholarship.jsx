import { Helmet } from "react-helmet-async";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import Container from "../../components/Shared/Container";
import Card from "../../components/Home/Card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";




const AllScholarship = () => {
    const { data:scholarship, isLoading} = useQuery({
        querykey:['scholarship'],
        queryFn: async () =>{
          const {data}= await axios(`${import.meta.env.VITE_API_URL}/scholarship`)
          return data
        },
    
      })
    
      if(isLoading) return  <LoadingSpinner></LoadingSpinner>
        console.log( 'data found:',scholarship)
    return (
        <div>
        <Helmet>
          <title>All Scholarship| Dashboard</title>
        </Helmet>
  
        <Container>
        <Helmet>
          <title>All Scholarship| Dashboard</title>
         </Helmet>
      {
        scholarship && scholarship.length>0 ?(
          <div className='pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
          {
            scholarship.map(scholar => (
              <Card key={scholar._id} scholar={scholar} />
            ))
          }
          
          
         
        </div>
        ) :<p>No data Available</p>
      }
    </Container>
        
        
       
  
      </div>
    );
};

export default AllScholarship;


