const { TreeRepository } = require('../database/mongo/repositories');
const { ImageStorageClient } = require('../clients');
const { CheckingFunctionHelper } = require('../helpers');

module.exports = function RoomMatchService() {
	this.treeRepository = new TreeRepository();
	this.imageStorageClient = new ImageStorageClient();
	this.checkingFunctionHelper = new CheckingFunctionHelper();

	const createTree = async (treeData) => {
		// upload & get image uploaded url
		// upload tree image
		const imageIsBase64 = await this.checkingFunctionHelper.checkBase64(
			treeData.image
		);
		if (imageIsBase64) {
			const imagePreset = 'uit_hackathon_tree_images';
			const imageUploadedURL = await this.imageStorageClient.uploadImage(
				treeData.image,
				imagePreset
			);
			// get url of image
			treeData.image = imageUploadedURL;
		}
		const tree = await this.treeRepository.createTree(treeData);
		return tree;
	};

	const getTrees = async (criteria, pagination) => {
		const trees = await this.treeRepository.getTrees(criteria, pagination);
		return trees;
	};

	const getTree = async (id) => {
		const tree = await this.treeRepository.getTree(id);
		return tree;
	};

	return {
		createTree,
		getTrees,
		getTree
	};
};
