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
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList />
        <FormAddFriend />
        <button className="button">Add friend</button>
      </div>
      <FormSplitBill />
    </div>
  );
}

function FriendList() {
  const friend = initialFriends;
  return (
    <ul>
      {friend.map((friend) => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </ul>
  );
}

function Friend({ friend }) {
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
        <button className="button">select</button>
      </li>
    </div>
  );
}

function FormAddFriend() {
  return (
    <form className="form-add-friend">
      <label> Friend name</label>
      <input type="text" placeholder="enter the name" />
      <label>📷 image URL</label>
      <input type="text" />
      <button className="button">Add</button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split A bill with x</h2>
      <label>💸 Bill value</label>
      <input type="text" />
      <label>💲 your expense</label>
      <input type="text" />
      <label>X's expense</label>
      <input type="text" disabled />
      <label>Who is palying the bill</label>
      <select>
        <option value="user">You</option>
        <option value="friend">x</option>
      </select>
      <button className="button">Split bill</button>
    </form>
  );
}
