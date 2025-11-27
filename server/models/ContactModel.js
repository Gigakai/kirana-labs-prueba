import {DataTypes, Model} from "sequelize";
import sequelize from '../config/database.js';

class ContactModel extends Model {
}

ContactModel.init({
    email:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone:{
        type: DataTypes.STRING,
        allowNull: false,
    }
},{
    sequelize: sequelize,
    modelName: "Contact",
    timestamps: false,
})

export default ContactModel