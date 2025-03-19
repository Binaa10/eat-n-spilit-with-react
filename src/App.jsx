import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [added, setAdded] = useState(initialFriends);
  const [select, setSelect] = useState(null);

  function handleToDrop(friend) {
    setSelect(select?.id === friend.id ? null : friend);
    //setSelect(friend);
    setShowAddFriend(false);
  }

  function handleAdd(friend) {
    setAdded((added) => [...added, friend]);
    setShowAddFriend(false);
  }
  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }

  function handleSplitBill(value) {
    console.log(value);
    setAdded((added) =>
      added.map((friend) =>
        friend.id === select.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelect(null);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friend={added}
          handleToDrop={handleToDrop}
          select={select}
        />
        {showAddFriend && <FormAddFriend onAdded={handleAdd} />}

        <button className="button" onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add friend"}
        </button>
      </div>
      {select && (
        <FormSplitBill
          friend={added}
          select={select}
          onHandleSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
}

function FriendList({ friend, handleToDrop, select }) {
  return (
    <ul>
      {friend.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          handleToDrop={handleToDrop}
          select={select}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, handleToDrop, select }) {
  return (
    <div>
      <li>
        <img src={friend.image} alt={friend.name} />
        <h3>{friend.name}</h3>
        {friend.balance < 0 && (
          <p className="red">
            You owe {friend.name} {Math.abs(friend.balance)}€
          </p>
        )}
        {friend.balance > 0 && (
          <p className="green">
            {friend.name} owes you {Math.abs(friend.balance)}€
          </p>
        )}
        {friend.balance === 0 && <p>you and {friend.name} are even</p>}
        <button className="button" onClick={() => handleToDrop(friend)}>
          {select?.id === friend.id ? "close" : "select"}
        </button>
      </li>
    </div>
  );
}

function FormAddFriend({ onAdded }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend = { id, name, image: `${image}?=${id}`, balance: 0 };

    onAdded(newFriend);
    setName("");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>Friend name</label>
      <input
        type="text"
        placeholder="enter the name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>📷 image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <button className="button">Add</button>
    </form>
  );
}

function FormSplitBill({ select, onHandleSplitBill }) {
  const [bill, setBill] = useState("");
  const [expense, setExpense] = useState("");
  const [whoIsPaying, setWhoIsPaying] = useState("user");
  const paidByFriend = bill ? bill - expense : "";

  function handleSplitBill(e) {
    e.preventDefault();

    if (!bill || !expense) return;
    onHandleSplitBill(whoIsPaying === "user" ? paidByFriend : -expense);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSplitBill}>
      <h2>Split A bill with {select.name} </h2>
      <label>💸 Bill value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />
      <label>💲 your expense</label>
      <input
        type="text"
        value={expense}
        onChange={(e) =>
          setExpense(
            Number(e.target.value) > bill ? expense : Number(e.target.value)
          )
        }
      />
      <label>👮‍♀️{select.name}'s expense</label>
      <input
        type="text"
        disabled
        value={paidByFriend}
        onChange={(e) => paidByFriend(Number(e.target.value))}
      />
      <label>🤷‍♀️Who is paying the bill</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{select.name}</option>
      </select>
      <button className="button">Split bill</button>
    </form>
  );
}
