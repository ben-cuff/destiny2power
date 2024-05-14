import React from "react";
import Link from "next/link";
import styles from "../../styles/NavBar.module.css";

const Navbar = () => {
  return (
    <div className={styles.mainBody}>
      <Link href="/" className={styles.titleText}>
        Destiny 2 Power
      </Link>
      <ul className={styles.listElements}>
        <li>
          <Link href="/bounties">
            <p>Bounties</p>
          </Link>
        </li>
        <li>
          <Link href="/optimizer">
            <p>Optimizer</p>
          </Link>
        </li>
        <li>
          <Link href="/settings">
            <p>Settings</p>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
