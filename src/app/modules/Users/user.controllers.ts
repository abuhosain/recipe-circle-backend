import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsynch";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./users.services";

const getUser = catchAsync(async (req, res) => {
    const user : any  = req.user;
    const result = await UserServices.getUserFromDb(user);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Get user successfully',
        data: result,
      });
});


const updateUser = catchAsync(async (req, res) => {
    const user : any = req.user;
    const payload = req.body;
    const result = await UserServices.updateUserIntoDb(user?.email, payload);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User updated successfully',
        data: result,
      });

});

const deleteUser = catchAsync(async (req, res) => {
    const {id} = req.params;
    const result = await UserServices.deleteUserAccountFromDb(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User deleted successfully',
        data: result,
      });
})

export const UserController =  {
    getUser,
    updateUser,
    deleteUser
}