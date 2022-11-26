const { Tree } = require('../models');

module.exports = function UserRepository() {
	const createTree = async (treeData) => {
		const tree = await Tree.create(treeData);
		return tree;
	};

	const getTrees = async (criteria, pagination) => {
		const { limit } = pagination;
		const { page } = pagination;
		const trees = await Tree.find(criteria)
			.limit(limit)
			.skip(limit * (page - 1));
		return trees;
	};

	return {
		createTree,
		getTrees
	};
};
