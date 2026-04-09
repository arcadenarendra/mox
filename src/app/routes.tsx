import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Calendar from "./pages/Calendar";
import Partnership from "./pages/Partnership";
import Contact from "./pages/Contact";
import Clubs from "./pages/Clubs";
import Programmes from "./pages/Programmes";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "events", Component: Events },
      { path: "events/:eventId", Component: EventDetail },
      { path: "calendar", Component: Calendar },
      
      { path: "partnership", Component: Partnership },
      { path: "clubs", Component: Clubs },
      { path: "programmes", Component: Programmes },
      { path: "contact", Component: Contact },
      { path: "*", Component: NotFound },
    ],
  }
])
