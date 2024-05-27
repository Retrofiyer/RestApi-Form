document.getElementById('userInfoForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const age = parseInt(document.getElementById('age').value);

  const userInfo = {
    firstName,
    lastName,
    age
  };

  // Enviar datos a la API REST
  fetch('http://localhost:5000/usuarios', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userInfo),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    const jsonOutput = document.getElementById('jsonOutput');
    jsonOutput.innerText = JSON.stringify(data, null, 2);
  })
  .catch(error => console.error('Error:', error));
});
