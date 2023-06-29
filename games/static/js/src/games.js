/* Javascript for GamesXBlock. */
/*
TO-DO: Figure out if GamesAside is necessary (the tutorial covered adding this, but it was not here by default)
function GamesAside(runtime, element, block_element, init_args) {
    return new GamesXBlock(runtime, element);
}
*/

function GamesXBlock(runtime, element) {

    //////////////////////////////////////////////////////////////
    //Expand Flashcards Game
    function expandCards(fullView) {
        $('.title', element).text("");
        $('.titleref', element).text(fullView.title)
        $('.close', element).text("X");
        $('.description', element).text(fullView.description)
        $('.start', element).text("Start")
    }

    $('.title', element).click(function(eventObject) {
        $.ajax({
            type: "POST",
            url: runtime.handlerUrl(element, 'expand_game'),
            data: JSON.stringify({}),
            success: expandCards
        });
    });
    //////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////
    //Start Flashcards Game
    function startFlashcards(firstCard) {
        $('.description', element).text("");
        $('.start', element).text("");
        $('.image', element).attr("src", firstCard.term_image);
        $('.flashcard', element).text(firstCard.term);
        $('.leftArrow', element).text("<");
        $('.page', element).text("1");
        $('.pageDivider', element).text("/");
        $('.maxIndex', element).text(firstCard.list_length);
        $('.rightArrow', element).text(">");
        $('.help', element).text("?");
    }

    $('.start', element).click(function(eventObject) {
        $.ajax({
            type: "POST",
            url: runtime.handlerUrl(element, 'start_flashcards'),
            data: JSON.stringify({}),
            success: startFlashcards
        });
    })
    //////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////
    //Close Flashcards Game
    function closeGameFlashcards(initialView) {
        $('.title', element).text(initialView.title);
        $('.titleref', element).text("");
        $('.close', element).text("");
        $('.description', element).text("");
        $('.start', element).text("");
        $('.image', element).attr("src", "");
        $('.flashcard', element).text("");
        $('.leftArrow', element).text("");
        $('.page', element).text("");
        $('.pageDivider', element).text("");
        $('.maxIndex', element).text("");
        $('.rightArrow', element).text("");
        $('.help',element).text("");
    }

    $('.close', element).click(function(eventObject) {
        $.ajax({
            type: "POST",
            url: runtime.handlerUrl(element, 'close_game'),
            data: JSON.stringify({}),
            success: closeGameFlashcards
        });
    })
    //////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////
    //Tooltip
    function getHelp(help) {
        $('.helpbubble', element).text(help.message);
    }

    function hideHelp(help) {
        $('.helpbubble', element).text("");
    }

    $('.help', element).mouseenter(function(eventObject) {
        $.ajax({
            type: "POST",
            url: runtime.handlerUrl(element, 'display_help'),
            data: JSON.stringify({}),
            success: getHelp
        });
    });

    $('.help', element).mouseleave(function(eventObject) {
        $.ajax({
            type: "POST",
            url: runtime.handlerUrl(element, 'display_help'),
            data: JSON.stringify({}),
            success: hideHelp
        });
    });
    //////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////
    //Timer Flip
    function flipTimer(newTimer) {
        $('.timer_bool .timer_flip', element).text(newTimer.timer);
    }

    $('.timer_bool', element).click(function(eventObject) {
        $.ajax({
            type: "POST",
            url: runtime.handlerUrl(element, 'flip_timer'),
            data: JSON.stringify({}),
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
            data: JSON.stringify({}),
            success: flipShuffle
        });
    });
    //////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////
    //Flip Flashcard
    function flipFlashcard(newSide) {
        $('.image', element).attr("src", newSide.image);
        $('.flashcard', element).text(newSide.text);
    }

    $('.flashcard', element).click(function(eventObject) {
        $.ajax({
            type: "POST",
            url: runtime.handlerUrl(element, 'flip_flashcard'),
            data: JSON.stringify({}),
            success: flipFlashcard
        });
    });

    $('.image', element).click(function(eventObject) {
        $.ajax({
            type: "POST",
            url: runtime.handlerUrl(element, 'flip_flashcard'),
            data: JSON.stringify({}),
            success: flipFlashcard
        });
    });
    //////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////
    //Page Turn
    function pageTurn(nextCard) {
        $('.image', element).attr("src", nextCard.term_image);
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
