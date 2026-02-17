import { Helmet } from 'react-helmet-async'

import Advertisemest from '../../components/Home/Advertisemest'
import Scholars from '../../components/Home/Scholars'
import ExtraSection from '../ExtraSection/ExtraSection'

const Home = () => {
  return (
    <div className="w-full">
      <Helmet>
        <title>Home | ScholarHub - Your Gateway to Educational Opportunities</title>
        <meta name="description" content="Discover thousands of scholarship opportunities worldwide. Find and apply for scholarships that match your academic goals." />
      </Helmet>
      
      <div className="w-full">
        <Advertisemest />
      </div>
      
      <div className="w-full">
        <Scholars />
      </div>
      
      <div className="w-full py-16">
        <ExtraSection />
      </div>
    </div>
  )
}

export default Home
