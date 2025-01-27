import { Helmet } from 'react-helmet-async'
import ScholarshipForm from '../../../components/Form/ScholarshipForm'

// import ScholarshipForm from '../../../components/Form/MadicineForm'

// import CategorisForm from '../../../components/Form/CategorisForm'

const AddScholarship= () => {


  return (
    <div>
      <Helmet>
        <title>Add Scholarship| Dashboard</title>
      </Helmet>

      
      {/* Form */}
      {/* <CategorisForm></CategorisForm> */}
      
      <ScholarshipForm></ScholarshipForm>

    </div>
  )
}

export default AddScholarship
