import "./App.css";
import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [edit, setEdit] = useState(false);
  const [active, setActive] = useState(null);

  const [users, setUsers] = useState([]);

  const addUsers = (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      address,
    };

    if (edit) {
      // update user
      let copy = users;
      Object.assign(copy[active], user);
      setUsers([...copy]);
    } else {
      //add user
      setUsers([...users, user]);
    }

    setName("");
    setEmail("");
    setAddress("");
  };

  const editClick = (index) => {
    const user = users[index];

    setName(user.name);
    setEmail(user.email);
    setAddress(user.address);

    setActive(index);
    setEdit(true);
  };

  const deleteUser = (user) => {
    if (window.confirm("Are you shure want to delete?")) {
      let copy = users.filter((item) => item !== user);
      setUsers([...copy]);
    }
  };

  return (
    <div className="App">
      <h1>Employee Management</h1>
      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button onClick={addUsers}>{edit ? "update" : "ADD"}</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>
                  <button onClick={() => editClick(index)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => deleteUser(user)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
