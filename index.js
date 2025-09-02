         // DOM elements
        const fetchDogBtn = document.getElementById('fetchDogBtn');
        const dogImage = document.getElementById('dogImage');
        const statusDiv = document.getElementById('status');
        const loadingIcon = document.getElementById('loadingIcon');

        // Event listener for the button
        fetchDogBtn.addEventListener('click', fetchRandomDog);

        function fetchRandomDog() {
            dogImage.style.display = 'none';
            statusDiv.textContent = 'Fetching dog image...';
            fetchDogBtn.disabled = true;
            loadingIcon.style.display = 'inline-block';
            
            fetch('https://dog.ceo/api/breeds/image/random')
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.status === 'success') {
                        dogImage.src = data.message;
                        dogImage.alt = "Random dog image";
                        dogImage.style.display = 'block';
                        statusDiv.textContent = 'Here\'s a random dog for you!';
                    } else {
                        throw new Error('API returned an error: ' + data.message);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    statusDiv.textContent = 'Error: ' + error.message;
                    dogImage.style.display = 'none';
                })
                .finally(() => {
                    fetchDogBtn.disabled = false;
                    loadingIcon.style.display = 'none';
                });
        }

        window.addEventListener('load', fetchRandomDog);
