"use client";

import styles from "./page.module.css";

export default function Home() {
  const loginObj = {
    id: "Hello",
    name: "World",
    password: "HelloWorld",
    email: "Hello@World.com",
  };
  const postHome = () => {
    fetch("http://localhost:80/api/", {
      method: "POST",
      credentials: "include",
    });
  };

  const postHello = () => {
    fetch("http://localhost:80/api/hello", {
      method: "POST",
      credentials: "include",
    });
  };
  const postLogin = () => {
    fetch("http://localhost:80/api/login", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(loginObj),
    });
  };

  const postLogout = () => {
    fetch("http://localhost:80/api/logout", {
      method: "POST",
      credentials: "include",
    });
  };

  const postCookie = () => {
    fetch("http://localhost:80/api/cookie", {
      method: "POST",
      credentials: "include",
    });
  };

  const postAuth = () => {
    fetch("http://localhost:80/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(loginObj),
    });
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.div}>
          <button
            onClick={() => {
              postHome();
            }}
          >
            Home
          </button>
        </div>

        <div className={styles.div}>
          <button
            onClick={() => {
              postHello();
            }}
          >
            Hello
          </button>
        </div>

        <div className={styles.div}>
          <button
            onClick={() => {
              postLogin();
            }}
          >
            Login
          </button>
        </div>

        <div className={styles.div}>
          <button
            onClick={() => {
              postLogout();
            }}
          >
            Logout
          </button>
        </div>

        <div className={styles.div}>
          <button
            onClick={() => {
              postCookie();
            }}
          >
            Cookie
          </button>
        </div>

        <div className={styles.div}>
          <button
            onClick={() => {
              postAuth();
            }}
          >
            Auth
          </button>
        </div>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
