"use client";
import styles from "./page.module.css";
import { useState } from "react";

type User = {
  id: number;
  name: string;
  buy: number;
  pay: number;
};

export default function Home() {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [userName, setUserName] = useState("");
  return (
    <main className={styles.main}>
      <input
        type="string"
        onChange={(event) => setUserName(event.target.value)}
      />
      <button
        onClick={() =>
          setAllUsers([
            ...allUsers,
            { id: allUsers.length, name: userName, buy: 0, pay: 0 },
          ])
        }
      >
        Add User
      </button>
      <table>
        {allUsers.map((user) => {
          return (
            <tr className="styles.user">
              <td>{user.name}</td>
              <td>{String(user.pay)}</td>
              <td>{String(user.buy)}</td>
            </tr>
          );
        })}
      </table>
    </main>
  );
}
