import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { updateCourseInState } from "@/store/slices/courseSlice";
import { useDispatch, useSelector } from "react-redux";
import { updateCourse } from "@/config/firebaseFunctions";
import { useLocalSearchParams, useRouter } from "expo-router";

const UpdateCourse = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();
  // @ts-ignore
  const courses = useSelector((state) => state.courses.courses);
  // @ts-ignore
  const course = courses.find((c) => c.id === id);

  const [updatedTitle, setUpdatedTitle] = useState(course?.title || "");
  const [updatedDescription, setUpdatedDescription] = useState(
    course?.description || ""
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (course) {
      setUpdatedTitle(course.title);
      setUpdatedDescription(course.description);
    }
  }, [course]);

  const handleUpdate = async (
    courseId: string,
    updatedTitle: string,
    updatedDescription: string
  ) => {
    setLoading(true);
    try {
      await updateCourse(courseId, updatedTitle, updatedDescription);
      dispatch(
        updateCourseInState({
          id,
          title: updatedTitle,
          description: updatedDescription,
        })
      );
      // alert("Course Updated!");
      router.back();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.collegeName}>Update Your Course</Text>

        <View style={styles.card}>
          <TextInput
            style={styles.input}
            value={updatedTitle}
            onChangeText={setUpdatedTitle}
            placeholder="Enter new title"
          />
          <TextInput
            style={styles.input}
            value={updatedDescription}
            onChangeText={setUpdatedDescription}
            placeholder="Enter new description"
          />
          {/* <TouchableOpacity
            onPress={() =>
              // @ts-ignore
              handleUpdate(id, updatedTitle, updatedDescription)
            }
            style={styles.updateButton}
          >
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            style={styles.updateButton}
            onPress={() =>
              // @ts-ignore
              handleUpdate(id, updatedTitle, updatedDescription)
            }
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Update</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default UpdateCourse;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
    height: "100%",
  },
  collegeName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4CAF50",
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
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15, // More spacing
    fontSize: 16,
    backgroundColor: "#fff",
  },
  updateButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 10, // Adds spacing
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
