"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  buy: number;
  pay: number;
  topay: boolean;
};

const STORAGE_KEY_DARK_MODE = "myapp.example.com/darkMode";

export default function Home() {
  // localStorageに記録する
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [userToPay, setUserToPay] = useState(0);
  // localStorageに記録しない
  const [userName, setUserName] = useState("");
  const [userPay, setUserPay] = useState(0);
  const [payPerson, setPayPerson] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    if (!isLoaded) {
      const stragedAllUsers = localStorage.getItem("allUsers");
      const stragedUserToPay = localStorage.getItem("userToPay");
      if (stragedAllUsers !== null) {
        setAllUsers(JSON.parse(stragedAllUsers));
      }
      if (stragedUserToPay !== null) {
        setUserToPay(JSON.parse(stragedUserToPay));
      }
      setIsLoaded(true);
    } else {
      localStorage.setItem("allUsers", JSON.stringify(allUsers));
      localStorage.setItem("userToPay", JSON.stringify(userToPay));
    }
  }, [allUsers, userToPay]);

  return (
    <main className={styles.main}>
      <input
        type="string"
        onChange={(event) => setUserName(event.target.value)}
      />
      <button
        onClick={() => {
          setAllUsers([
            ...allUsers,
            {
              id: allUsers.length,
              name: userName,
              buy: 0,
              pay: 0,
              topay: true,
            },
          ]);
          setUserToPay(userToPay + 1);
        }}
      >
        Add User
      </button>
      <label>支払い対象</label>
      {allUsers.map((user, i) => {
        return (
          <div key={i}>
            <p>{user.name}</p>
            <input
              type="checkbox"
              defaultChecked={user.topay}
              onChange={(event) => {
                setAllUsers(
                  allUsers.map((user, j) => {
                    if (i == j) {
                      return { ...user, topay: event.target.checked };
                    }
                    if (user.topay)
                      setUserToPay(userToPay + (event.target.checked ? 1 : -1));
                    return user;
                  })
                );
              }}
            />
          </div>
        );
      })}
      <label>支払う人</label>
      <select
        onChange={(event) => {
          setPayPerson(Number(event.target.value));
        }}
      >
        <option />
        {allUsers.map((user, i) => {
          return (
            <option key={i} value={user.id}>
              {user.name}
            </option>
          );
        })}
      </select>
      <label>金額</label>
      <input
        type="number"
        onChange={(event) => setUserPay(Number(event.target.value))}
      />

      <button
        onClick={() => {
          setAllUsers(
            allUsers.map((user, j) => {
              const payMoney = user.topay ? userPay / userToPay : 0;
              if (payPerson == j) {
                return {
                  ...user,
                  pay: user.pay + userPay,
                  buy: user.buy + payMoney,
                };
              } else {
                return {
                  ...user,
                  buy: user.buy + payMoney,
                };
              }
            })
          );
        }}
      >
        Pay
      </button>
      <table className="styles.table">
        <thead>
          <tr className="styles.tr">
            <th className="styles.th">Name</th>
            <th className="styles.th">Pay</th>
            <th className="styles.th">Buy</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user, i) => {
            return (
              <tr key={i} className="styles.tr">
                <td className="styles.td">{user.name}</td>
                <td className="styles.td">{String(user.pay)}</td>
                <td className="styles.td">{String(user.buy)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>{userToPay}</div>
      <label>初期化する</label>
      <button
        onClick={() => {
          localStorage.clear();
          setAllUsers([]);
          setUserToPay(0);
        }}
      >
        Clear
      </button>
    </main>
  );
}
