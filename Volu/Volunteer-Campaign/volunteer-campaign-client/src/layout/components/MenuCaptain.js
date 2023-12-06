import { faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  campaign_icon,
  report_icon,
  task_report_icon,
  milestones_icon,
  financial_report_icon,
  issue_icon,
} from "assets/img";
import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { logo, user_login_icon, logout_icon } from "assets/img";
import cookie from "react-cookies";
import { MyUserContext } from "App";

function MenuCaptain() {
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [user, dispatch] = useContext(MyUserContext);
  const handleShowMenu = () => {
    setShowSubMenu((prev) => {
      return !prev;
    });
  };
  const handleLogout = () => {
    cookie.remove("user");
    dispatch({
      type: "logout",
    });
  };
  return (
    <>
      <div className="h-[100vh] flex flex-column">
        <div className="wrapper_logo_footer flex items-center mt-[25px]">
          <img src={logo} alt="" />
          <h5 className="text_logo text-[13px] text-center ml-[8px]">
            ĐỘI SVTN ĐỒNG HƯƠNG NGHỆ AN <br></br> TRƯỜNG ĐẠI HỌC Y HÀ NỘI
          </h5>
        </div>
        <ul>
          <li>
            <NavLink
              to={"/admin/chiendich"}
              className="mt-[15px] items-siderbaradmin font-bold text-text-color-menu text-[20px] flex items-center p-[10px] rounded-full"
            >
              <img
                className="mr-[8px]"
                src={campaign_icon}
                alt=""
                width={25}
                height={25}
              />
              <span>Chiến dịch</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/caption/baocao"}
              className="mt-[15px] items-siderbaradmin font-bold text-text-color-menu text-[20px] flex items-center p-[10px] rounded-full"
            >
              <img
                className="mr-[8px]"
                src={report_icon}
                alt=""
                width={25}
                height={25}
              />
              <span>Báo cáo</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/caption/baocaonhiemvu"}
              className="mt-[15px] items-siderbaradmin font-bold text-text-color-menu text-[20px] flex items-center p-[10px] rounded-full"
            >
              <img
                className="mr-[8px]"
                src={task_report_icon}
                alt=""
                width={25}
                height={25}
              />
              <span>Báo cáo nhiệm vụ</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/caption/mocsukien"}
              className="mt-[15px] items-siderbaradmin font-bold text-text-color-menu text-[20px] flex items-center p-[10px] rounded-full"
            >
              <img
                className="mr-[8px]"
                src={milestones_icon}
                alt=""
                width={25}
                height={25}
              />
              <span>Mốc sự kiện</span>
            </NavLink>
          </li>
        </ul>
        <hr className="bg-[#A2A2A2] my-[30px]" />
        <ul>
          <li>
            <NavLink
              to={"/caption/baocaotaichinh"}
              className="mt-[15px] items-siderbaradmin font-bold text-text-color-menu text-[20px] flex items-center p-[10px] rounded-full"
            >
              <img
                className="mr-[8px]"
                src={financial_report_icon}
                alt=""
                width={25}
                height={25}
              />
              <span>Báo cáo tài chính</span>
            </NavLink>
          </li>
          <li>
            <p
              onClick={handleShowMenu}
              className="cursor-pointer mt-[15px] items-siderbaradmin font-bold text-text-color-menu text-[20px] flex items-center p-[10px] rounded-full relative"
            >
              <img
                className="mr-[8px]"
                src={issue_icon}
                alt=""
                width={25}
                height={25}
              />
              <span>Vấn đề</span>
              {!showSubMenu ? (
                <FontAwesomeIcon
                  className="ml-auto text-[25px]"
                  icon={faAngleRight}
                />
              ) : (
                <FontAwesomeIcon
                  className="ml-auto text-[25px]"
                  icon={faAngleDown}
                />
              )}
              {!showSubMenu ? (
                <></>
              ) : (
                <ul className="list-submenu absolute top-[100%]">
                  <li className="item-submenu font-normal p-[10px] pl-[30px]">
                    <NavLink
                      className="link-submenu"
                      to={"/admin/danhsachvande"}
                    >
                      Danh sách vấn đề
                    </NavLink>
                  </li>
                  <li className="item-submenu font-normal p-[10px] pl-[30px]">
                    <NavLink className="link-submenu" to={"/admin/vandecuatoi"}>
                      Vấn đề của tôi
                    </NavLink>
                  </li>
                </ul>
              )}
            </p>
          </li>
        </ul>
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
    </>
  );
}

export default MenuCaptain;
