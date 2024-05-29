import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const openDialog = () => {};

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get("/getAllUsers.php");
        if (response.data.success) {
          setUsers(response.data.data); // Assuming the API returns a 'data' field with the array of users
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    fetchUsers();
  }, []);

  const deleteUser = async (userId) => {
    try {
      const formData = new URLSearchParams();
      formData.append("id", userId);

      const response = await axios.post("/deleteUser.php", formData);
      if (response.data.success) {
        // If user is deleted successfully, filter them out from the UI
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="main flex-2">
      <div className="tab-content" id="profile">
        <div className="flex justify-between">
          <h2>Users</h2>
          <Link to="/admin/adduser">
            <button className="add-button">Add User</button>
          </Link>
        </div>

        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>User Name</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.role}</td>
                <td className="flex justify-end">
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminUsers;
