const { RoomMatchRepository } = require('../database/mongo/repositories');

module.exports = function RoomMatchService() {
	this.roomMatchRepository = new RoomMatchRepository();

	const createRoomMatch = async (roomData) => {
		const roomMatch = await this.roomMatchRepository.createRoomMatch(roomData);
		return roomMatch;
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
