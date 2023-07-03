"""An XBlock providing gamification capabilities."""

import logging

import pkg_resources
from web_fragments.fragment import Fragment
from xblock.core import XBlock

#TO-DO: May need to import more or less field types later (https://github.com/openedx/XBlock/blob/master/xblock/fields.py)
from xblock.fields import Integer, Scope, String, Boolean, List, Dict

log = logging.getLogger(__name__)

class GamesXBlock(XBlock):
    """
    An XBlock for creating games.

    The Student view will provide the student's time (if the timer is enabled)
    and best time.

    The studio view will allow course authors to create and manipulate the games.
    """

    title = String(
        default="Flashcards", 
        scope=Scope.content, 
        help="The title of the block."
    )
    type = String(
        default="flashcards", 
        scope=Scope.settings, 
        help="The kind of game this block is responsible for."
    )
    ###############
    #The following fields should be in the list below
    term = String(
        default="This is a term.",
        scope=Scope.content,
        help="The term to be defined by the definition or image."
    )
    definition = String(
        default="This is the definition of the term.",
        scope=Scope.content,
        help="The definition that defines the term or image."
    )
    term_image = String(
        default="",
        scope=Scope.content, 
        help="The image url that will appear on the flashcard above the term."
    )
    definition_image = String(
        default="",
        scope=Scope.content,
        help="The image url that will appear on the flashcard above the definition."
    )
    ###############
    list = List(
        default=[
            {
                'term_image': 'https://studio.stage.edx.org/static/studio/edx.org-next/images/studio-logo.005b2ebe0c8b.png',
                'definition_image': 'https://logos.openedx.org/open-edx-logo-tag.png',
                'term': 'Term 1', 
                'definition': 'The definition of term 1 (moderate character length).'
            },
            {
                'term_image': None, 
                'definition_image': None,
                'term': 'T2', 
                'definition': 'Def of T2 - short.'
            },
            {
                'term_image': 'https://logos.openedx.org/open-edx-logo-tag.png',
                'definition_image': 'https://studio.stage.edx.org/static/studio/edx.org-next/images/studio-logo.005b2ebe0c8b.png',
                'term': 'The Third Term', 
                'definition': 'The definition of term 3. This one is far longer for testing purposes, so long in fact that it should certainly warrant a new line.'
            },
            #{'term': 't4', 'definition': 'd4'}
        ],
        scope=Scope.content,
        help="The list of terms and definitions."
    )
    list_term1 = String(
        default=list.default[0]['term'],
        scope=Scope.content,
        help="TEMP for HTML"
    )
    list_length = Integer(
        default=len(list.default),
        scope=Scope.content,
        help="TEMP for HTML"
    )

    '''
        default=[
            Dict(
                default={'term': 'term1', 'definition': 'definition1'},
                scope=Scope.content,
                help="The first flashcard in the list."
            ),
            Dict(
                default={'term': 'term2', 'definition': 'definition2'},
                scope=Scope.content,
                help="The second flashcard in the list."
            ),
            Dict(
                default={'term': 'term3', 'definition': 'definition3'},
                scope=Scope.content,
                help="The third flashcard in the list."
            )
        ],
        '''
        
    #)
    list_index = Integer(
        default=0,
        scope=Scope.settings,
        help="The index of the list that determines which flashcard is visible."
    )

    term_is_visible = Boolean(
        default=True,
        scope=Scope.settings,
        help="True when the term is visible and false when the definition is visible."
    )
    shuffle = Boolean(
        default=True, 
        scope=Scope.settings, 
        help="Whether to shuffle. For flashcards only."
    )
    timer = Boolean(
        default=True, 
        scope=Scope.settings, 
        help="Whether to enable the timer."
    )
    ################
    #Following fields for student view
    best_time = Integer(
        default=None, 
        scope=Scope.user_info, 
        help="The user's best time."
    )
    ################

    def resource_string(self, path):
        """Handy helper for getting resources from our kit."""
        data = pkg_resources.resource_string(__name__, path)
        return data.decode("utf8")

    # TO-DO: change this view to display your data your own way.
    def student_view(self, context=None):
        """
        The primary view of the GamesXBlock, shown to students
        when viewing courses.
        """
        html = self.resource_string("static/html/games.html")
        frag = Fragment(html.format(self=self))
        frag.add_css(self.resource_string("static/css/games.css"))
        frag.add_javascript(self.resource_string("static/js/src/games.js"))
        frag.initialize_js('GamesXBlock')
        return frag
    
    #TO-DO: change student/ editor view to be separate
    def studio_view(self, context=None):
        """
        The editor view of the GamesXBlock, shown to course
        authors.
        """
        html = self.resource_string("static/html/games.html")
        frag = Fragment(html.format(self=self))
        frag.add_css(self.resource_string("static/css/games.css"))
        frag.add_javascript(self.resource_string("static/js/src/games.js"))
        frag.initialize_js('GamesXBlock')
        return frag

    @XBlock.json_handler
    def flip_timer(self, data, suffix=''):
        """
        A handler to switch the timer field between true and false
        when it is clicked.
        """

        self.timer = not(self.timer)
        
        return {'timer': self.timer}

    @XBlock.json_handler
    def flip_shuffle(self, data, suffix=''):
        """
        A handler to switch the shuffle field between true and false
        when it is clicked.
        """

        self.shuffle = not(self.shuffle)

        return {'shuffle': self.shuffle}
    
    @XBlock.json_handler
    def flip_flashcard(self, data, suffix=''):
        """
        A handler to flip the flashcard from term to definition
        and vice versa.
        """

        #invert term_is_visible before conditionals so it can return from the conditionals
        self.term_is_visible = not(self.term_is_visible)

        #conditionals based on inverting again to get original value
        if not(self.term_is_visible):
            return {'image': self.list[self.list_index]['definition_image'], 'text': self.list[self.list_index]['definition']}
        return {'image': self.list[self.list_index]['term_image'], 'text': self.list[self.list_index]['term']}

    @XBlock.json_handler
    def page_turn(self, data, suffix=''):
        self.term_is_visible = True

        if data['nextIndex'] == 'left':
            if self.list_index>0:
                self.list_index-=1
            else:
                self.list_index=len(self.list)-1
            return {'term_image': self.list[self.list_index]['term_image'], 'term': self.list[self.list_index]['term'], 'index': self.list_index+1, 'list_length': self.list_length}

        if self.list_index<len(self.list)-1:
            self.list_index+=1
        else:
            self.list_index = 0
        return {'term_image': self.list[self.list_index]['term_image'], 'term': self.list[self.list_index]['term'], 'index': self.list_index+1, 'list_length': self.list_length}
    
    @XBlock.json_handler
    def expand_game(self, data, suffix=''):
        description = "ERR: self.type not defined or incorrect"
        if self.type == "flashcards":
            description = "Click each card to reveal the definition"
        elif self.type == "matching":
            description = "Match each term with the correct definition"
        return {
            'title': self.title,
            'description': description
        }
    
    @XBlock.json_handler
    def start_flashcards(self, data, suffix=''):
        return {
            'term_image': self.list[self.list_index]['term_image'],
            'definition_image': self.list[self.list_index]['definition_image'],
            'term': self.list[self.list_index]['term'],
            'list_length': self.list_length
        }
    
    @XBlock.json_handler
    def close_game(self, data, suffix=''):
        self.term_is_visible=True
        self.list_index=0
        return {
            'title': self.title
        }

    @XBlock.json_handler
    def display_help(self, data, suffix=''):
        message = "ERR: self.type not defined or incorrect"
        if self.type == "flashcards":
            message = "Click each card to reveal the definition"
        elif self.type == "matching":
            message = "Match each term with the correct definition"
        return {'message': message}

    # TO-DO: change this to create the scenarios you'd like to see in the
    # workbench while developing your XBlock.
    @staticmethod
    def workbench_scenarios():
        """A canned scenario for display in the workbench."""
        return [
            ("GamesXBlock",
             """<games/>
             """),
            ("Multiple GamesXBlock",
             """<vertical_demo>
                <games/>
                <games/>
                <games/>
                </vertical_demo>
             """),
        ]
