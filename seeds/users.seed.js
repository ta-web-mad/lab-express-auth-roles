const mongoose = require("mongoose");
const UserModel = require("../models/User.model");
//const MONGO_URI = process.env.MONGODB_URI;


const user = [
    {
        username: "Pepito",
        email: "pepito@gmail.es",
        profileImg: "https://images.freeimages.com/images/large-previews/c10/building-1233576.jpg",
        description: "Una prueba más"

    },
    {
        username: "Fito",
        email: "fito@gmail.es",
        profileImg: "https://media.istockphoto.com/photos/manhattan-office-building-from-below-picture-id811478226?k=20&m=811478226&s=612x612&w=0&h=PnRFeJT9K1dLDE9yJe65Lr3RLyKYF_qWVOSjDkbQyvs=",
        description: "Una prueba más"

    },
    {
        username: "Santi",
        email: "santi@gmail.es",
        profileImg: "https://media.istockphoto.com/photos/manhattan-office-building-from-below-picture-id811478226?k=20&m=811478226&s=612x612&w=0&h=PnRFeJT9K1dLDE9yJe65Lr3RLyKYF_qWVOSjDkbQyvs=",
        description: "Una prueba más"

    }, {
        username: "Dave",
        email: "Dave@gmail.es",
        profileImg: "https://media.istockphoto.com/photos/manhattan-office-building-from-below-picture-id811478226?k=20&m=811478226&s=612x612&w=0&h=PnRFeJT9K1dLDE9yJe65Lr3RLyKYF_qWVOSjDkbQyvs=",
        description: "Una prueba más"

    }
];

mongoose
    .connect("mongodb://localhost/ironhack-learn")
    .then(() => {
        return UserModel.deleteMany();
    })
    .then(value => {
        return UserModel.create(user)
    })
    .then((user) => {
        console.log(user)
    })
    .catch((err) => {
        console.error("Error connecting to mongo: ", err);
    })
    .finally(() => {
        mongoose.connection.close();
    });
