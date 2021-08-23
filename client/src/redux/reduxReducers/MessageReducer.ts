import { Dispatch } from "react";
import * as uuid from "uuid";

export const SET_MESSAGE = "SET_MESSAGE";
export const CLEAR_MESSAGE = "CLEAR_MESSAGE";

export type MessageTypes = "success" | "danger";

export type MessageActionsType =
  | { type: typeof SET_MESSAGE; payload: IMessage }
  | { type: typeof CLEAR_MESSAGE; payload: string };

export const setMessage =
  (message: string, type: MessageTypes) =>
  (dispatch: Dispatch<MessageActionsType>) => {
    const id = uuid.v4();
    dispatch({
      type: "SET_MESSAGE",
      payload: {
        id,
        text: message,
        type,
      },
    });
    setTimeout(() => {
      dispatch({
        type: "CLEAR_MESSAGE",
        payload: id,
      });
    }, 5000);
  };

export interface IMessage {
  text: string;
  id: string;
  type: MessageTypes;
}

interface MessageState {
  messages: IMessage[];
}

const initialState: MessageState = {
  messages: [],
};

export const MessageReducer = (
  state = initialState,
  action: MessageActionsType
): MessageState => {
  switch (action.type) {
    case "SET_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case "CLEAR_MESSAGE":
      return {
        ...state,
        messages: state.messages.filter((m) => m.id !== action.payload),
      };
    default:
      return state;
  }
};
