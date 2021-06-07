import React, { useRef, useEffect } from "react";

function Menu() {
  const userIcon = useRef<HTMLDivElement>(null);
  const userMenu = useRef<HTMLDivElement>(null);

  const iconClickHandler = (e: MouseEvent) => {
    e.stopPropagation();
    userMenu.current!.classList.add("menu-open");
  };

  const menuHideHandler = (e: MouseEvent) => {
    let currentElement = e.target! as HTMLElement;
    if (currentElement.closest(".app-menu") === null) {
      userMenu.current!.classList.remove("menu-open");
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
        <a href="#">
          <div className="account-item">
            <div className="user-icon">
              <i className="fas fa-user-tie"></i>
            </div>
            <div className="email">sazzadurrahman88@gmail.com</div>
          </div>
        </a>
        <ul className="menu-list">
          <li className="menu-list-item">
            <i className="fas fa-sign-out-alt"></i>
            Sign out
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Menu;
