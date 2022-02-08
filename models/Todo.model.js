const { Schema, model } = require("mongoose")

const todoSchema = new Schema(
    {
        name: String,
        owner: { type: Schema.Types.ObjectId, ref: "User"}
    },
    {
        timestamps: true
    }
)

module.exports = model("Todo", todoSchema)