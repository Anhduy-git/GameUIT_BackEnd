const { TreeRepository } = require('../database/mongo/repositories');

module.exports = function RoomMatchService() {
	this.treeRepository = new TreeRepository();

	const createTree = async (treeData) => {
		const tree = await this.treeRepository.createTree(treeData);
		return tree;
	};

	const getTrees = async (criteria, pagination) => {
		const trees = await this.treeRepository.getTree(criteria, pagination);
		return trees;
	};

	return {
		createTree,
		getTrees
	};
};
