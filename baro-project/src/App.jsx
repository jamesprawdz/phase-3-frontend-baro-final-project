import { useState } from "react";
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import LoginPage from "./LoginPage"
import Home from "./Home";
import About from "./About";
import BarInfo from "./BarInfo";
import Account from "./Account";
import NewCrawl from "./NewCrawl";
import CrawlList from "./CrawlLists";

function App() {

  const [loggedInUser, setLoggedInUser] = useState(1)
  const [clickedBar, setClickedBar] = useState()
  const [barCrawlData,  setBarCrawlData] = useState()

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
      element: <Home
        setClickedBar={setClickedBar}
        setBarCrawlData={setBarCrawlData}
      />
    },
    {
      path: "/about",
      element: <About/>
    },
    {
      path:"/barinfo",
      element: <BarInfo
        clickedBar={clickedBar}
      />
    },
    {
      path: "/account",
      element: <Account/>
    },
    {
      path: "/newcrawl",
      element: <NewCrawl
        barCrawlData={barCrawlData}
      />
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
