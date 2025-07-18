const container = document.getElementById("users");

async function fetchUsers() {
    try {
        const response = await fetch("http://localhost:3000/api/users");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        displayUsers(data.users);
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}

fetchUsers();

function displayUsers(users) {
    container.innerHTML = ""; // Clear previous content
    users.forEach((user) => {
        const userDiv = document.createElement("div");
        userDiv.className = "user";
        userDiv.innerHTML = `
            <h2>${user.username}</h2>
            <p>Email: ${user.email}</p>
            <button onclick="deleteUser('${user._id}')">Delete User</button>
        `;
        container.appendChild(userDiv);
    });
}

async function deleteUser(userId) {
    try {
        const response = await fetch(
            `http://localhost:3000/api/user/${userId}`,
            {
                method: "DELETE",
            }
        );
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data.message);
        fetchUsers(); // Refresh the user list
    } catch (error) {
        console.error("Error deleting user:", error);
    }
}

document.getElementById("loginButton").addEventListener("click", (event) => {
    event.preventDefault(); // Prevent form submission
    loginUser();
});

async function loginUser() {
    const email = document.getElementById("usernameLogin").value;
    const password = document.getElementById("passwordLogin").value;

    try {
        const response = await fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error("Login failed");
        }

        const data = await response.json();
        console.log("Login successful:", data);
        localStorage.setItem("userId", data.user.id);
        document.getElementById(
            "userId"
        ).textContent = `User ID: ${data.user.id}`;
        // Redirect or update UI as needed
    } catch (error) {
        console.error("Error logging in:", error);
    }
}
