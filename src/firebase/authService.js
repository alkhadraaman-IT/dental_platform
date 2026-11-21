import { auth, db } from "./config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

// وظيفة تسجيل مستخدم جديد (طالب مثلاً)
export const signUpUser = async (userData) => {
  try {
    // 1. إنشاء الحساب في Authentication
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.password
    );
    const user = userCredential.user;

    // 2. تخزين باقي البيانات في Firestore بجدول users
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name: userData.name,
      email: userData.email,
      role: userData.role, // 'student', 'instructor', etc.
      uniId: userData.uniId,
      universityName: userData.universityName,
      studentUniversityId: userData.studentUniversityId,
      phone: userData.phone,
      year: userData.year || null,
      status: "active",
      createdAt: new Date(),
    });

    return { success: true, user };
  } catch (error) {
    console.error("خطأ في التسجيل:", error.message);
    return { success: false, error: error.message };
  }
};