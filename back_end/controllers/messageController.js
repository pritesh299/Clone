var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Message from "../models/message.js";
export function newMessage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { conversationId, senderId, receiverId, message, seen } = req.body;
        console.log(req.body);
        try {
            const newMessage = new Message({ senderId, receiverId, message, seen });
            yield newMessage.save();
            res.status(201).json({ message: newMessage, msg: "message has been register" });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Internal server error" });
        }
    });
}
export function getMessages(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id1, id2 } = req.params;
            /*       const { messageList, conversation: convo } = await getConversation(id1, id2); */
            /*    res.json({ messageList, conversation: convo }); */
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Internal server error" });
        }
    });
}
