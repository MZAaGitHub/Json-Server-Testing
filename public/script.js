// Function to fetch users from the JSON Server API and display them

const apiUrl = 'https://json-server-testing.onrender.com/api/users';

// const apiUrl = 'http://localhost:3000/api/users';

function fetchUsers() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(users => {
            const userList = document.getElementById('userList');
            userList.innerHTML = '';

            users.forEach(user => {
                const li = document.createElement('li');
                li.innerHTML = `
          ${user.name} (${user.email})
          <button onclick="editUser(${user.id})">Edit</button>
          <button onclick="deleteUser(${user.id})">Delete</button>
        `;
                userList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching users:', error));
}

// Function to add a new user via the JSON Server API
function addUser(name, email) {
    fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to add user');
            }
            fetchUsers();
        })
        .catch(error => console.error('Error adding user:', error));
}

// Function to delete a user via the JSON Server API
function deleteUser(id) {
    fetch(`${apiUrl}/${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete user');
            }
            fetchUsers();
        })
        .catch(error => console.error('Error deleting user:', error));
}

// Function to update a user via the JSON Server API
function editUser(id) {
    const name = prompt('Enter new name:');
    const email = prompt('Enter new email:');

    if (name && email) {
        fetch(`${apiUrl}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to update user');
                }
                fetchUsers();
            })
            .catch(error => console.error('Error updating user:', error));
    }
}

// Event listener for the "Add User" form submission
const addUserForm = document.getElementById('addUserForm');
addUserForm.addEventListener('submit', event => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    addUser(name, email);
    addUserForm.reset();
});

// Fetch users when the page loads
fetchUsers();
