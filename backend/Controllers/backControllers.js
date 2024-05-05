import firebase from "../firebase.js";
import User from "../Models/users.js";
import {
    getFirestore,
    collection,
    doc,
    addDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";

const db = getFirestore(firebase);

export const createUser = async (req, res, next) => {
    try {
        const data = req.body;
        const docRef = await addDoc(collection(db, "users"), data);

        // assing userId to the user
        const userId = docRef.id;
        await updateDoc(doc(db, "users", userId), { userId });

        res.status(200).send("user created successfully");
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export const getUsers = async (req, res, next) => {
    try {
        const users = await getDocs(collection(db, "users"));
        const userArray = [];

        if (users.empty) {
            res.status(400).send("No Users found");
        } else {
            users.forEach((doc) => {
                const user = new User(
                    // doc.id,
                    doc.data().userId,
                    doc.data().userName,
                    doc.data().userImg,
                    doc.data().age,
                    doc.data().contact,
                    doc.data().closeContacts,
                    doc.data().coordinates,
                    doc.data().data
                );
                userArray.push(user);
            });

            res.status(200).send(userArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export const getUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = doc(db, "users", id);
        const data = await getDoc(user);
        if (data.exists()) {
            res.status(200).send(data.data());
        } else {
            res.status(404).send("user not found");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export const updateUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const user = doc(db, "users", id);
        await updateDoc(user, data);
        res.status(200).send("user updated successfully");
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export const addData = async (req, res, next) => {
    try {
        const id = req.params.id;
        const newData = req.body; // Assuming the request body contains the new user data

        // console.log(newData);

        // Get the existing user document
        const userRef = doc(db, "users", id);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            const existingData = userSnap.data().data || {};

            existingData.push(newData);

            // Update the user document with the updated data object
            await updateDoc(userRef, { data: existingData });

            res.status(200).send("New data added successfully");
        } else {
            res.status(404).send("Data not found");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export const patchUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const dataToUpdate = req.body;

        const userRef = doc(db, "users", id);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            // Merge existing data with the updated data
            const existingData = userSnap.data();
            const updatedData = { ...existingData, ...dataToUpdate };

            // Update the user document with the updated data
            await updateDoc(userRef, updatedData);

            res.status(200).send("User partially updated successfully");
        } else {
            res.status(404).send("User not found");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export const getUserData = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const users = await getDocs(collection(db, "users"));
        const userArray = [];

        if (users.empty) {
            res.status(400).send("No Users found");
        } else {
            users.forEach((doc) => {
                if (doc.data().userId === userId) {
                    const user = new User(
                        doc.data().userId,
                        doc.data().userName,
                        doc.data().userImg,
                        doc.data().age,
                        doc.data().contact,
                        doc.data().closeContacts,
                        doc.data().coordinates,
                        doc.data().data
                    );
                    userArray.push(user);
                }
            });

            res.status(200).send(userArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        await deleteDoc(doc(db, "users", id));
        res.status(200).send("user deleted successfully");
    } catch (error) {
        res.status(400).send(error.message);
    }
};
