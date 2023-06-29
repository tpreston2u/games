/* Javascript for GamesXBlock. */
/*
TO-DO: Figure out if GamesAside is necessary (the tutorial covered adding this, but it was not here by default)
function GamesAside(runtime, element, block_element, init_args) {
    return new GamesXBlock(runtime, element);
}
*/

function GamesXBlock(runtime, element) {

    //////////////////////////////////////////////////////////////
    //Timer Flip
    function flipTimer(newTimer) {
        $('.timer_bool .timer_flip', element).text(newTimer.timer);
    }

    $('.timer_bool', element).click(function(eventObject) {
        $.ajax({
            type: "POST",
            url: runtime.handlerUrl(element, 'flip_timer'),
            data: JSON.stringify({timerData: 'timer'}),
            success: flipTimer
        });
    });
    //////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////
    //Shuffle Flip
    function flipShuffle(newShuffle) {
        $('.shuffle_bool .shuffle_flip', element).text(newShuffle.shuffle);
    }

    $('.shuffle_bool', element).click(function(eventObject) {
        $.ajax({
            type: "POST",
            url: runtime.handlerUrl(element, 'flip_shuffle'),
            data: JSON.stringify({shuffleData: 'shuffle'}),
            success: flipShuffle
        });
    });
    //////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////
    //Flip Flashcard
    function flipFlashcard(newSide) {
        $('.flashcard', element).text(newSide.text);
    }

    $('.flashcard', element).click(function(eventObject) {
        $.ajax({
            type: "POST",
            url: runtime.handlerUrl(element, 'flip_flashcard'),
            data: JSON.stringify({cardData: 'flashcard'}),
            success: flipFlashcard
        });
    });
    //////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////
    //Page Turn
    function pageTurn(nextCard) {
        $('.flashcard', element).text(nextCard.term);
        $('.page', element).text(nextCard.index);
    }

    $('.leftArrow', element).click(function(eventObject) {
        $.ajax({
            type: "POST",
            url: runtime.handlerUrl(element, 'page_turn'),
            data: JSON.stringify({nextIndex: 'left'}),
            success: pageTurn
        });
    });

    $('.rightArrow', element).click(function(eventObject) {
        $.ajax({
            type: "POST",
            url: runtime.handlerUrl(element, 'page_turn'),
            data: JSON.stringify({nextIndex: 'right'}),
            success: pageTurn
        });
    });
    //////////////////////////////////////////////////////////////

    return {};
    $(function ($) {
        /* Here's where you'd do things on page load. */
    });
}
