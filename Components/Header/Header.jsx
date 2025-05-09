import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Header.module.css";
import { Login, Logo, SignUp } from "..";


const Header = ({ notification, setNotification }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [signup, setSignup] = useState(false);
  const [login, setLogin] = useState(false);
  const [token, setToken] = useState("");

  const menuList = [
    { name: "Home", link: "/" },
    { name: "About", link: "/#" },
    { name: "API", link: "/nfts-api" },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const openModel = (el) => {
    if (el == "Login") {
      setLogin(true);
      setSignup(false);
    } else if (el == "SignUp") {
      setLogin(false);
      setSignup(true);
    }
    closeMenu();
  };

  useEffect(() => {
    const token = localStorage.getItem("NFTApi Token");
    setToken(token);
  }, []);

  const logout = () => {
    localStorage.removeItem("NFTApi Token");
    window.location.reload();
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <Logo className={styles.logo} />
          
          {/* Mobile menu button */}
          <button 
            className={styles.menuToggle}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </button>

          <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
            <ul className={styles.menu}>
              {menuList.map((el, i) => (
                <li key={i}>
                  <Link href={el.link} className={styles.link} onClick={closeMenu}>
                    {el.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className={styles.authButtons}>
              {token ? (
                <button onClick={logout} className={styles.logoutBtn}>
                  Logout
                </button>
              ) : (
                <>
                  <button 
                    onClick={() => openModel("Login")} 
                    className={styles.loginBtn}
                  >
                    Login
                  </button>
                  <button 
                    onClick={() => openModel("SignUp")} 
                    className={styles.signupBtn}
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </nav>
        </div>
      </header>

      {/* Signup Modal */}
      {signup && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <SignUp
              setLogin={setLogin}
              setSignup={setSignup}
              notification={notification}
              setNotification={setNotification}
            />
          </div>
        </div>
      )}

      {/* Login Modal */}
      {login && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <Login
              setLogin={setLogin}
              setSignUp={setSignup}
              notification={notification}
              setNotification={setNotification}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;