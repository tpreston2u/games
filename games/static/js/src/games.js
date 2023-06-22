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

    //TO-DO: Learn what data type 'result' is below and decide whether to give it a new name
    function updateTitle(result) {
        $('.title', element).text(result.title);
    }

    //TO-DO: Learn what I should replace increment_count with
    var handlerUrl = runtime.handlerUrl(element, 'increment_count');

    //To-DO: Validate this section is correct
    $('.title', element).click(function(eventObject) {
        $.ajax({
            type: "POST",
            url: handlerUrl,
            data: JSON.stringify({"hello": "world"}),
            success: updateTitle
        });
    });

    $(function ($) {
        /* Here's where you'd do things on page load. */
    });
}