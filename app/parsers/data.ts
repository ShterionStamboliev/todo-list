import { DocumentData } from "firebase/firestore";

export function parseData(data: DocumentData[]): TodoProps[] {
    const result: TodoProps[] = [];

    data.forEach((doc) => {
        result.push({
            owner: doc.owner,
            title: doc.title,
            id: doc.id
        });
    });

    return result;
}