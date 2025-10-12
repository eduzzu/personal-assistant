import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IConversation } from '@/app/interfaces/IConversation';

interface ConversationState {
  selectedConversation: IConversation | null;
  conversations: IConversation[];
  isSideBarOpen: boolean
}

const initialState: ConversationState = {
  selectedConversation: null,
  conversations: [],
  isSideBarOpen: true
};

const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    setConversations(state, action: PayloadAction<IConversation[]>) {
      state.conversations = action.payload;
    },
    setSelectedConversation(state, action: PayloadAction<IConversation | null>) {
      state.selectedConversation = action.payload;
    },
    addConversation(state, action: PayloadAction<IConversation>) {
      state.conversations.unshift(action.payload);
      state.selectedConversation = action.payload; 
    },
    updateConversation(state, action: PayloadAction<IConversation>) {
      const index = state.conversations.findIndex(c => c._id === action.payload._id);
      if (index !== -1) state.conversations[index] = action.payload;
      if (state.selectedConversation?._id === action.payload._id) {
        state.selectedConversation = action.payload;
      }
    },
   
  },
});

export const { setConversations, setSelectedConversation, addConversation, updateConversation } = conversationSlice.actions;
export default conversationSlice.reducer;
