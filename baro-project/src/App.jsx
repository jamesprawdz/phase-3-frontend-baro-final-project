import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import LoginPage from "./LoginPage"
import Home from "./Home";
import About from "./About";
import BarInfo from "./assets/BarInfo";
import Account from "./Account";
import CreateABarCrawl from "./assets/CreateABarCrawl";
import CrawlList from "./assets/CrawlLists";

function App() {


  const router = createBrowserRouter([
    {
      path: "*",
      element: <div><h1>404 NOT FOUND</h1></div>
    },
    {
      path:"/",
      element: <LoginPage/>
    },
    {
      path: "/home",
      element: <Home/>
    },
    {
      path: "/about",
      element: <About/>
    },
    {
      path:"/barinfo",
      element: <BarInfo/>
    },
    {
      path: "/account",
      element: <Account/>
    },
    {
      path: "/newcrawl",
      element: <CreateABarCrawl/>
    },
    {
      path: "/crawllist",
      element: <CrawlList/>
    }
  ])
  return (


    <div >
      <RouterProvider router={router}/>      
    </div>
  )
}

export default App
