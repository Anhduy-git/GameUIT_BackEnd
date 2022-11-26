const { RoomMatchRepository } = require('../database/mongo/repositories');
const { ImageStorageClient } = require('../clients');
const { CheckingFunctionHelper } = require('../helpers');

module.exports = function RoomMatchService() {
	this.roomMatchRepository = new RoomMatchRepository();
	this.imageStorageClient = new ImageStorageClient();
	this.checkingFunctionHelper = new CheckingFunctionHelper();

	const createRoomMatch = async (roomData) => {
		// upload & get image uploaded url
		// upload tree image
		const imageIsBase64 = await this.checkingFunctionHelper.checkBase64(
			roomData.image
		);
		if (imageIsBase64) {
			const imagePreset = 'uit_hackathon_room_images';
			const imageUploadedURL = await this.imageStorageClient.uploadImage(
				roomData.image,
				imagePreset
			);
			// get url of image
			roomData.image = imageUploadedURL;
		}

		await this.roomMatchRepository.createRoomMatch(roomData);
	};

	const getRoomsMatch = async (criteria, pagination) => {
		const roomsMatch = await this.roomMatchRepository.getRoomsMatch(
			criteria,
			pagination
		);
		return roomsMatch;
	};

	return {
		createRoomMatch,
		getRoomsMatch
	};
};
