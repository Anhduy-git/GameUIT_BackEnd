const { RoomMatch } = require('../models');

module.exports = function UserRepository() {
	const createRoomMatch = async (roomMatchData) => {
		await RoomMatch.create(roomMatchData);
	};

	const getRoomsMatch = async (criteria, pagination) => {
		const { limit } = pagination;
		const { page } = pagination;
		const roomsMatch = await RoomMatch.find(criteria)
			.limit(limit)
			.skip(limit * (page - 1));
		return roomsMatch;
	};

	return {
		createRoomMatch,
		getRoomsMatch
	};
};
