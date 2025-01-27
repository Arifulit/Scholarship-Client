import { Bs1SquareFill, Bs7SquareFill, BsCSquareFill, BsFillHouseAddFill } from 'react-icons/bs'
import { MdHomeWork, MdOutlineManageHistory } from 'react-icons/md'
import MenuItem from './MenuItem'
const ModeratorMenu = () => {
  return (
    <>
      <MenuItem
        icon={BsFillHouseAddFill}
        label='manage-scholarship'
        // address='manage-scholarship'
        address='manage-scholarship'
      />
      <MenuItem
        icon={Bs7SquareFill}
        label='add-scholarship'
        // address='add-scholarship'
        address='add-scholarship'
      />
      <MenuItem icon={MdHomeWork} label='My Inventory' address='my-inventory' />
      <MenuItem
        icon={MdOutlineManageHistory}
        label='Manage Orders'
        address='manage-orders'
      />
    </>
  )
}

export default ModeratorMenu
