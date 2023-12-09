import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "../page/Home";
import DefaultLayout from "../layout/DefaultLayout";
import About from "../page/About";
import AuthLayout from "../layout/AuthLayout";
import "react-toastify/dist/ReactToastify.css";
import VolunteerPage from "page/VolunteerPage/VolunteerPage";
import DonatePage from "page/DonatePage/DonatePage";
import StoryDetailPage from "page/StoryDetailPage/StoryDetailPage";
import StoryPage from "page/StoryPage/StoryPage";
import Campaign from "page/Campaign";
import Report from "page/Report";
import Grateful from "page/Grateful";
import New from "page/New";
import NewDetails from "page/NewDetails";
import MediaPage from "page/MediaPage/MediaPage";
import MediaImage from "page/MediaPage/MediaImagePage";
import MediaVideo from "page/MediaPage/MediaVideoPage";


export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<Home />} />
        <Route path="gioithieu" element={<About />} />
        <Route path="thamgia" element={<VolunteerPage />} />
        <Route path="thuvienanh" element={<MediaPage />} />
        <Route path="mediaImage/:idcampaign" element={<MediaImage />} />
        <Route path="mediaVideo/:idcampaign" element={<MediaVideo />} />
        <Route path="chiendich" element={<Campaign />} />
        <Route path="baocao" element={<Report />} />
        <Route path="trian" element={<Grateful />} />
        <Route path="tintuc" element={<New />} />
        <Route path="quyengop" element={<DonatePage />} />
        <Route path="cauchuyen" element={<StoryPage />} />
        <Route path="news-details/:id" element={<NewDetails />} />
        <Route path="cauchuyen-chitiet/:id" element={<StoryDetailPage />} />
      </Route>
    </>
  )
);
