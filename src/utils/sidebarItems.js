import { Home, Person, School, Article, Lightbulb, Book } from "@mui/icons-material";

const sidebarItems = [
  { title: 'Home', icon: <Home /> , path:'/'},
  { title: 'Users', icon: <Person /> , path:'/users'},
  { title: 'School', icon: <School />, path:'/schools' },
  { title: 'Posts', icon: <Article />, path:'/articles' },
  { title: 'Courses', icon: <Book />, path:'/courses' },
  { title: 'Development Plan', icon: <Lightbulb />, path:'/development-plan' },
];

export default sidebarItems;
