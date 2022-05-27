# SupportBot Macro
# This Macro adds a "Request Support" button to the control panel of Webex devices
# Once pressed the user is presented with 4 support request options which they can select from
# The script then sends a webex message to a bot which posts the support request message in a room providing support message selected and device name
# 

Installation Instructions:

The macro requires a number of things:

1.	Create a Webex bot by following these instructions:
  a.	https://developer.webex.com/docs/bots
  b.	Log in to developer.webex.com should be your normal Webex login.
  c. Select "Create a Bot" and complete the form
  d.	NOTE down and SAVE the bot access token created when you build the bot – we’ll need the code later and you only get to see it once.
2.	Create a normal space in Webex messaging and add the bot to it
3.	Find the Webex space roomID
    a.	Use the Webex api web page to find the roomID the bot you created belongs to:
    b.	https://developer.webex.com/docs/api/v1/rooms/list-rooms
      i.	Toggle off the “Use personal access token” switch and put the BOT token you saved in the “bearer” field
      ii.	This lists the rooms the bot is a member of. From the “Results” section you need to get the “id” of the room you created with the bot
	 
4.	Edit the macro script and add the BOT token and RoomId at line 21 and 24

// ADD YOUR BOT TOKEN HERE
const yourBotToken = '+++CHANGE TO BOT TOKEN+++’;

//ADD YOUR ROOM ID HERE
const supportRoomID = '+++CHANGE TO ROOM ID+++'

5.	Save script
6.	Install macro on endpoint
  a.	Login on to device web configuration page (either via control hub or local access)
  b.	Select “Marco Editor”
  c.	Select “Import From File” and choose the macro file from your laptop
  d.	Click “Save to Video System” Icon  
  e.	Enable the Marco via the slider  
                
The Macro should now be installed with a new support button on the panel.

