import conversationModel from "../models/conversation.model.js";
import messageModel from "../models/message.model.js";

export const createMessage = async (req, res, next) => {
  const newMessage = new messageModel({
    conversationId: req.body.conversationId,
    userId: req.userId,
    desc: req.body.desc,
  });
  try {
    const saveMessage = await newMessage.save();
    await conversationModel.findOneAndUpdate(
      { id: req.body.conversationId },
      {
        $set: {
          readBySeller: req.isSeller,
          readByBuyer: !req.isSeller,
          lastMessage: req.body.desc,
        },
      },
      { new: true }
    );
    res.status(201).send(saveMessage);
  } catch (error) {
    next(error);
  }
};

export const getMessage = async (req, res, next) => {
  try {
    const messages = await messageModel.find({ conversationId: req.params.id });
    res.status(200).send(messages);
  } catch (error) {
    next(error);
  }
};
