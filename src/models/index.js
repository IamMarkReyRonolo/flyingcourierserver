const { DataTypes } = require("sequelize");
const db = require("../utils/db");

const Admin = db.define(
	"admin",
	{
		admin_username: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		admin_password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{ tableName: "admin" }
);

const Branch = db.define(
	"branch",
	{
		branch_name: DataTypes.STRING,
		branch_location: DataTypes.STRING,
		branch_businesshours: DataTypes.STRING,
	},
	{ tableName: "branch" }
);

const Order = db.define(
	"order",
	{
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4(),
		},
		order_type: DataTypes.STRING,
		order_baggage: DataTypes.STRING,
		order_status: DataTypes.STRING,
		order_estimatedtime: DataTypes.STRING,
		sender: DataTypes.STRING,
		sender_contact: DataTypes.STRING,
		receiver: DataTypes.STRING,
		receiver_contact: DataTypes.STRING,
	},
	{ tableName: "order" }
);

const User = db.define(
	"user",
	{
		fullname: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		contact_number: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		username: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{ tableName: "user" }
);

Admin.hasMany(User, { onDelete: "CASCADE" });
User.belongsTo(Admin);

User.hasMany(Order, { onDelete: "CASCADE" });
Order.belongsTo(User);

Branch.hasMany(Order, { onDelete: "CASCADE" });
Order.belongsTo(Branch);

Admin.hasMany(Branch, { onDelete: "CASCADE" });
Branch.belongsTo(Admin);

Admin.hasMany(Order, { onDelete: "CASCADE" });
Order.belongsTo(Admin);

module.exports = { Admin, User, Order, Branch };
