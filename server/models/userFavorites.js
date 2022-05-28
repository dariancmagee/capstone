const mongoose = require("mongoose");

const userFavoritesSchema = new mongoose.Schema({
	id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user',
    },
	favorites: [{
       id: { 
           type: String
       },
       photo: {
           type: String,
       },
       bodyPart: {
           type: String,
       },
       equipment: {
           type: String,
       },
    }]
});

const Favorites = mongoose.model("favorites", userFavoritesSchema);

module.exports= Favorites;