import React, { useEffect } from 'react';
import { RealtimeClient } from '@openai/realtime-api-beta';

const VoiceAgent = () => {
  useEffect(() => {
    const client = new RealtimeClient({ url: 'wss://storybook-reader.hailab.io:8766' });

    // Set parameters before connecting
    client.updateSession({ instructions: 'You are a cheerful and culturally aware storyteller who helps children explore the values of friendship, celebration, and cultural sharing. Use simple language suitable for ages 4–8. When answering children's questions, refer to the events and characters in 'The Magic Carnaval Adventure' to make your responses more engaging.' });
    client.updateSession({ voice: 'alloy' });
    client.updateSession({
      turn_detection: { type: 'none' }, // or 'server_vad'
      input_audio_transcription: { model: 'whisper-1' },
    });

    // Set up event handling
    client.on('conversation.updated', (event) => {
      const { item, delta } = event;
      const items = client.conversation.getItems();
      console.log(items);
      // Handle the updated conversation items
    });

    // Connect to Realtime API
    client.connect().then(() => {
      // receive response
      client.on('response.created', (event) => {
        const { response } = event;
        console.log("Response:", response);
      });
    });

    // Cleanup function to disconnect on component unmount
    return () => {
      client.disconnect();
    };
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div>
      <h1>Voice Agent</h1>
      {/* Additional UI components can be added here */}
    </div>
  );
};

export default VoiceAgent;
