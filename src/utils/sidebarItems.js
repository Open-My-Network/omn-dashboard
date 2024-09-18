import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';

const sidebarItems = [
  { title: 'Home', icon: <HomeIcon /> , path:'/'},
  { title: 'Users', icon: <PersonIcon /> , path:'/users'},
  { title: 'School', icon: <SchoolIcon />, path:'/schools' },
];

export default sidebarItems;
