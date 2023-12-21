
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';

// constant
const icons = {  AssignmentOutlinedIcon};


const finaljobs = {
    id: 'finaljobs-road',
    type: 'group',
    children: [
      {
        id: 'Finaljobs',
        title: 'Plan Jobs',
        type: 'item',
        // url: '/final-jobs/:index',
        url: '/final-jobs/:JobNo',
        icon: icons.AssignmentOutlinedIcon,
        breadcrumbs: false
      },
    ]
  };

export default finaljobs 








