import { deleteDoc, deleteField, doc, setDoc } from "firebase/firestore";
import { runTodoDeleteSuccess } from "../alerts/onSuccess";
import { auth, db } from "../firebase/config";

export const handleDeleteTodo = (id: any) => {
    if (auth.currentUser) {
        const userRef = doc(db, 'users', auth.currentUser.uid);
        deleteDoc(doc(db, 'todos', id)).then(async () => {
            await setDoc(userRef, {
                todoList: {
                    [id]: deleteField()
                }
            }, { merge: true });
        }
        )
    }
    runTodoDeleteSuccess();
};