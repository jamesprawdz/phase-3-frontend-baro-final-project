import { useState, useEffect } from "react";
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import LoginPage from "./LoginPage"
import Home from "./Home";
import About from "./About";
import BarInfo from "./BarInfo";
import Account from "./Account";
import NewCrawl from "./NewCrawl";
import CrawlList from "./CrawlLists";

function App() {

  //global states that sibiling compnenets may need to access
  const [loggedInUser, setLoggedInUser] = useState()
  const [clickedBar, setClickedBar] = useState()
  const [barCrawlData,  setBarCrawlData] = useState() 


  //all the routes
  const router = createBrowserRouter([
    {
      path: "*",
      element: <div><h1>404 NOT FOUND</h1></div>
    },
    {
      path:"/",
      element: <LoginPage
        setLoggedInUser={setLoggedInUser}
      />
    },
    {
      path: "/home",
      element: <Home
        setClickedBar={setClickedBar}
        setBarCrawlData={setBarCrawlData}
        setLoggedInUser={setLoggedInUser}
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
        loggedInUser={loggedInUser}
      />
    },
    {
      path: "/account",
      element: <Account
        loggedInUser={loggedInUser}
      />
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
        <head>
          <title>Baro</title>
        </head>
      <RouterProvider router={router}/>      
    </div>
  )
}

export default App
