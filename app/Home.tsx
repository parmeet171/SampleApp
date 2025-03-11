import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { auth } from "../config/firebaseConfig";
import { addCourse } from "@/config/firebaseFunctions";
import { router } from "expo-router";
import { setCourses } from "@/store/slices/courseSlice";

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddCourse = async () => {
    setLoading(true);
    try {
      const addedCourse = await addCourse(title, description);

      // if (addedCourse) {
      // dispatch(setCourses([...(user?.courses || []), addedCourse]));
      setTitle("");
      setDescription("");
      // }
      // alert("Course Added!");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.collegeName}>My College Name</Text>

        <View style={styles.card}>
          <Text style={styles.heading}>Add Courses</Text>

          <TextInput
            style={styles.input}
            placeholder="Course Title*"
            value={title}
            onChangeText={setTitle}
          />

          <TextInput
            style={styles.input}
            placeholder="Course Description"
            value={description}
            onChangeText={setDescription}
          />

          {/* <TouchableOpacity style={styles.button} onPress={handleAddCourse}>
          <Text style={styles.buttonText}>Add Course</Text>
        </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.button}
            onPress={handleAddCourse}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Add Course</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.seeCources}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/Courses")}
        >
          <Text style={styles.buttonText}>See My Courses</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  seeCources: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "#fff",
    padding: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 4,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  collegeName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 20,
  },
  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
