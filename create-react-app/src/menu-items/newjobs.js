// assets
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import AddIcon from '@mui/icons-material/Add';

// constant
const icons = { WorkOutlineOutlinedIcon, AddIcon };

const newjobs = {
  id: 'new-roadmap',
  type: 'group',
  children: [
    {
      id: 'new-page',
      title: 'New Jobs',
      type: 'item',
      url: '/new-jobs/',
      icon: icons.WorkOutlineOutlinedIcon, // Use MUI WorkOutlineOutlined icon
      breadcrumbs: false
    },
    // Add more items if needed
  ]
};

export default newjobs;
