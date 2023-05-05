import { createBrowserRouter } from "react-router-dom";
import ChartComponent from "../../components/chartComponent/ChartComponent";
import App from "./../App";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/chart",
    element: <ChartComponent />,
  },
]);
