/* Javascript for GamesXBlock. */
/*
TO-DO: Figure out if GamesAside is necessary (the tutorial covered adding this, but it was not here by default)
function GamesAside(runtime, element, block_element, init_args) {
    return new GamesXBlock(runtime, element);
}
*/

function GamesXBlock(runtime, element) {

    /*
    function updateCount(result) {
        $('.count', element).text(result.count);
    }
    */
   function updateTimer(timerResult) {
        $('.timer', element).text(timerResult.timer);
   }

    //TO-DO: Learn what I should replace increment_count with
    var handlerUrl = runtime.handlerUrl(element, 'update_timer');

    //To-DO: Validate this section is correct
    $('.timer', element).click(function(eventObject) {
        $.ajax({
            type: "POST",
            url: handlerUrl,
            data: JSON.stringify({timerValue: 'timer'}),
            success: updateTimer
        });
    });

    return {};
    $(function ($) {
        /* Here's where you'd do things on page load. */
    });
}
