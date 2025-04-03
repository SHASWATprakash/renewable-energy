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

  if (loading) return <ActivityIndicator size="large" color="#007BFF" style={styles.loading} />;
  if (error) return <Text style={styles.error}>{error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Solar Resource Data</Text>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.headerText}>Parameter</Text>
          <Text style={styles.headerText}>Values</Text>
        </View>
        <FlatList
          data={projects}
          keyExtractor={([key]) => key}
          renderItem={({ item }) => (
            <View style={styles.tableRow}>
              <Text style={styles.cell}>{item[0]}</Text>
              <Text style={styles.cell}>{JSON.stringify(item[1])}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f0f8ff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10, textAlign: "center", color: "#007BFF" },
  table: { borderWidth: 1, borderColor: "#007BFF", borderRadius: 5, overflow: "hidden" },
  tableHeader: { flexDirection: "row", backgroundColor: "#007BFF", padding: 10 },
  headerText: { flex: 1, color: "#fff", fontWeight: "bold", textAlign: "center" },
  tableRow: { flexDirection: "row", borderBottomWidth: 1, borderColor: "#007BFF", padding: 10 },
  cell: { flex: 1, textAlign: "center", fontSize: 14 },
  loading: { flex: 1, justifyContent: "center", alignItems: "center" },
  error: { color: "red", textAlign: "center" },
});

export default ProjectsScreen;