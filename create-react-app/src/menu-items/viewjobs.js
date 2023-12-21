
// assets


import SourceOutlinedIcon from '@mui/icons-material/SourceOutlined';

// constant
const icons = {  SourceOutlinedIcon };


const newjobs = {
    id: 'view-roadmap',
    type: 'group',
    children: [
      {
        id: 'view-page',
        title: 'View Jobs ',
        type: 'item',
        url: '/view-jobs',
        icon: icons.SourceOutlinedIcon ,
        breadcrumbs: false
      },
     
    ]
  };

export default newjobs

