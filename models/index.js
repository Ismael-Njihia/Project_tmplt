import sequelize from "../config/database";
import { Sequelize } from "sequelize";

const models = {
    User: require("./User")(sequelize, Sequelize.DataTypes),

}

Object.keys(models).forEach((modelName) => {
    if ("associate" in models[modelName]) {
        models[modelName].associate(models);
    }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;