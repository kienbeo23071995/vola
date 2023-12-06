import { logout_icon, logo } from "assets/img";
import { Link } from "react-router-dom";
import { MyUserContext } from "App";
import { useContext } from "react";
import cookie from "react-cookies";
import MenuAdmin from "./MenuAdmin";
import MenuCaptain from "./MenuCaptain";
import MenuPlanningManager from "./MenuPlanningManager";
import MenuCommunicationsManager from "./MenuCommunicationsManager";
import MenuTreasurer from "./MenuTreasurer";

function AdminSidebar() {
  const [user, dispatch] = useContext(MyUserContext);
  const handleLogout = () => {
    cookie.remove("user");
    dispatch({
      type: "logout",
    });
  };
  return (
    <div className="h-[100vh] flex flex-column">
      <Link
        to={"/"}
        className="wrapper_logo_footer flex items-center mt-[25px]"
      >
        <img src={logo} alt="" />
        <h5 className="text-logo text-[13px] text-center ml-[8px]">
          ĐỘI SVTN ĐỒNG HƯƠNG NGHỆ AN <br></br> TRƯỜNG ĐẠI HỌC Y HÀ NỘI
        </h5>
      </Link>

      <p
        onClick={handleLogout}
        to={"#"}
        className="mt-auto mb-[25px] items-siderbaradmin font-bold text-text-color-menu text-[20px] flex items-center p-[10px] rounded-[12px] bg-white cursor-pointer"
      >
        <img
          className="mr-[8px]"
          src={logout_icon}
          alt=""
          width={25}
          height={25}
        />
        <span>ĐĂNG XUẤT</span>
      </p>
    </div>
  );
}

export default AdminSidebar;
