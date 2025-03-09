import { db } from "~/firebase";
import { addDoc, collection, getDocs, onSnapshot } from "firebase/firestore";

// src/components/firestore-example.tsx
import {
  component$,
  useSignal,
  $,
  useTask$,
  useVisibleTask$,
} from "@builder.io/qwik";

export const FirestoreExample = component$(() => {
  const newItem = useSignal("");
  const items = useSignal<string[]>([]);

  useTask$(async () => {
    const querySnapshot = await getDocs(collection(db, "items"));
    items.value = querySnapshot.docs.map((doc) => doc.data().name as string);
  });

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    onSnapshot(collection(db, "items"), (querySnapshot) => {
      console.log("Items updated");
      items.value = querySnapshot.docs.map((doc) => doc.data().name as string);
    });
  });

  const addItem = $(async () => {
    if (newItem.value) {
      console.log({ name: newItem.value });
      await addDoc(collection(db, "items"), { name: newItem.value });
      newItem.value = "";
    }
  });

  return (
    <div>
      <input type="text" bind:value={newItem} />
      <button onClick$={addItem}>Add Item</button>

      <ul>
        {items.value.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
});
