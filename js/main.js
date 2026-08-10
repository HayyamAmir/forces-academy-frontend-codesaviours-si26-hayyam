//=========================================
// DOM Loaded
//=========================================

document.addEventListener("DOMContentLoaded", function () {

    //=========================================
    // Animated Stats Counter
    //=========================================

    const counters = document.querySelectorAll(".counter");

    if (counters.length > 0) {

        const observer = new IntersectionObserver((entries) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const counter = entry.target;
                const target = Number(counter.dataset.target);

                let count = 0;
                const speed = target / 100;

                function updateCounter() {

                    count += speed;

                    if (count < target) {

                        counter.innerText = Math.ceil(count);
                        requestAnimationFrame(updateCounter);

                    } else {

                        if (target === 98) {

                            counter.innerText = "98%";

                        } else {

                            counter.innerText = target + "+";

                        }

                    }

                }

                updateCounter();
                observer.unobserve(counter);

            });

        }, {
            threshold: 0.5
        });

        counters.forEach(counter => observer.observe(counter));

    }

    //=========================================
    // Print Result
    //=========================================

    window.printResult = function () {

        const printArea = document.getElementById("printResult");

        if (!printArea) return;

        const originalContent = document.body.innerHTML;

        document.body.innerHTML = printArea.innerHTML;

        window.print();

        document.body.innerHTML = originalContent;

        location.reload();

    };

    //=========================================
    // Contact Form Validation
    //=========================================

    const form = document.getElementById("contactForm");

    if (form) {

        form.addEventListener("submit", function (e) {

            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const subject = document.getElementById("subject").value.trim();
            const message = document.getElementById("message").value.trim();

            const nameError = document.getElementById("nameError");
            const emailError = document.getElementById("emailError");
            const phoneError = document.getElementById("phoneError");
            const subjectError = document.getElementById("subjectError");
            const messageError = document.getElementById("messageError");
            const successMessage = document.getElementById("successMessage");

            nameError.innerHTML = "";
            emailError.innerHTML = "";
            phoneError.innerHTML = "";
            subjectError.innerHTML = "";
            messageError.innerHTML = "";
            successMessage.innerHTML = "";

            let valid = true;

            const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
            const phonePattern = /^[0-9]{11}$/;

            if (name === "") {

                nameError.innerHTML = "Full Name is required.";
                valid = false;

            }

            if (email === "") {

                emailError.innerHTML = "Email is required.";
                valid = false;

            } else if (!emailPattern.test(email)) {

                emailError.innerHTML = "Enter a valid email.";
                valid = false;

            }

            if (phone === "") {

                phoneError.innerHTML = "Phone Number is required.";
                valid = false;

            } else if (!phonePattern.test(phone)) {

                phoneError.innerHTML = "Enter 11 digit phone number.";
                valid = false;

            }

            if (subject === "") {

                subjectError.innerHTML = "Subject is required.";
                valid = false;

            }

            if (message === "") {

                messageError.innerHTML = "Message is required.";
                valid = false;

            }

            if (valid) {

                successMessage.innerHTML = "Your message has been sent successfully!";
                form.reset();

            }

        });

    }

    //=========================================
    // Course Search
    //=========================================

    const searchBtn = document.getElementById("searchBtn");

    if (searchBtn) {

        searchBtn.addEventListener("click", function () {

            const search = document
                .getElementById("courseSearch")
                .value
                .toLowerCase()
                .trim();

            const cards = document.querySelectorAll(".course-card");

            cards.forEach(card => {

                const text = card.innerText.toLowerCase();

                card.parentElement.style.display =
                    (text.includes(search) || search === "")
                        ? ""
                        : "none";

            });

        });

    }
        //=========================================
    // Result Search
    //=========================================

    const resultBtn = document.getElementById("checkResult");

    if (resultBtn) {

        resultBtn.addEventListener("click", function () {

            const roll = document.getElementById("rollNo").value.toLowerCase().trim();
            const program = document.getElementById("program").value.toLowerCase();
            const year = document.getElementById("examYear").value.toLowerCase().trim();

            const rows = document.querySelectorAll(".result-table tbody tr");
            const resultMessage = document.getElementById("resultMessage");

            let found = false;

            rows.forEach(row => {

                const text = row.innerText.toLowerCase();

                const match =
                    (roll === "" || text.includes(roll)) &&
                    (program === "select class" || text.includes(program)) &&
                    (year === "" || text.includes(year));

                row.style.display = match ? "" : "none";

                if (match) {
                    found = true;
                }

            });

            if (resultMessage) {
                resultMessage.style.display = found ? "none" : "block";
            }

        });

    }

    //=========================================
    // Back To Top Button
    //=========================================

    const backToTop = document.getElementById("backToTop");

    if (backToTop) {

        window.addEventListener("scroll", function () {

            backToTop.style.display =
                window.scrollY > 300 ? "block" : "none";

        });

        backToTop.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }

    //=========================================
    // Gallery Image Popup
    //=========================================

    window.openImage = function (src) {

        const popup = document.getElementById("imagePopup");
        const popupImg = document.getElementById("popupImg");

        if (!popup || !popupImg) return;

        popup.style.display = "flex";
        popupImg.src = src;

    };

    window.closeImage = function () {

        const popup = document.getElementById("imagePopup");

        if (popup) {
            popup.style.display = "none";
        }

    };

    const popup = document.getElementById("imagePopup");

    if (popup) {

        popup.addEventListener("click", function (e) {

            if (e.target === popup) {

                closeImage();

            }

        });

    }

});
//=========================================
// Gallery Filter
//=========================================

const filterButtons = document.querySelectorAll(".gallery-menu button");
const galleryItems = document.querySelectorAll(".gallery-item");

filterButtons.forEach(button => {

    button.addEventListener("click", function () {

        const filter = this.dataset.filter;

        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        this.classList.add("active");

        galleryItems.forEach(item => {

            item.style.display =
                filter === "all" ||
                item.dataset.category === filter
                    ? ""
                    : "none";

        });

    });

});
/*=========================================
            DARK MODE
=========================================*/

const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {

    const themeText = themeToggle.querySelector(".theme-text");

    // Saved Theme
    if (localStorage.getItem("theme") === "dark") {

        document.body.classList.add("dark-mode");
        themeToggle.innerHTML = "☀️ <span class='theme-text'>Light</span>";

    }

    themeToggle.addEventListener("click", function () {

        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {

            localStorage.setItem("theme", "dark");

            themeToggle.innerHTML =
                "☀️ <span class='theme-text'>Light</span>";

        } else {

            localStorage.setItem("theme", "light");

            themeToggle.innerHTML =
                "🌙 <span class='theme-text'>Dark</span>";

        }

    });

}
//=========================================
// Scroll Reveal Animation
//=========================================

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll(){

    reveals.forEach((item,index)=>{

        if(item.getBoundingClientRect().top < window.innerHeight - 100){

            setTimeout(function(){

                item.classList.add("active");

           }, (index % 4) * 150);

        }

    });

}

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();