import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IConversation } from '@/app/interfaces/IConversation';

interface ConversationState {
  selectedConversation: IConversation | null;
}

const initialState: ConversationState = {
  selectedConversation: null,
};

const conversationsSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    setSelectedConversation(state, action: PayloadAction<IConversation>) {
      state.selectedConversation = action.payload;
    },
    clearSelectedConversation(state) {
      state.selectedConversation = null;
    },
  },
});

export const { setSelectedConversation, clearSelectedConversation } = conversationsSlice.actions;
export default conversationsSlice.reducer;
