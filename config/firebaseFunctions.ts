import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

export const addCourse = async (title = "", description = "") => {
  if (!auth.currentUser) {
    console.error("User not authenticated");
    return;
  }

  if (!title.trim()) {
    console.error("Course title is required");
    return;
  }

  const userId = auth.currentUser.uid;
  const coursesRef = collection(db, `users/${userId}/courses`);

  try {
    const newCourse = {
      title,
      description,
      createdAt: new Date().toISOString(),
    };

    const docRef = await addDoc(coursesRef, newCourse);
    // console.log("Course added with ID:", docRef.id);
  } catch (error) {
    console.error("Error adding course:", error);
  }
};

export const getCourses = async () => {
  if (!auth.currentUser) {
    console.error("User not authenticated");
    return;
  }

  const userId = auth.currentUser.uid;
  const coursesRef = collection(db, `users/${userId}/courses`);

  try {
    const querySnapshot = await getDocs(coursesRef);
    const courses = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return courses;
  } catch (error) {
    console.error("Error fetching courses:", error);
  }
};

export const deleteCourse = async (courseId: string) => {
  if (!auth.currentUser) {
    console.error("User not authenticated");
    return;
  }

  const userId = auth.currentUser.uid;
  const courseRef = doc(db, `users/${userId}/courses`, courseId);

  try {
    await deleteDoc(courseRef);
    return courseId;
  } catch (error) {
    console.error("Error deleting course:", error);
  }
};

export const updateCourse = async (
  courseId: string,
  newTitle: string,
  newDescription: string
) => {
  const user = auth.currentUser;

  if (!user) {
    alert("You must be logged in to update a course!");
    return;
  }

  const userId = user.uid; 

  if (!userId) {
    console.error("User ID is missing!");
    return;
  }

  const courseRef = doc(db, `users/${userId}/courses/${courseId}`);

  try {
    const courseSnap = await getDoc(courseRef);

    if (!courseSnap.exists()) {
      console.error(
        "Course does not exist:",
        `users/${userId}/courses/${courseId}`
      );
      return;
    }

    await updateDoc(courseRef, {
      title: newTitle,
      description: newDescription,
    });

    // console.log("Course updated successfully!");
    return true;
  } catch (error) {
    console.error("Error updating course:", error);
    return false;
  }
};
