import getSimState from 'expo-sim-state';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

export default function App() {
  const [simCards, setSimCards] = useState<any>(null);

  useEffect(() => {
    async function fetchSimCards() {
      try {
        const result = await getSimState();
        // console.log('Available SIM Cards:', result);
        setSimCards(result);
      } catch (err) {
        console.log('err :', String(err));
      }
    }

    fetchSimCards();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text>{JSON.stringify(simCards, null, 2)}</Text>
    </View>
  );
}