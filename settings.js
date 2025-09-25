// Handle Settings Form Submission
const settingsForm = document.getElementById("settingsForm");

settingsForm.addEventListener("submit", function(e) {
  e.preventDefault();

  const storeName = document.getElementById("storeName").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const notifications = document.getElementById("notifications").checked;
  const profilePhoto = document.getElementById("profilePhoto").files[0];

  const settingsData = {
    storeName,
    email,
    password,
    notifications,
    profilePhotoName: profilePhoto ? profilePhoto.name : null
  };

  console.log("Settings Saved:", settingsData);
  alert("Settings saved successfully!");
});

// Dark/Light Theme Toggle
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("change", function() {
  if(this.checked) {
    document.documentElement.classList.add("dark");
    document.body.classList.add("bg-gray-900", "text-white");
  } else {
    document.documentElement.classList.remove("dark");
    document.body.classList.remove("bg-gray-900", "text-white");
    document.body.classList.add("bg-gray-100");
  }
});
