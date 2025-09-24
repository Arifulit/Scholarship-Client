
import { Helmet } from 'react-helmet-async'

import Advertisemest from '../../components/Home/Advertisemest'
import Scholars from '../../components/Home/Scholars'
import ExtraSection from '../ExtraSection/ExtraSection'
// import DeploymentDebug from '../../components/Debug/DeploymentDebug'
// import ApiEndpointTester from '../../components/Debug/ApiEndpointTester'

const Home = () => {
  return (
    <div className="w-full">
      <Helmet>
        <title> Scholarship </title>
      </Helmet>
      
      <div className="w-full  ">
        <Advertisemest />
      </div>
      
      <div className="w-full ">
        <Scholars />
      </div>
      
      <div className="w-full  py-16">
        <ExtraSection />
      </div>
      
      {/* Debug Panels - Disabled */}
      {/* {import.meta.env.DEV && (
        <>
          <DeploymentDebug />
          <ApiEndpointTester />
        </>
      )} */}
    </div>
  )
}

export default Home
