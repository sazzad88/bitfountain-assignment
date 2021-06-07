import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Store, User } from "../store/types";
import { tryLogout } from "../store/actions";

function Menu() {
  const dispatch = useDispatch();
  const user: User = useSelector((state: Store) => state.user);
  const userIcon = useRef<HTMLDivElement>(null);
  const userMenu = useRef<HTMLDivElement>(null);

  const iconClickHandler = (e: MouseEvent) => {
    e.stopPropagation();
    userMenu.current!.style.display = "inline-block";
    setTimeout(() => {
      userMenu.current!.classList.add("menu-open");
    }, 100);
  };

  const menuHideHandler = (e: MouseEvent) => {
    let currentElement = e.target! as HTMLElement;
    if (currentElement.closest(".app-menu") === null) {
      userMenu.current!.classList.remove("menu-open");

      setTimeout(() => {
        userMenu.current!.style.display = "none";
      }, 800);
    }
  };

  useEffect(() => {
    document.querySelector("html")!.addEventListener("click", menuHideHandler);

    userIcon.current!.addEventListener("click", iconClickHandler);

    return () => {
      document
        .querySelector("html")!
        .removeEventListener("click", menuHideHandler);

      if (userIcon.current!)
        userIcon.current!.removeEventListener("click", iconClickHandler);
    };
  }, []);

  return (
    <div className="menu-items">
      <div className="profile" ref={userIcon}>
        <i className="fas fa-user-tie"></i>
      </div>
      <div className="app-menu" ref={userMenu}>
        <div className="account-item">
          <div className="user-icon">
            <i className="fas fa-user-tie"></i>
          </div>
          <div className="email">{user.email}</div>
        </div>

        <ul className="menu-list">
          <li
            className="menu-list-item"
            onClick={() => {
              dispatch(tryLogout());
            }}
          >
            <i className="fas fa-sign-out-alt"></i>
            Sign out
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Menu;
