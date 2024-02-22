module.exports = function (RED) {
    
  function hold(n) {
    RED.nodes.createNode(this, n);
    conn = RED.nodes.getNode(n.server);
    this.client = conn.apiClient.application;

    var node = this;

    node.on('input', async msg => {
      call_id = msg.payload.call ? msg.payload.call.id : msg.payload.call_id;
      applicaton_uuid = msg.payload.application_uuid;
      if (call_id && application_uuid) {
        node.log('Hold call');
        try {
          const result = await node.client.startHoldCall(application_uuid, call_id);
          msg.payload.call_id = call_id;
          msg.payload.application_uuid = application_uuid;
          msg.payload.data = result;
          node.send(msg);
        }
        catch(err) {
          node.error(`Hold error: ${err.message}`);
        }
      }
    });  
  }

  RED.nodes.registerType("wazo hold", hold);

};
