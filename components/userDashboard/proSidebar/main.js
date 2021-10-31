import React, { useEffect, useRef } from "react";
import styles from '../../../styles/sidebar/layout.module.css'

export default function ToolBar({ user = "John Snow", toggler, state }) {
  let bars = useRef(null);
  const ToggleController = () => {
    toggler();
  };
  useEffect(() => {
    if (state) {
      bars.current.classList.add(styles.barsTimes);
    } else {
      bars.current.classList.remove(styles.barsTimes);
    }
  }, [state]);
  return (
    <div className={styles.toolBar}>
      <div className={styles.contents}>
        {/* <div className={styles.signOutWrapper}>
          <span>Sign Out</span>
          <i className="fa fa-sign-in ml-4"></i>
        </div> */}
        <div
          className={styles.togglerWrapper}
          onClick={() => ToggleController()}
        >
          <div className={styles.barToggler} ref={bars}></div>
        </div>
      </div>
     
    </div>
  );
}
