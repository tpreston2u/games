/* Javascript for GamesXBlock. */

function GamesXBlock(runtime, element) {

    //////////////////////////////////////////////////////////////
    //Expand flashcards game
    function expandCards(fullView) {
        $('.title-initial', element).remove();

        var expandedBlock = "<div class='background-block'></div>";
        var topDiv = "<div class='flashcard-top'></div>";
        var title = "<div class='title-persistent'></div>";
        var closeButton = "<div class='close-button'></div>";
        var closeBackground = "<div class='close-background'></div>";
        var closeImage = "<img class='close-image'>";
        var startBlock = "<div class='start-block'></div>";
        var description = "<div class='flashcard-description'></div>";
        var startButton = "<div class='start-button'>Start</div>";

        $('.gamesxblock', element).append(expandedBlock);
        $('.background-block', element).append(topDiv);
        $('.flashcard-top', element).append(title);
        $('.title-persistent', element).text(fullView.title);
        $('.flashcard-top', element).append(closeButton);
        $('.close-button', element).append(closeBackground);
        $('.close-background', element).append(closeImage);
        $('.close-image', element).attr("src", "/games/games/static/img/close_button.png");
        $('.background-block', element).append(startBlock);
        $('.start-block', element).append(description);
        $('.flashcard-description', element).text(fullView.description);
        $('.start-block', element).append(startButton);
    }

    $(document).on('click', '.title-initial', function(eventObject) {
        $.ajax({
            type: "POST",
            url: runtime.handlerUrl(element, 'expand_game'),
            data: JSON.stringify({}),
            success: expandCards
        });
    });
    //////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////
    //Start flashcards game
    function startFlashcards(firstCard) {
        $('.start-block', element).remove();

        var flashcardBlock = "<div class='flashcard-block'></div>";
        var firstImage = "<image class='image'>";
        var text = "<div class='flashcard-text'></div>";
        var footer = "<div class='flashcard-footer'></div>";
        var spacer = "<div class='spacer'></div>";
        var tooltip = "<div class='tooltip'></div>";
        var tooltipButton = "<div class='tooltip-button'></div>";
        var tooltipButtonImage = "<img class='tooltip-button-image'>";
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
        $('.tooltip-button', element).append(tooltipButtonImage);
        $('.tooltip-button-image', element).attr("src", "/games/games/static/img/help_outline.png");
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
    //Close flashcards game
    function closeGameFlashcards(initialView) {
        $('.background-block', element).remove();
        
        var init = "<div class='title-initial'></div>";

        $('.gamesxblock', element).append(init);
        $('.title-initial', element).text(initialView.title);
    }

    $(document).on('click', '.close-image', function(eventObject) {
        $.ajax({
            type: "POST",
            url: runtime.handlerUrl(element, 'close_game'),
            data: JSON.stringify({}),
            success: closeGameFlashcards
        });
    })
    //////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////
    //Show and hide tooltip bubble
    function getHelp(help) {
        var tooltipBlock = "<div class='tooltip-block'></div>";
        var tooltipContainer = "<div class='tooltip-container'></div>";
        var tooltipText = "<div class='tooltip-text'></div>";
        //var tooltipPolygon = "<img class='tooltip-polygon'>";
        var tooltipPolygon = "<div class='tooltip-polygon'></div>";

        $('.tooltip-button', element).append(tooltipBlock);

        $('.tooltip-block', element).append(tooltipContainer);
        $('.tooltip-container', element).append(tooltipText);
        $('.tooltip-text', element).text(help.message);
        $('.tooltip-container', element).append(tooltipPolygon);
        //$('.tooltip-polygon', element).attr("src", "/games/games/static/img/polygon_1.png");
    }

    function hideHelp(help) {
        $('.tooltip-block', element).remove();
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
    //Flip the current flashcard
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
    //Turn the page
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

//Old stuff - no longer has a purpose. Will delete once editor view is complete.
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