import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { fetchProjects } from "../services/apiService";

const ProjectsScreen = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(Object.entries(data.outputs || {})); // Convert object to array
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    getProjects();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />;
  if (error) return <Text style={styles.error}>{error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Solar Resource Data</Text>
      <FlatList
        data={projects}
        keyExtractor={([key]) => key}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.key}>{item[0]}</Text>
            <Text style={styles.value}>{JSON.stringify(item[1])}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  item: { borderBottomWidth: 1, padding: 10 },
  key: { fontWeight: "bold" },
  value: { fontSize: 14 },
  loading: { flex: 1, justifyContent: "center", alignItems: "center" },
  error: { color: "red", textAlign: "center" },
});

export default ProjectsScreen;
