import React, {useEffect, useState} from 'react';
import {addDoc, collection, query, where, onSnapshot, updateDoc, doc, orderBy} from "firebase/firestore";
import {auth, firestore} from "../utils/firebase.utils";
import {signOut} from "firebase/auth";
import {AiFillCheckCircle, AiOutlinePoweroff, FiCircle, FiPlus} from "react-icons/all";

const AuthenticatedPage = ({user}) => {

    /**
     * The input state for new todos.
     */
    const [todoText, setTodoText] = useState("");

    /**
     * The tasks state for signed in user.
     */
    const [tasks, setTasks] = useState([]);

    useEffect(() => {

        /**
         * READING FROM FIRESTORE
         * This function allows us to read from the firestore database.
         * We have added a filter to make sure the user only sees their tasks.
         * We have added a [orderBy] function so that all tasks are ordered by the date they were created in.
         * We have also added security rules to Firestore DB to make sure it is secure.
         * Refer to (https://firebase.google.com/docs/firestore/query-data/listen#listen_to_multiple_documents_in_a_collection)
         */
        const q = query(collection(firestore, "tasks"), where("uid", "==", user.uid), orderBy("created", "desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const tasks = [];
            querySnapshot.forEach((doc) => {
                let id = doc.id;
                tasks.push({
                    id: id,
                    ...doc.data()
                });
            });
            setTasks(tasks);
        });

        return () => {
            unsubscribe();
        }

    }, [user.uid])

    /**
     * WRITE TO FIRESTORE
     * We are adding a document to the collection [tasks].
     * The field [uid] helps us identify who the task belongs to when we read.
     * Refer to (https://firebase.google.com/docs/firestore/manage-data/add-data#add_a_document)
     */
    const addToDo = async (event) => {
        event.preventDefault();
        // Clearing the text field once a user adds a task.
        let text = todoText;
        setTodoText("");

        // Adding data to Firestore
        if (text) {
            await addDoc(collection(firestore, "tasks"), {
                text: text,
                uid: user.uid,
                created: new Date()
            });
        }
    }

    /**
     * UPDATE DOC IN FIRESTORE
     * We are updating a document in the collection [tasks].
     * The field [complete] is the only field that will updated based on the id of the document.
     * Refer to (https://firebase.google.com/docs/firestore/manage-data/add-data#update-data)
     */
    const updateTask = (id, value) => {
        const ref = doc(firestore, "tasks", id);
        updateDoc(ref, {
            complete: value
        });
    }

    /**
     * SIGN OUT USER
     * Refer to (https://firebase.google.com/docs/auth/web/password-auth#next_steps)
     */
    const userSignOut = () => {
        signOut(auth);
    }

    return (
        <div className={"space-y-6"}>
            {/*Profile Section*/}
            <div className={"flex bg-white border border-gray-200 rounded-lg px-6 py-4 space-between"}>
                <div className={"flex space-x-3"}>
                    <div className={"w-8 h-8 rounded-full overflow-hidden mt-1"}>
                        <img alt={"Profile of User"} src={user.photoURL} className={"object-cover w-full h-full"}/>
                    </div>
                    <div>
                        <p className={"text-lg font-semibold text-gray-900 leading-tight"}>
                            {user.displayName}
                        </p>
                        <p className={"text-sm font-normal opacity-75 leading-tight"}>
                            {user.email}
                        </p>
                    </div>
                </div>
                <button
                    onClick={userSignOut}
                    className={"ml-auto flex items-center space-x-2 hover:opacity-75"}>
                    <AiOutlinePoweroff/>
                    <p className={"text-sm"}>
                        Sign Out
                    </p>
                </button>
            </div>

            {/*New Task Input*/}
            <form onSubmit={addToDo} id={"addTodoForm"}>
                <div className={"flex items-center max-w-2xl relative"}>
                    <input placeholder={"Add Task"} type={"text"} name={"todoText"}
                           value={todoText} onChange={(newValue) => {setTodoText(newValue.target.value)}}
                           className={"w-full border shadow-sm border-gray-200 rounded-lg px-5 py-3"}
                    />
                    <button type={"submit"} className={"absolute right-5 transition duration-200 hover:bg-blue-100 rounded-full p-1"}>
                        <FiPlus size={24} className={`${todoText.length > 1 ? "text-blue-500" : "text-gray-700"}`}/>
                    </button>
                </div>
            </form>

            {/*Task List*/}
            <div className={"w-full bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden"}>
                {tasks.map((t, index) => {

                    let is_last = index === (tasks.length-1)

                    return (
                        <div key={t.id} className={`${is_last ? "border-0" : "border-b"} pr-5 border-gray-200 flex items-center hover:bg-gray-50`}>
                            <button
                                onClick={() => { updateTask(t.id, !t.complete) }}
                                className={"text-blue-700 rounded-full pl-8 pr-6 py-4"}>
                                { !t.complete ?
                                    <FiCircle size={24}/>
                                    :
                                    <AiFillCheckCircle size={24}/>

                                }
                            </button>
                            <p className={`text-base font-medium ${t.complete ? "line-through": ""}`}>
                                {t.text}
                            </p>
                        </div>
                    )

                })}
            </div>
        </div>
    );
}

export default AuthenticatedPage;