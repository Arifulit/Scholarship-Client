import { Helmet } from 'react-helmet-async'

import Advertisemest from '../../components/Home/Advertisemest'
import Scholars from '../../components/Home/Scholars'
import ExtraSection from '../ExtraSection/ExtraSection'

const Home = () => {
  return (
    <div>
      <Helmet>
        <title> PlantNet | Buy Your Desired Plant</title>
      </Helmet>
      <Advertisemest></Advertisemest>
      <Scholars></Scholars>
     <ExtraSection></ExtraSection>
      
    </div>
  )
}

export default Home
