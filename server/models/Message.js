const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
        room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
        owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        text: { type: String },
        image: [{ type: String }],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);