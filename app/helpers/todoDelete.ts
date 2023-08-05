import { deleteDoc, deleteField, doc, setDoc } from "firebase/firestore";
import { runTodoDeleteSuccess } from "../alerts/onSuccess";
import { auth, db } from "../firebase/config";

export const handleDeleteTodo = async (id: any) => {
    if (auth.currentUser) {
        const userRef = doc(db, 'users', auth.currentUser.uid);
        await deleteDoc(doc(db, 'todos', id));
        await setDoc(userRef, {
            todoList: {
                [id]: deleteField()
            }
        }, { merge: true });
    }
    runTodoDeleteSuccess();
};