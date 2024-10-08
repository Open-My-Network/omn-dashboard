import { Home, Person, School, Article, Lightbulb, Book, Web } from "@mui/icons-material";

const sidebarItems = [
  { title: 'Website', icon: <Web />, path:'https://openmynetwork.com' },
  { title: 'Home', icon: <Home /> , path:'/'},
  { title: 'Users', icon: <Person /> , path:'/users'},
  { title: 'School', icon: <School />, path:'/schools' },
  { title: 'Posts', icon: <Article />, path:'/articles' },
  { title: 'Courses', icon: <Book />, path:'/courses' },
  { title: 'Development Plan', icon: <Lightbulb />, path:'/development-plan' },
  { title: 'Website', icon: <Lightbulb />, path:'https://openmynetwork.com' },
];

export default sidebarItems;
