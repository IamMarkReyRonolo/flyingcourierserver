const models = require("../models");

const getAllBranch = async (req, res, next) => {
	try {
		const branch = await models.Branch.findAll({
			where: { adminId: req.user },
		});
		res.status(200).json(branch);
	} catch (error) {
		next(error);
	}
};

const getSpecificBranch = async (req, res, next) => {
	try {
		const branch = await models.Branch.findByPk(req.params.branch_id);

		if (!branch) {
			const error = new Error("Not Found");
			error.status = 404;
			next(error);
		} else {
			res.status(200).json(branch);
		}
	} catch (error) {
		next(error);
	}
};

const createBranch = async (req, res, next) => {
	try {
		console.log(req.body);
		const data = {
			branch_name: req.body.branch_name,
			branch_location: req.body.branch_location,
			branch_businesshours: req.body.branch_businesshours,
			adminId: req.user,
		};

		const branch = await models.Branch.create(data);
		res.status(200).json(branch);
	} catch (error) {
		next(error);
	}
};

const updateBranch = async (req, res, next) => {
	try {
		const data = {
			branch_name: req.body.branch_name,
			branch_location: req.body.branch_location,
			branch_businesshours: req.body.branch_businesshours,
		};

		const update = await models.Branch.update(data, {
			where: {
				id: req.params.branch_id,
			},
		});

		if (!update) {
			const error = new Error("Not found");
			error.status = 404;
			next(error);
		} else {
			res.status(200).json({ message: "Successfully updated branch." });
		}
	} catch (error) {
		next(error);
	}
};

const deleteBranch = async (req, res, next) => {
	try {
		const deleted = await models.Branch.destroy({
			where: {
				id: req.params.branch_id,
			},
		});

		if (!deleted) {
			const error = new Error("Not found");
			error.status = 404;
			next(error);
		} else {
			res.status(200).json({ message: "Successfully deleted branch." });
		}
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getAllBranch,
	getSpecificBranch,
	createBranch,
	deleteBranch,
	updateBranch,
};
