import React, { useEffect, useRef, useState } from "react";
// import Head from "next/head";
import styles from '../../../styles/sidebar/layout.module.css'
import SideBar from "./sidebar";
import ToolBar from "./main"

export default function ThirdLayout(props) {
  const [open, setOpen] = useState(false)
  let sideBar = useRef(null);

  const handleSideBar = () => {

    if (open) {
      sideBar.current.classList.add(styles.open)
    }
    else {
      sideBar.current.classList.remove(styles.open)
    }
  }

  useEffect(() => {
    handleSideBar()
  }, [open])
  const handleOpen = () => {
    setOpen(!open)
  }
  return (
    <>
      <section className={styles.layout}>
        <div className={styles.sideBarWrapper} ref={sideBar}>
          <SideBar />
        </div>
       
        <div className={styles.toolBarchildWrapper}>
          <div className={styles.toolBarWrapper}>
            <ToolBar toggler={handleOpen} state={open} />
          </div>
          {/* <div className={styles.childrenWrapper}>
              <div className='' style={{ width:'100%'}}>
              
              </div>
          </div> */}
          {props.children}
        </div>

      </section>

    </>
  );
}
