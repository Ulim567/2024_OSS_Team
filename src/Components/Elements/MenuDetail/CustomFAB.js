import React from "react";
import { Link } from "react-router-dom";

import styles from "../../CSS/FAB.module.css";

export default function FAB({ menu }) {
  return (
    <div>
      <button
        className={styles.floatingButton}
        onClick={() => {
          console.log(menu);
        }}
      >
        <Link to={"/create"} state={menu}>
          <img
            className="p-2 m-0"
            src="https://cdn-icons-png.flaticon.com/128/8191/8191573.png"
            width={"60px"}
            height={"60px"}
          ></img>
        </Link>
      </button>
    </div>
  );
}
