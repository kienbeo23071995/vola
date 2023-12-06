import { faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  task_report_icon,
  donor_icon,
  milestones_icon,
  news_icon,
  story_icon,
  financial_report_icon,
  issue_icon,
} from "assets/img";
import { useState } from "react";
import { NavLink } from "react-router-dom";

function MenuCommunicationsManager() {
  const [showSubMenu, setShowSubMenu] = useState(false);
  const handleShowMenu = () => {
    setShowSubMenu((prev) => {
      return !prev;
    });
  };
  return (
    <>
      <ul>
        <li>
          <NavLink
            to={"/admin/baocaonhiemvu"}
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
            to={"/admin/trian"}
            className="mt-[15px] items-siderbaradmin font-bold text-text-color-menu text-[20px] flex items-center p-[10px] rounded-full"
          >
            <img
              className="mr-[8px]"
              src={donor_icon}
              alt=""
              width={25}
              height={25}
            />
            <span>Tri ân</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/admin/mocsukien"}
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
        <li>
          <NavLink
            to={"/admin/tintuc"}
            className="mt-[15px] items-siderbaradmin font-bold text-text-color-menu text-[20px] flex items-center p-[10px] rounded-full"
          >
            <img
              className="mr-[8px]"
              src={news_icon}
              alt=""
              width={25}
              height={25}
            />
            <span>Tin tức</span>
          </NavLink>
        </li>
      </ul>
      <hr className="bg-[#A2A2A2] my-[30px]" />
      <ul>
        <li>
          <NavLink
            to={"/media/cauchuyen"}
            className="mt-[15px] items-siderbaradmin font-bold text-text-color-menu text-[20px] flex items-center p-[10px] rounded-full"
          >
            <img
              className="mr-[8px]"
              src={story_icon}
              alt=""
              width={25}
              height={25}
            />
            <span>Câu chuyện</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/admin/baocaotaichinh"}
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
                  <NavLink className="link-submenu" to={"/admin/danhsachvande"}>
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
    </>
  );
}

export default MenuCommunicationsManager;
