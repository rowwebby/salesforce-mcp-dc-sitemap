    config.global.onActionEvent = function(actionEvent) {
        if(actionEvent.user.identities && actionEvent.user.identities.MCP_IDENTITY_ATTRIBUTE_NAME){
            const dcEventEndpoint = "TENANT_SPECIFIC_ENDPOINT/web/events/APP_SOURCE_ID";
            
            const now = new Date();
            const deviceId = SalesforceInteractions.getAnonymousId();
            
            let dcEvent = {
                "category": "Profile",
                "eventId": "mcp_idenitity_" + deviceId + now.getTime(),
                "dateTime": now.toISOString(),
                "sessionId": deviceId,
                
                "eventType": "partyIdentification",
                "deviceId": deviceId,
                "userId": actionEvent.user.identities.MCP_IDENTITY_ATTRIBUTE_NAME,
                "IDName": "PARTY_ID_NAME",
                "IDType": "PARTY_ID_TYPE",
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
