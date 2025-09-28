/** Greeting changed by time*/

    function getGreetingByHour(h) {
      if (h >= 5 && h <= 11)   return "Good morning,";
      if (h >= 12 && h <= 16)  return "Good afternoon,";
      if (h >= 17 && h <= 21)  return "Good evening,";
      return "Good night,";
    }

    function updateGreeting() {
      let now = new Date();
      let hour = now.getHours();
      document.getElementById("greeting-text").textContent = getGreetingByHour(hour);
    }

    updateGreeting();
    setInterval(updateGreeting, 60);