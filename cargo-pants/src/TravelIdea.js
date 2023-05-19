import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native';
import { useEffect, useState } from 'react';

export default function TravelIdea() {

  const [destination, setDestination] = useState('')
  const [days, setDays] = useState(5)
  const [numberOfPeople, setNumberOfPeople] = useState('')
  const [age, setAge] = useState(20);
  const [priceMin, setPriceMin] = useState(25);
  const [priceMax, setPriceMax] = useState(100);
  const [wantToSee, setWantToSee] = useState('');
  const [gender, setGender] = useState('man');


  const [loading, setLoading] = useState(false);
  
  const [result, setResult] = useState('');


  const API_URL = 'http://localhost:3000/api';

  const onSubmit = async () => {
    console.log({ destination, numberOfPeople, age, priceMin, priceMax, wantToSee, gender })
    if (loading) {
      return;
    }
    setLoading(true);
    setResult('');
    try {
      const response = await fetch(`${API_URL}/generate-travel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ destination, numberOfPeople, age, priceMin, priceMax, wantToSee, gender }),
      });
      const data = await response.json();
      setResult(data.result);
      console.log(data.result)
    } catch (e) {
      Alert.alert("Couldn't generate ideas", e.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.label}>Destination</Text>
      <TextInput
        placeholder="Paris"
        keyboardType="default"
        style={styles.input}
        value={destination}
        onChangeText={setDestination}
      />
      
    <Text style={styles.label}>How many days?</Text>
      <TextInput
        placeholder="How many days?"
        keyboardType="default"
        style={styles.input}
        value={days}
        onChangeText={setDays}
      />

      <Text style={styles.label}>How many people?</Text>
      <TextInput
        placeholder="How many people?"
        keyboardType="default"
        style={styles.input}
        value={numberOfPeople}
        onChangeText={setNumberOfPeople}
      />

      <Text style={styles.label}>Age</Text>
      <TextInput
        placeholder="Age"
        keyboardType="numeric"
        style={styles.input}
        value={age}
        onChangeText={setAge}
      />
      

      <Text style={styles.label}>Price from ($)</Text>
      <TextInput
        placeholder="Price from"
        keyboardType="numeric"
        style={styles.input}
        value={priceMin}
        onChangeText={setPriceMin}
      />

      <Text style={styles.label}>Price to ($)</Text>
      <TextInput
        placeholder="Price to"
        keyboardType="numeric"
        style={styles.input}
        value={priceMax}
        onChangeText={setPriceMax}
      />

      <Text style={styles.label}>What you want to see?</Text>
      <TextInput
        placeholder="e.g. Eiffel Tower"
        style={styles.input}
        value={wantToSee}
        onChangeText={setWantToSee}
      />
      <Text style={styles.label}>Who is travelling?</Text>
      <View style={styles.selectorContainer}>
        <Text
          onPress={() => setGender("man")}
          style={[
            styles.selector,
            gender === "man" && { backgroundColor: "#10a37f" },
          ]}
        >
          Man
        </Text>
        <Text
          onPress={() => setGender("woman")}
          style={[
            styles.selector,
            gender === "woman" && { backgroundColor: "#10a37f" },
          ]}
        >
          Woman
        </Text>
      </View>
      <Pressable onPress={onSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Generate travel</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 20,
  },
  input: {
    fontSize: 16,
  
    borderColor: "#353740",
    borderWidth: 1,
    borderRadius: 4,
  
    padding: 16,
    marginTop: 6,
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    color: "gray",
  },
  selectorContainer: {
    flexDirection: "row",
  },
  selector: {
    flex: 1,
    textAlign: "center",
    backgroundColor: "gainsboro",
    margin: 5,
    padding: 16,
    borderRadius: 5,
    overflow: "hidden",
  },
  button: {
    marginTop: 50,
    backgroundColor: "#10a37f",
    padding: 16,
    borderRadius: 4,
    alignItems: "center",
    marginVertical: 6,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});