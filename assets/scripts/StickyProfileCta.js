if (window.innerWidth >= 960) {
    window.onscroll = function() {myFunction()};

    let header = document.getElementById("profile-cta");
    let sticky = header.offsetTop;

    function myFunction() {
        if (window.pageYOffset > sticky) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
    }
}

if (window.innerWidth < 960) { 
    
}
