document.addEventListener("DOMContentLoaded", () => {
    // form submission
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault(); 

            // Create and display the popup message
            const popup = document.createElement("div");
            popup.innerHTML = "Thank you for contacting us! We will get back to you shortly.";
            popup.style.position = "fixed";
            popup.style.top = "50%";
            popup.style.left = "50%";
            popup.style.transform = "translate(-50%, -50%)";
            popup.style.backgroundColor = "#ffffff";
            popup.style.color = "red";
            popup.style.padding = "20px";
            popup.style.borderRadius = "8px";
            popup.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
            popup.style.fontSize = "18px";
            popup.style.textAlign = "center";
            popup.style.zIndex = "1000";
            popup.style.border = "2px solid white";

            document.body.appendChild(popup);

            // Automatically remove the popup after 3 seconds and redirect to homepage
            setTimeout(() => {
                popup.remove();
                window.location.href = "/";
            }, 2500);
        });
    }
});
