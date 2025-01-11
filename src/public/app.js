
const apiUrl = `${window.location.origin}/usuarios`;

console.log('API URL:', apiUrl);

async function addUser() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const age = document.getElementById('age').value;

    if (firstName && lastName && age) {
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ firstName, lastName, age: parseInt(age) })
            });

            if (response.ok) {
                alert('User successfully added');
                document.getElementById('firstName').value = '';
                document.getElementById('lastName').value = '';
                document.getElementById('age').value = '';
            } else {
                alert('Error adding user');
            }
        } catch (error) {
            alert('Connection error:' + error.message);
        }
    } else {
        alert('All fields are required');
    }
}

async function getUsers() {
    try {
        const response = await fetch(apiUrl);
        const users = await response.json();
        const usersDataDiv = document.getElementById('usersData');
        usersDataDiv.innerHTML = '';

        if (users.length > 0) {
            users.forEach(user => {
                const userDiv = document.createElement('div');
                userDiv.classList.add('user-data');
                userDiv.innerHTML = `<strong>ID:</strong> ${user.id} <br>
                                     <strong>Nombre:</strong> ${user.firstName} <br>
                                     <strong>Apellido:</strong> ${user.lastName} <br>
                                     <strong>Edad:</strong> ${user.age} <br>`;
                usersDataDiv.appendChild(userDiv);
            });
        } else {
            usersDataDiv.innerHTML = 'No users available';
        }
    } catch (error) {
        alert('Connection error: ' + error.message);
    }
}

document.getElementById('addUserButton').addEventListener('click', addUser);
document.getElementById('showUsersButton').addEventListener('click', getUsers);