
import xapi from 'xapi';

// send a message to webex via a http post

const webexMsgUrl = 'https://webexapis.com/v1/messages';

function sendMessage(token, toPersonEmail, roomId, markdown) {
  const headers = [
    'Content-Type: application/json',
    'Authorization: Bearer ' + token,
  ];

  const body = Object.assign({ markdown }, toPersonEmail ? { toPersonEmail } : { roomId });
  return xapi.Command.HttpClient.Post({ Header: headers, Url: webexMsgUrl }, JSON.stringify(body));
}

var IssueNotify, baseMessage, systemUnitName;

// ADD YOU BOT TOKEN HERE
const yourBotToken = '+++CHANGE TO BOT TOKEN+++';

//ADD YOUR ROOM ID HERE
const supportRoomID = '+++CHANGE TO ROOM ID+++';

// create the support button
xapi.Command.UserInterface.Extensions.Panel.Save(
  { PanelId: 'GetHelp' }, 
  "<Extensions>  <Version>1.7</Version>  <Panel>    <Order>0</Order>    <PanelId>GetHelp</PanelId>    <Origin>local</Origin>    <Type>Statusbar</Type>    <Icon>Help</Icon>    <Color>#1D805F</Color>    <Name>Request Support</Name>    <ActivityType>Custom</ActivityType>  </Panel></Extensions>" );

// get the systme name
xapi.Status.UserInterface.ContactInfo.Name.get().then((Name) => { systemUnitName = Name });

//Monitor the click of the "GetHelp" button and present options

xapi.event.on('UserInterface Extensions Panel Clicked',(event) => {
    if(event.PanelId == 'GetHelp'){
              xapi.command("UserInterface Message Prompt Display", {
              Title: "Request Help"
            , Text: 'Please select which type of support you require : '
            , FeedbackId: 'SupportNeededType'
            , 'Option.1':'Help Joining the meeting?'
            , 'Option.2':'Technical issues with Audio/Video?'
            , 'Option.3' : 'Catering request?'
            , 'Option.4': 'Other issue?'
            , 'Option.5':'Cancel'
          }).catch((error) => { console.error(error); });


    }
});

// switch with different output messages based on selection

xapi.event.on('UserInterface Message Prompt Response',(event) => {
    switch(event.FeedbackId){
        case 'SupportNeededType':
          switch(event.OptionId){
             case '1':
               xapi.Command.UserInterface.Message.TextLine.Display( { Duration : 15, Text : 'Support Have been Notified of your Meeting issue' });
               baseMessage = 'There is a request for <b>Join Meeting</b> support from room :<b> ';
               IssueNotify = baseMessage.concat(systemUnitName)

                sendMessage(yourBotToken, null, supportRoomID, IssueNotify);
                  break;
              case '2':
                  xapi.Command.UserInterface.Message.TextLine.Display( { Duration : 15, Text : 'Support Have been Notified of your AV issue' });               
                  baseMessage = 'There is a request for <b>AV/Video support</b> from room :<b> ';
                  IssueNotify = baseMessage.concat(systemUnitName)
                    sendMessage(yourBotToken, null, supportRoomID, IssueNotify);
                  break;
                case '3':
                  xapi.Command.UserInterface.Message.TextLine.Display( { Duration : 15, Text : 'Support Have been Notified of your Catering Request' });               
                  baseMessage = 'There is a request for <b>Catering Support</b> from room :<b> ';
                  IssueNotify = baseMessage.concat(systemUnitName)
                    sendMessage(yourBotToken, null, supportRoomID, IssueNotify);
                  break;
              case '4':
                xapi.Command.UserInterface.Message.TextLine.Display( { Duration : 15, Text : 'Support Have been Notified of your room issue' });
                baseMessage = 'There is a request for <b>Other support</b> from room : <b>';
                IssueNotify = baseMessage.concat(systemUnitName)
                    sendMessage(yourBotToken, null, supportRoomID, IssueNotify);
                  break;
              case '5':
                break;
          }   
    }
  });