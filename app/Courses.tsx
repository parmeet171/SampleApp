import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getCourses, deleteCourse } from "@/config/firebaseFunctions";
import { useDispatch, useSelector } from "react-redux";
import { deleteCourseFromState, setCourses } from "@/store/slices/courseSlice";
import { router } from "expo-router";

const Courses = () => {
  const dispatch = useDispatch();

  // @ts-ignore: Ignoring TypeScript error for now
  const courses = useSelector((state) => state?.courses.courses || []);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const coursesData = await getCourses();
        if (coursesData) {
          dispatch(setCourses(coursesData));
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [dispatch]);

  const handleSelectCourse = (courseId: string) => {
    setSelectedCourseId((prevId) => (prevId === courseId ? null : courseId));
  };

  const handleDelete = async (courseId: string) => {
    setLoading(true);
    try {
      await deleteCourse(courseId);
      // @ts-ignore
      dispatch(deleteCourseFromState(courseId));
    //   alert("Course Deleted!");
    } catch (error) {
      console.log(error);
      // setError(error);
    }
    finally {
        setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Courses</Text>

      {loading ? (
        <ActivityIndicator size="small" color="#000" />
      ) : courses.length === 0 ? (
        <Text style={styles.noCourses}>No courses found.</Text>
      ) : (
        <FlatList
          data={courses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleSelectCourse(item?.id)}
              style={styles.courseCard}
            >
              <Text style={styles.courseTitle}>{item.title}</Text>
              {item.description ? (
                <Text style={styles.courseDesc}>{item.description}</Text>
              ) : null}

              {selectedCourseId === item.id && (
                <View style={styles.actions}>
                  <TouchableOpacity
                    style={styles.updateButton}
                    onPress={() =>
                      router.push({
                        pathname: "/UpdateCourse",
                        params: { id: item.id },
                      })
                    }
                  >
                    <Text style={styles.buttonText}>Update</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDelete(item.id)}
                  >
                    <Text style={styles.buttonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              )}
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default Courses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  noCourses: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
  },
  courseCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  courseDesc: {
    fontSize: 14,
    color: "gray",
    marginTop: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 12,
  },
  subview: {
    flexDirection: "column",
    justifyContent: "space-around",
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  updateButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  deleteButton: {
    backgroundColor: "#FF5733",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
