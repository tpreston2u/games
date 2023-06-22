"""An XBlock providing gamification capabilities."""

import pkg_resources
from web_fragments.fragment import Fragment
from xblock.core import XBlock

#TO-DO: May need to import more or less field types later (DateTime is defined at line 935 but not listed at line 27: https://github.com/openedx/XBlock/blob/master/xblock/fields.py)
from xblock.fields import Integer, Scope, String, Boolean#, DateTime, List


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
        default="TEST", 
        scope=Scope.content, 
        help="The title of the block.")
    type = String(
        default="", 
        scope=Scope.settings, 
        help="The kind of game this block is responsible for.")
    #List for terms, defs, and images?
    shuffle = Boolean(
        default=True, 
        scope=Scope.settings, 
        help="Whether to shuffle. For flashcards only.")
    #timer = DateTime(default=datetime.now(), scope=Scope.user_state, help="A simple timer for the matching game.")

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
    @XBlock.json_handler
    def increment_count(self, data, suffix=''):
        """
        An example handler, which increments the data.
        """
        # Just to show data coming in...
        assert data['hello'] == 'world'

        self.count += 1
        return {"count": self.count}
    
    @XBlock.json_handler
    def update_title(self, data, suffix=''):
        """
        A handler to update the text in the title field.
        """

        self.title = data
        return {"title": self.title}

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