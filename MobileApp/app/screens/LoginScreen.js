import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { fetchProjects } from '../services/apiService'; 


const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [apiResponse, setApiResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (auth.currentUser) {
      handleFetchData(); // Fetch data when user is logged in
    }
  }, [auth.currentUser]);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Login Successful!");
      console.log("User logged in:", email);
      // navigation.navigate("screens/DetailsScreen");
      navigation.navigate("screens/ProjectsScreen");
    } catch (error) {
      Alert.alert("Login Failed", error.message);
    }
  };

  const handleFetchData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchProjects();
      setApiResponse(data);
    } catch (error) {
      setApiResponse({ error: "Failed to fetch data" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#333"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#333"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <Button title="Login" onPress={handleLogin} color="#007AFF" />

      {/* API Response Section */}
      <View style={styles.apiSection}>
        <Text style={styles.apiTitle}>API Response:</Text>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <ScrollView style={styles.apiResponse}>
            {apiResponse ? <Text style={styles.apiText}>{JSON.stringify(apiResponse, null, 2)}</Text> : null}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#FFF9C4" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center", color: "#333" },
  input: {
    borderWidth: 2,
    borderColor: "#333",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "#FFF",
  },
  apiSection: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#FFD700",
    borderRadius: 5,
  },
  apiTitle: { fontSize: 16, fontWeight: "bold", color: "#333", marginBottom: 5 },
  apiResponse: {
    marginTop: 10,
    padding: 10,
    maxHeight: 150,
    backgroundColor: "#FFF",
    borderRadius: 5,
  },
  apiText: { fontSize: 12, color: "#333" },
});

export default LoginScreen;