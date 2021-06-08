const models = require("../models");

const getAllOrderAsAdmin = async (req, res, next) => {
	try {
		const orders = await models.Order.findAll({
			where: { adminId: req.user },
			include: [models.Branch],
		});
		res.status(200).json(orders);
	} catch (error) {
		next(error);
	}
};

const getAllOrderAsUser = async (req, res, next) => {
	try {
		const orders = await models.Order.findAll({
			where: { userId: req.user },
			include: [models.Branch],
		});

		res.status(200).json(orders);
	} catch (error) {
		next(error);
	}
};

const getSpecificOrder = async (req, res, next) => {
	try {
		const order = await models.Order.findByPk(req.params.order_id, {
			include: [models.Branch],
		});

		if (!order) {
			const error = new Error("Not Found");
			error.status = 404;
			next(error);
		} else {
			res.status(200).json(order);
		}
	} catch (error) {
		next(error);
	}
};

const createOrder = async (req, res, next) => {
	try {
		const adminId = await models.User.findOne({
			where: { id: parseInt(req.user) },
			attributes: ["adminId"],
		});

		if (!adminId) {
			const error = new Error("Not Found");
			error.status = 404;
			next(error);
		}

		const branch = await models.Branch.findOne({
			where: { branch_location: req.body.branch_location },
		});
		console.log(branch);

		if (!branch) {
			const error = new Error("Not Found");
			error.status = 404;
			next(error);
		}

		const data = {
			order_type: req.body.order_type,
			order_baggage: req.body.order_baggage,
			order_status: req.body.order_status,
			order_estimatedtime: req.body.order_estimatedtime,
			sender: req.body.sender,
			sender_contact: req.body.sender_contact,
			receiver: req.body.receiver,
			receiver_contact: req.body.receiver_contact,
			userId: req.user,
			adminId: adminId.adminId,
			branchId: branch.id,
		};

		const order = await models.Order.create(data);
		res.status(200).json(order);
	} catch (error) {
		next(error);
	}
};

const updateOrder = async (req, res, next) => {
	try {
		const data = {
			order_type: req.body.order_type,
			order_baggage: req.body.order_baggage,
			order_status: req.body.order_status,
			order_estimatedtime: req.body.order_estimatedtime,
			sender: req.body.sender,
			sender_contact: req.body.sender_contact,
			receiver: req.body.receiver,
			receiver_contact: req.body.receiver_contact,
		};

		const update = await models.Order.update(data, {
			where: {
				id: req.params.order_id,
			},
		});

		if (!update) {
			const error = new Error("Not found");
			error.status = 404;
			next(error);
		} else {
			res.status(200).json({ message: "Successfully updated order." });
		}
	} catch (error) {
		next(error);
	}
};

const deleteOrder = async (req, res, next) => {
	try {
		const deleted = await models.Order.destroy({
			where: {
				id: req.params.order_id,
			},
		});

		if (!deleted) {
			const error = new Error("Not found");
			error.status = 404;
			next(error);
		} else {
			res.status(200).json({ message: "Successfully deleted order." });
		}
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getAllOrderAsAdmin,
	getAllOrderAsUser,
	getSpecificOrder,
	createOrder,
	deleteOrder,
	updateOrder,
};
