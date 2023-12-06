import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { logo, user_login_icon, logout_icon } from "assets/img";
import { Button } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import cookie from "react-cookies";
import { useContext } from "react";
import { MyUserContext } from "App";
function MenuAdmin() {
  const [user, dispatch] = useContext(MyUserContext);
  const handleLogout = () => {
    cookie.remove("user");
    dispatch({
      type: "logout",
    });
  };
  return (
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
            to={"/account"}
            className="mt-[15px] items-siderbaradmin font-bold text-text-color-menu text-[20px] flex items-center p-[10px] rounded-full"
          >
            <img
              className="mr-[8px]"
              src={user_login_icon}
              alt=""
              width={25}
              height={25}
            />
            <span>Tài khoản</span>
          </NavLink>
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
  );
}

export default MenuAdmin;
