// import { Helmet } from 'react-helmet-async'

// import Advertisemest from '../../components/Home/Advertisemest'
// import Scholars from '../../components/Home/Scholars'
// import ExtraSection from '../ExtraSection/ExtraSection'

// const Home = () => {
//   return (
//     <div>
//       <Helmet>
//         <title> Scholarship </title>
//       </Helmet>
//       <Advertisemest></Advertisemest>
//       <Scholars></Scholars>
//      <ExtraSection></ExtraSection>
      
//     </div>
//   )
// }

// export default Home


import { Helmet } from 'react-helmet-async'

import Advertisemest from '../../components/Home/Advertisemest'
import Scholars from '../../components/Home/Scholars'
import ExtraSection from '../ExtraSection/ExtraSection'

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
    </div>
  )
}

export default Home
