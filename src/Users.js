import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { addDoc, collection, getDocs } from "firebase/firestore";
import "./users.css";
import { db } from "./db";

function Users() {
  const [userArray, setUserArray] = useState([]);
  const [list, setList] = useState();
  const [sort, setSort] = useState(false);
  const [newObj, setNewObj] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersData = [];
        querySnapshot.forEach((doc) => {
          usersData.push(doc.data());
        });
        setUserArray(usersData);

        let Obj = [];
        let dates = [];
        usersData.forEach((i) => {
          dates.push(i.dob);
        });

        dates = sortDatesByDayMonthAndGetIndex(dates);
        usersData.forEach((i) => {
          console.log(dates.indexOf(i.dob), i.dob);
          Obj[dates.indexOf(i.dob)] = i;
        });
        setNewObj(Obj);

        setList(
          (sort ? newObj : usersData).map((val, key) => {
            return (
              <tr key={key}>
                <td>{val.name}</td>
                <td>{val.number}</td>
                <td>{val.dob}</td>
              </tr>
            );
          })
        );
      } catch (error) {
        console.error("Error getting users: ", error);
      }
    };

    // getUsers();
    const unsortedDates = [
      "2021-05-15",
      "2024-04-30",
      "2023-07-20",
      "2022-12-31",
      "2029-05-01",
    ];
    const sortedDates = sortDatesByDayMonthAndGetIndex(unsortedDates);
    console.log(sortedDates);
    getUsers();
  }, []); // E

  function sortDatesByDayMonthAndGetIndex(dates) {
    const today = new Date();
    const todayMonth = today.getMonth() + 1; // Month is zero-indexed, so add 1
    const todayDay = today.getDate();

    // Define a custom comparator function to compare only day and month
    const compareDates = (date1, date2) => {
      const [month1, day1] = date1.split("-").slice(1); // Extract month and day
      const [month2, day2] = date2.split("-").slice(1); // Extract month and day

      if (month1 !== month2) {
        return month1 - month2; // Compare months
      } else {
        return day1 - day2; // If months are equal, compare days
      }
    };

    // Sort the dates using the custom comparator
    dates.sort(compareDates);

    // Find the index of the date just after today's date
    let index = 0;
    for (let i = 0; i < dates.length; i++) {
      const [month, day] = dates[i].split("-").slice(1); // Extract month and day
      if (month > todayMonth || (month === todayMonth && day >= todayDay)) {
        index = i;
        break;
      }
    }

    let a = dates.slice(0, index);
    let b = dates.slice(index, dates.length);
    return b.concat(a);
  }

  // Example usage:
  const unsortedDates = [
    "2023-05-15",
    "2022-02-10",
    "2022-07-20",
    "2022-12-31",
  ];

  // sortDatesByDayMonthAndGetIndex(unsortedDates);
  // console.log(sortedDates);
  // console.log(nextDateIndex);

  let handleSort = () => {
    console.log("hi");
    if (sort) {
      setList(
        userArray.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.name}</td>
              <td>{val.number}</td>
              <td>{val.dob}</td>
            </tr>
          );
        })
      );
      setSort(false);
    } else {
      setList(
        newObj.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.name}</td>
              <td>{val.number}</td>
              <td>{val.dob}</td>
            </tr>
          );
        })
      );
      setSort(true);
    }
  };

  return (
    <div className="users-main">
      <h1>Users</h1>
      <p></p>
      <table>
        <tr>
          <th>Name</th>
          <th>Number</th>
          <th onClick={handleSort}>BirthDate</th>
        </tr>
        {list}
      </table>
    </div>
  );
}

export default Users;
