import React from "react";
import { Link } from "react-router-dom";

import styles from './navbar.module.css'

function Navbar() {
  return (
    <header className={styles.navbarHeader}>
      <nav className={styles.navbar}>
        <ul>
          <li>
            <Link to='/'>Posts</Link>
          </li>
          <li>
            <Link to='/album'>Album</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;