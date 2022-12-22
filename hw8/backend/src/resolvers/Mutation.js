import { v4 as uuidv4 } from "uuid";
import { ChatBoxModel } from "../models/chatbox";

const makeName = (name, to) => {
  return [name, to].sort().join("_");
};

const validateChatBox = async (name) => {
  let box = await ChatBoxModel.findOne({ name });
  if (!box) {
    box = await new ChatBoxModel({ name, messages: [] }).save();
    console.log("New ChatBox created");
  }
  return box;
};

const Mutation = {
  createChatBox: (parent, { name1, name2 }) => {
    return validateChatBox(makeName(name1, name2));
  },
  createMessage: async (parent, { name, to, body }, { pubsub }) => {
    const chatBox = await validateChatBox(makeName(name, to));
    const newMsg = { sender: name, body };
    chatBox.messages.push(newMsg);
    await chatBox.save();
    const chatBoxName = makeName(name, to);
    pubsub.publish(`chatBox ${chatBoxName}`, {
      message: newMsg,
    });
    return newMsg;
  },
};

export { Mutation as default };
