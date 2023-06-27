"""An XBlock providing gamification capabilities."""

import logging

import pkg_resources
from web_fragments.fragment import Fragment
from xblock.core import XBlock

#TO-DO: May need to import more or less field types later (DateTime is defined at line 935 but not listed at line 27: https://github.com/openedx/XBlock/blob/master/xblock/fields.py)
from xblock.fields import Integer, Scope, String, Boolean, List

log = logging.getLogger(__name__)


class GamesXBlock(XBlock):
    """
    An XBlock for the creating games.

    The Student view will provide the student's time (if the timer is enabled)
    and best time.
    """

    # Fields are defined on the class.  You can access them in your code as
    # self.<fieldname>.

    # TO-DO: make sure these fields are correct
    title = String(
        default="", 
        scope=Scope.content, 
        help="The title of the block."
    )
    type = String(
        default="", 
        scope=Scope.settings, 
        help="The kind of game this block is responsible for."
    )
    list = List(
        default=[],
        scope=Scope.content,
        help="The list of terms and definitions."
    )
    #The following fields should be in the list
    ###############
    term = String(
        default="",
        scope=Scope.content,
        help="The term to be defined by the definition or image."
    )
    definition = String(
        default="",
        scope=Scope.content,
        help="The definition that defines the term or image."
    )
    image = String(
        default="",
        scope=Scope.content, 
        help="The image that will act as either the term or definition."
    )
    ##############
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
    #Need a variable for whether timer is enabled? (default=True)
    #Following fields for student view
    ################
    bestTime = Integer(
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
        creators.
        """
        html = self.resource_string("static/html/games.html")
        frag = Fragment(html.format(self=self))
        frag.add_css(self.resource_string("static/css/games.css"))
        frag.add_javascript(self.resource_string("static/js/src/games.js"))
        frag.initialize_js('GamesXBlock')
        return frag

    # TO-DO: change this handler to perform your own actions.  You may need more
    # than one handler, or you may not need any handlers at all.
    '''
    @XBlock.json_handler
    def increment_count(self, data, suffix=''):
        """
        An example handler, which increments the data.
        """
        # Just to show data coming in...
        assert data['hello'] == 'world'

        self.count += 1
        return {"count": self.count}
    '''

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

#TO-DO: update HTML file
#TO-DO: update CSS file
#TO-DO: udpate JS file