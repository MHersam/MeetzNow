function navToggle() {
    var nav = document.getElementById("topnav");
    var toggle = document.getElementsByClassName("toggle");
    if (nav.className === "navigation") {
        nav.className += " responsive";
        [].forEach.call(toggle, function (el) {
            el.onclick = function() {navToggle();}
        });
    } else {
        nav.className = "navigation";
        [].forEach.call(toggle, function (el) {
            el.onclick = null
        });
    }
}
function myhref(to){
    window.location.href = to;
}
