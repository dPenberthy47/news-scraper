var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Create the Note schema
var NoteSchema = new Schema({
    body: {
        type: String
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post"
    }
});

// Create the Note model with the NoteSchema
var Notes = mongoose.model("Notes", NoteSchema);

// Export the Note model
module.exports = Notes;