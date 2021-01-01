const { GetUser } = require("../../APIGateway/helpers/Requests")

const GetUserRequest = {
    ConnectionString: String,
    username: String

}
module.exports = GetUserRequest;