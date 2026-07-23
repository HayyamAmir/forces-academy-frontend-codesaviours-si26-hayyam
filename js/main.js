//=========================================
// Animated Stats Counter
//=========================================

const counters = document.querySelectorAll(".counter");

const observer = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

const counter = entry.target;

const target = +counter.dataset.target;

let count = 0;

const speed = target / 100;

const update = ()=>{

count += speed;

if(count < target){

counter.innerText = Math.ceil(count);

requestAnimationFrame(update);

}

else{

if(target==98){

counter.innerText="98%";

}

else{

counter.innerText=target+"+";

}

}

};

update();

observer.unobserve(counter);

}

});

},{
threshold:0.5
});

counters.forEach(counter=>{
observer.observe(counter);
});

// ==========================================
// PRINT RESULT TABLE
// ==========================================

function printResult() {

    let printContents = document.getElementById("printResult").innerHTML;
    let originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;

    location.reload();

}

// ==========================================
// CONTACT FORM VALIDATION
// ==========================================

const form = document.getElementById("contactForm");

if (form) {

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        document.getElementById("nameError").innerHTML = "";
        document.getElementById("emailError").innerHTML = "";
        document.getElementById("phoneError").innerHTML = "";
        document.getElementById("subjectError").innerHTML = "";
        document.getElementById("messageError").innerHTML = "";
        document.getElementById("successMessage").innerHTML = "";

        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let phone = document.getElementById("phone").value.trim();
        let subject = document.getElementById("subject").value.trim();
        let message = document.getElementById("message").value.trim();

        let valid = true;

        if (name == "") {
            document.getElementById("nameError").innerHTML = "Full Name is required.";
            valid = false;
        }

        let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

        if (email == "") {
            document.getElementById("emailError").innerHTML = "Email is required.";
            valid = false;
        }
        else if (!email.match(emailPattern)) {
            document.getElementById("emailError").innerHTML = "Enter a valid email.";
            valid = false;
        }

        let phonePattern = /^[0-9]{11}$/;

        if (phone == "") {
            document.getElementById("phoneError").innerHTML = "Phone Number is required.";
            valid = false;
        }
        else if (!phone.match(phonePattern)) {
            document.getElementById("phoneError").innerHTML = "Enter 11 digit phone number.";
            valid = false;
        }

        if (subject == "") {
            document.getElementById("subjectError").innerHTML = "Subject is required.";
            valid = false;
        }

        if (message == "") {
            document.getElementById("messageError").innerHTML = "Message is required.";
            valid = false;
        }

        if (valid) {

            document.getElementById("successMessage").innerHTML =
                "Your message has been sent successfully!";

            form.reset();

        }

    });

}

// ==========================================
// COURSE SEARCH
// ==========================================

const searchBtn = document.getElementById("searchBtn");

if (searchBtn) {

    searchBtn.addEventListener("click", function () {

        let search = document
            .getElementById("courseSearch")
            .value
            .toLowerCase()
            .trim();

        let cards = document.querySelectorAll(".course-card");

        let found = false;

        cards.forEach(function (card) {

            let text = card.innerText.toLowerCase();

            if (text.includes(search) || search === "") {

                card.parentElement.style.display = "";

                found = true;

            } else {

                card.parentElement.style.display = "none";

            }

        });

    });

}
//=====================================
// Result Search
//=====================================

const resultBtn = document.getElementById("checkResult");

if(resultBtn){

resultBtn.addEventListener("click",function(){

let roll=document.getElementById("rollNo").value.toLowerCase().trim();

let program=document.getElementById("program").value.toLowerCase();

let year=document.getElementById("examYear").value.toLowerCase().trim();

let rows=document.querySelectorAll(".result-table tbody tr");

let found=false;

rows.forEach(function(row){

let text=row.innerText.toLowerCase();

if(

(roll=="" || text.includes(roll))

&&

(program=="select class" || text.includes(program))

&&

(year=="" || text.includes(year))

){

row.style.display="";

found=true;

}

else{

row.style.display="none";

}

});

if(found){

document.getElementById("resultMessage").style.display="none";

}

else{

document.getElementById("resultMessage").style.display="block";

}

});

}