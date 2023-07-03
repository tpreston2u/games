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
        $('.title', element).remove();

        var expandedBlock = "<div class='background-block'></div>";
        var topDiv = "<div class='flashcard-top'></div>";
        var title = "<div class='title-persistent'></div>";
        var close = "<div class='close'>X</div>";
        //var closeButton = "<div class='close-button></div>";
        //var closeImage = "<div class='close-image'>X</div>"
        var startBlock = "<div class='start-block'></div>";
        var description = "<div class='flashcard-description'></div>";
        var startButton = "<div class='start-button'>Start</div>";

        $('.gamesxblock', element).append(expandedBlock);
        $('.background-block', element).append(topDiv);
        $('.flashcard-top', element).append(title);
        $('.title-persistent', element).text(fullView.title);
        $('.flashcard-top', element).append(close);
        //$('.close', element).apeend(closeButton);
        //$('.close-button', element).append(closeImage);
        $('.background-block', element).append(startBlock);
        $('.start-block', element).append(description);
        $('.flashcard-description', element).text(fullView.description);
        $('.start-block', element).append(startButton);
    }

    $(document).on('click', '.title', function(eventObject) {
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
        $('.start-block', element).remove();

        var flashcardBlock = "<div class='flashcard-block'></div>";
        var firstImage = "<image class='image'>";
        var text = "<div class='flashcard-text'></div>";
        var footer = "<div class='flashcard-footer'></div>";
        var spacer = "<div class='spacer'></div>";
        var tooltip = "<div class='tooltip'></div>";
        var tooltipButton = "<div class='tooltip-button'>?</div>";
        var navigation = "<div class='flashcard-navigation'></div>";
        var left = "<div class='flashcard-left-button'></div>";
        var leftImage = "<img class='flashcard-left-image'>";
        var navText = "<div class='flashcard-navigation-text'></div>";
        var right = "<div class='flashcard-right-button'></div>";
        var rightImage = "<img class='flashcard-right-image'>";

        $('.background-block', element).append(flashcardBlock);
        $('.flashcard-block', element).append(firstImage);
        $('.image', element).attr("src", firstCard.term_image);
        $('.flashcard-block', element).append(text);
        $('.flashcard-text', element).text(firstCard.term);
        $('.background-block', element).append(footer);
        $('.flashcard-footer', element).append(spacer);
        $('.flashcard-footer', element).append(navigation);
        $('.flashcard-footer', element).append(tooltip);
        $('.tooltip', element).append(tooltipButton);
        $('.flashcard-navigation', element).append(left);
        $('.flashcard-left-button', element).append(leftImage);
        $('.flashcard-left-image', element).attr("src", "/games/games/static/img/navigate_left.png");
        $('.flashcard-navigation', element).append(navText);
        $('.flashcard-navigation-text', element).text("1" + " / " + firstCard.list_length);
        $('.flashcard-navigation', element).append(right);
        $('.flashcard-right-button', element).append(rightImage);
        $('.flashcard-right-image', element).attr("src", "/games/games/static/img/navigate_right.png");
    }

    $(document).on('click', '.start-button', function(eventObject) {
        $.ajax({
            type: "POST",
            url: runtime.handlerUrl(element, 'start_flashcards'),
            data: JSON.stringify({}),
            success: startFlashcards
        });
    });
    //////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////
    //Close Flashcards Game
    function closeGameFlashcards(initialView) {
        $('.background-block', element).remove();
        
        var init = "<div class='title'></div>";

        $('.gamesxblock', element).append(init);
        $('.title', element).text(initialView.title);
    }

    $(document).on('click', '.close', function(eventObject) {
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
        //$('.helpbubble', element).text(help.message);

        var bubbleBlock = "<div class='tooltip-bubble-block'></div>";
        var bubbleTextBlock = "<div class='tooltip-bubble-text-block'></div>";
        var bubbleText = "<div class='tooltip-bubble-text'></div>";

        $('.tooltip', element).append(bubbleBlock);
        $('.tooltip-bubble-block', element).append(bubbleTextBlock);
        $('.tooltip-bubble-text-block', element).append(bubbleText);
        $('.tooltip-bubble-text', element).text(help.message);
    }

    function hideHelp(help) {
        $('.tooltip-bubble-block', element).remove();
    }

    $(document).on('mouseenter', '.tooltip', function(eventObject) {
        $.ajax({
            type: "POST",
            url: runtime.handlerUrl(element, 'display_help'),
            data: JSON.stringify({}),
            success: getHelp
        });
    });

    $(document).on('mouseleave', '.tooltip', function(eventObject) {
        $.ajax({
            type: "POST",
            url: runtime.handlerUrl(element, 'display_help'),
            data: JSON.stringify({}),
            success: hideHelp
        });
    });
    //////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////
    //Flip Flashcard
    function flipFlashcard(newSide) {
        $('.image', element).attr("src", newSide.image);
        $('.flashcard-text', element).text(newSide.text);
    }

    $(document).on('click', '.flashcard-block', function(eventObject) {
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
        $('.flashcard-text', element).text(nextCard.term);
        $('.flashcard-navigation-text', element).text(nextCard.index + " / " + nextCard.list_length);
    }

    $(document).on('click', '.flashcard-left-button', function(eventObject) {
        $.ajax({
            type: "POST",
            url: runtime.handlerUrl(element, 'page_turn'),
            data: JSON.stringify({nextIndex: 'left'}),
            success: pageTurn
        });
    });

    $(document).on('click', '.flashcard-right-button', function(eventObject) {
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

/*
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
*/