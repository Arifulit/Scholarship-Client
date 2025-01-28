import { Bs1SquareFill, Bs7SquareFill, BsCSquareFill, BsFillHouseAddFill } from 'react-icons/bs'
import { MdHomeWork, MdOutlineManageHistory } from 'react-icons/md'
import MenuItem from './MenuItem'
const ModeratorMenu = () => {
  return (
    <>

     <MenuItem
        icon={MdHomeWork}
        label='Add Scholarship'
        // address='add-scholarship'
        address='add-scholarship'
      />
      <MenuItem
        icon={BsFillHouseAddFill}
        label='Manage Scholarship'
        // address='manage-scholarship'
        address='manage-scholarship'
      />
    
      {/* <MenuItem icon={MdHomeWork} label='My Inventory' address='my-inventory' /> */}
      <MenuItem
        icon={MdOutlineManageHistory}
        label='All Applied Scholarship'
        address='manage-orders'
      />
    </>
  )
}

export default ModeratorMenu
