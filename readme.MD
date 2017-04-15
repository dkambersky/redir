Cabbage's Anti-Procrastinator
=====
(for lack of a better name)

This is a tiny, lean, unpacked Chrome plugin that can do two things:
 - redirect sites of your choosing to an URL you set
 - open said URL when you open a new tab.

You can also quickly toggle it by clicking the icon.
I wrote it for myself because I needed something like this and what was out there was bloated and/or missed the New Tab replacement functionality. Made it less hacky so I can upload it to the Chrome Web Store and not have to download it from git and load unpacked on every PC I use. Feel free to use / make modifications.

The only permission needed is 'notifications', to display the initial notification prompting the user to set the extension up.
(and of course then the actual site URL permissions to intercept the WebRequests and redirect if needed.)

## TODO ##
- let users tweak the Allowed regular expressions (e.g. disallow '\*.facebook.com/\*' but allow 'facebook.com/messages') through the Options page
   - this can currently be done by invoking `saveSetting('allowed', ['<an allowed regex>', '<another regex>' [..] '<last allowed regex>'])` from the console on the Background page (in chrome://extensions -> inspect views -> background page)
