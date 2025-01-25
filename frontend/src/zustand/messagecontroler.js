import { create } from "zustand";

const userconversation = create((set) => ({
  selectedConversation: null,
  setselectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],
  setmessage: (messages) => set({ messages }),
}));

export default userconversation;
