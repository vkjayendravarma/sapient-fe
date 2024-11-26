import React from 'react';
import './App.scss';
// import { createBrowserRouter } from 'react-router-dom';
import LoginPageComponent from './pages/login/login.page';
import SignupPageComponent from './pages/signup/signup.page';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import WeatherReportPage from './pages/weather/weather.page';


function App() {

  const createRouter = createBrowserRouter([
    {
      path: "/",
      Component: LoginPageComponent
    }, {
      path: "/login",
      Component: LoginPageComponent
    }, {
      path:"/signup",
      Component: SignupPageComponent
    },{
      path: "/weather",
      Component: WeatherReportPage
    }
  ])
  return (
    <div className="App">
     <RouterProvider router={createRouter}/>
    </div>
  );
}

export default App;
