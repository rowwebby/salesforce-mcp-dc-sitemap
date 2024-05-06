    config.global.onActionEvent = function(actionEvent) {
        if(actionEvent.user.identities && actionEvent.user.identities.sfmcContactKey){
            const dcEventEndpoint = "https://g5qwky3fgmyg8mb-m04wmmrymq.c360a.salesforce.com/web/events/54369243-28d6-4b8e-9cd1-2e78f4d2c3c1";
            
            const now = new Date();
            const deviceId = SalesforceInteractions.getAnonymousId();
            
            let dcEvent = {
                "category": "Profile",
                "eventId": "mcp_idenitity_" + deviceId + now.getTime(),
                "dateTime": now.toISOString(),
                "sessionId": deviceId,
                
                "eventType": "partyIdentification",
                "deviceId": deviceId,
                "userId": actionEvent.user.identities.sfmcContactKey,
                "IDName": "MC Subscriber Key",
                "IDType": "Person Identifier",
            };
            
            const dcData = {"events": [dcEvent]}
            
            fetch(dcEventEndpoint + "?event=" + btoa(JSON.stringify(dcData)), {
                "method": "GET",
                "keepalive": true,
                "mode": "no-cors"
            });
        }
        return actionEvent;
    };    