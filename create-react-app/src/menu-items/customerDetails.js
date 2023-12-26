


// assets
import { IconBrandChrome } from '@tabler/icons';

// constant
const icons = { IconBrandChrome }; // Use IconBrandChrome or any other desired icon

const customerDetails = {
  id: 'customerDetails-road',
  type: 'group',
  children: [
    {
      id: ' View Customer',
      title: ' View Customers',
      type: 'item',
      url: '/customer-Details/',
      icon: icons.IconBrandChrome, // Replace with the desired icon component
      breadcrumbs: false
    },
  ]
};




export default customerDetails