let $myModal = $('#myModal');
$(".js-refer").click(() => $myModal.show());
$(".js-close-help").click(() => $myModal.hide());
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == $myModal[0]) {
        $myModal.hide();
    }
};
let $myModalAboutAuth = $('#myModal-about-author');
$(".js-author").click(() => $myModalAboutAuth.show());
$(".js-close-author").click(() => $myModalAboutAuth.hide());
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == $myModalAboutAuth[0]) {
        $myModalAboutAuth.hide();
    }
};
