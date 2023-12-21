


// assets
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';

// constant
const icons = {AdminPanelSettingsOutlinedIcon };


const viewjobsForAdmin = {
    id: 'planjobs-road',
    type: 'group',
    children: [
      {
        id: 'planjobs',
        title: 'View JobsForAdmin',
        type: 'item',
        url: '/view-jobsForAdmin',
        icon: icons.AdminPanelSettingsOutlinedIcon ,
        breadcrumbs: false
      },
    ]
  };

export default viewjobsForAdmin








