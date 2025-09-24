
import { Helmet } from 'react-helmet-async'

import Advertisemest from '../../components/Home/Advertisemest'
import Scholars from '../../components/Home/Scholars'
import ExtraSection from '../ExtraSection/ExtraSection'
import AuthDebug from '../../components/AuthDebug'

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
      
      {/* Auth Debug - Only shows in dev or with ?debug=auth */}
      <AuthDebug />
    </div>
  )
}

export default Home
