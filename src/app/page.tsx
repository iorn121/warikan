"use client";
import styles from "./page.module.css";
import { useState } from "react";

type User = {
  id: number;
  name: string;
  buy: number;
  pay: number;
};

type Users = {
  num: number;
  users: User[];
};

export default function Home() {
  const [numPeople, setNumPeople] = useState(0);
  return (
    <main className={styles.main}>
      <input
        type="number"
        value={numPeople}
        onChange={(event) => setNumPeople(Number(event.target.value))}
      />
      <div>{numPeople}</div>
    </main>
  );
}
