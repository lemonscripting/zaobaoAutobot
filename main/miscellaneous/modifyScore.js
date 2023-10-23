$(function() {
    setTimeout(updateScore, 100);
});

function updateScore() {
    if ($(".cscore").length > 0) {
        // Set the score to 100
        var cscore = 100;
        $(".cscore").text(cscore);
        setTimeout(updateScore, 100);
    }
}