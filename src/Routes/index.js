import Login from "../components/Layout/Login/Login";
import Home from "../Pages/Home/Home";
import Profile from "../Pages/Profiles/Profiles";
import ShareFiles from "../Pages/ShareFiles/ShareFile";
import YourFiles from "../Pages/YourFiles/YourFile";

const PublicRouter = [
  { path: "/", component: Home },
  { path: "/files", component: YourFiles },
  { path: "/share", component: ShareFiles },
  { path: "/profile", component: Profile },
];

export default PublicRouter;
