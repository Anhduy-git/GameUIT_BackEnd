const { RoomMatchService } = require('../../services');
const Response = require('../../utils/response');
const StatusCodes = require('../../utils/status-codes');

module.exports = function RoomMatchController() {
	this.roomMatchService = new RoomMatchService();
	// [POST] /rooms-match
	const createRoomMatch = async (req, res, next) => {
		try {
			const roomData = req.body;
			await this.roomMatchService.createRoomMatch(roomData);
			res.status(StatusCodes.OK).json(new Response({ status: true }));
		} catch (err) {
			next(err);
		}
	};

	// [GET] /rooms-match/?page=1&limit=5&direction=0&roomSizeType=1
	const getRoomsMatch = async (req, res, next) => {
		try {
			const limit = parseInt(req.query.limit, 10);
			const page = parseInt(req.query.page, 10);
			const pagination = { limit, page };

			const criteria = req.query;
			// remove unecessary properties
			delete criteria.page;
			delete criteria.limit;

			const roomsMatch = await this.roomMatchService.getRoomsMatch(
				criteria,
				pagination
			);
			res
				.status(StatusCodes.OK)
				.json(new Response({ status: true, content: roomsMatch }));
		} catch (err) {
			next(err);
		}
	};

	return {
		createRoomMatch,
		getRoomsMatch
	};
};
