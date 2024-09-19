import { Home, Person, School, Article } from "@mui/icons-material";

const sidebarItems = [
  { title: 'Home', icon: <Home /> , path:'/'},
  { title: 'Users', icon: <Person /> , path:'/users'},
  { title: 'School', icon: <School />, path:'/schools' },
  { title: 'Posts', icon: <Article />, path:'/articles' },
];

export default sidebarItems;
