const output = document.getElementById('consoleOutput');

function log(msg) {
  console.log(msg);
  output.textContent += msg + '\n';
}

// Part 1 Async Behavior
document.getElementById('part1Btn').addEventListener('click', () => {
  output.textContent = '';
  log("First Message");
  setTimeout(() => {
    log("Second message (after 2 seconds)");
  }, 2000);
  log("Third message");
});


// Part 2: Fetching Data with Promises using FavQs API 
document.getElementById('part2Btn').addEventListener('click', () => {
  output.textContent = '';
  fetch('https://api.allorigins.win/raw?url=' + encodeURIComponent('https://favqs.com/api/qotd'))
    .then(response => {
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      return response.json();
    })
    .then(data => {
      log("Here's your quote: " + (data.quote ? data.quote.body : JSON.stringify(data)));
      log("— " + (data.quote ? data.quote.author : "Unknown"));
    })
    .catch(error => {
      log("Error: " + error.message);
    });
});

// Part 3: Fetching Data with Async/Await 
async function getQuote() {
  try {
    const response = await fetch('https://api.allorigins.win/raw?url=' + encodeURIComponent('https://favqs.com/api/qotd'));
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    log("Here's your quote: " + (data.quote ? data.quote.body : JSON.stringify(data)));
    log("— " + (data.quote ? data.quote.author : "Unknown"));
  } catch (error) {
    log("Error: " + error.message);
  }
}

document.getElementById('part3Btn').addEventListener('click', () => {
  output.textContent = '';
  getQuote();
});


