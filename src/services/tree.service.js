const { TreeRepository } = require('../database/mongo/repositories');
const { ImageStorageClient } = require('../clients');

module.exports = function RoomMatchService() {
	this.treeRepository = new TreeRepository();
	this.imageStorageClient = new ImageStorageClient();

	const createTree = async (treeData) => {
		// upload & get image uploaded url
		// upload tree image
		const imagePreset = 'uit_hackathon_tree_images';
		const imageUploadedURL = await this.imageStorageClient.uploadImage(
			treeData.image,
			imagePreset
		);
		// get url of image
		treeData.image = imageUploadedURL;
		const tree = await this.treeRepository.createTree(treeData);
		return tree;
	};

	const getTrees = async (criteria, pagination) => {
		const trees = await this.treeRepository.getTrees(criteria, pagination);
		return trees;
	};

	return {
		createTree,
		getTrees
	};
};
