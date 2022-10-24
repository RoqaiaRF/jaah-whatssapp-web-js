# jaah-whatssapp-web-js

# #Send message

Sample request:

curl -X POST http://localhost:8080/send-message \
  
{
      "number": "962799849386",
      "message": " Hey, whats'up ? Good morning :)"
}
Sample response:

{
    "status": true,
    "response": {
        "_data": {
            "id": {
                "fromMe": true,
                "remote": {
                    "server": "c.us",
                    "user": "962799849386",
                    "_serialized": "962799849386@c.us"
                },
                "id": "3EB063C3ABA2B9984723",
                "_serialized": "true_962799849386@c.us_3EB063C3ABA2B9984723"
            },
            "body": "Hey, whats'up ? Good morning :)",
            "type": "chat",
            "t": 1666591974,
            "from": {
                "server": "c.us",
                "user": "962776504678",
                "_serialized": "962776504678@c.us"
            },
            "to": {
                "server": "c.us",
                "user": "962799849386",
                "_serialized": "962799849386@c.us"
            },
            "self": "out",
            "ack": 0,
            "isNewMsg": true,
            "star": false,
            "kicNotified": false,
            "isFromTemplate": false,
            "pollInvalidated": false,
            "latestEditMsgKey": null,
            "latestEditSenderTimestampMs": null,
            "mentionedJidList": [],
            "isVcardOverMmsDocument": false,
            "isForwarded": false,
            "hasReaction": false,
            "disappearingModeInitiator": "chat",
            "productHeaderImageRejected": false,
            "lastPlaybackProgress": 0,
            "isDynamicReplyButtonsMsg": false,
            "isMdHistoryMsg": false,
            "stickerSentTs": 0,
            "requiresDirectConnection": null,
            "pttForwardedFeaturesEnabled": true
        },
        "id": {
            "fromMe": true,
            "remote": {
                "server": "c.us",
                "user": "962799849386",
                "_serialized": "962799849386@c.us"
            },
            "id": "3EB063C3ABA2B9984723",
            "_serialized": "true_962799849386@c.us_3EB063C3ABA2B9984723"
        },
        "ack": 0,
        "hasMedia": false,
        "body": "Hey, whats'up ? Good morning :)",
        "type": "chat",
        "timestamp": 1666591974,
        "from": "962776504678@c.us",
        "to": "962799849386@c.us",
        "deviceType": "web",
        "isForwarded": false,
        "forwardingScore": 0,
        "isStarred": false,
        "fromMe": true,
        "hasQuotedMsg": false,
        "vCards": [],
        "mentionedIds": [],
        "isGif": false
    }
}