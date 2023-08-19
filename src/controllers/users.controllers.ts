   import { Request, Response } from "express";
   import {
      TUserInfo,
      TUserRequest,
      TUserRequestDois,
   } from "../interfaces/users.interfaces";
   import {
      updatedUserRequestSchema,
      userSchemaRequest,
      userSchemaRequestDois,
   } from "../schemas/users.schemas";
   import { User } from "../entities/users.entitie";
   import { createUserService } from "../services/users/createUser.service";
   import { getUserInfo } from "../services/users/getUserInfoWithId.service";
   import { updateUserService } from "../services/users/updateUser.service";
   import { updateAddressService } from "../services/users/updateAddress.service";
import { createAddressService } from "../services/users/createAddressForUser.service";

   const createUserController = async (
      req: Request,
      res: Response
   ): Promise<Response> => {
      if (req.body.isAdmin == "true") {
         req.body.isAdmin = true;
      } else if (req.body.isAdmin == "false") {
         req.body.isAdmin = false;
      }
      const userData: TUserRequest = userSchemaRequest.parse(req.body);

      const newUser: User = await createUserService(userData);

      const response: TUserRequestDois = userSchemaRequestDois.parse(newUser);

      return res.status(201).json(response);
   };

   const getUserByIdController = async (
      req: Request,
      res: Response
   ): Promise<Response> => {
      const userId = Number(req.params.id);

      const userInfo: TUserInfo = await getUserInfo(userId);

      return res.status(200).json(userInfo);
   };

   const updateUserController = async(req:Request, res:Response):Promise<Response> =>{

      const userData = req.body;
      const userId = Number(req.params.id)

      const updatedUser = await updateUserService(userId,userData);

      const returnUser = updatedUserRequestSchema.parse(updatedUser[0]) 
      

      return res.status(200).json(returnUser)
   } 

   const updateAddressController = async (req: Request, res: Response): Promise<Response> => {
      const addressData = req.body;
      const userId = Number(req.params.id);

      const updatedAddress = await updateAddressService(userId, addressData);

      return res.status(200).json(updatedAddress);
   }

   const createAddressController = async (req: Request, res: Response): Promise<Response> => {
      const addressData = req.body;
      const userId = Number(req.params.id);
   
      const userWithAddress = await createAddressService(userId, addressData);
   
      return res.status(201).json(userWithAddress);
   }
   

   export { createUserController, getUserByIdController, updateUserController, updateAddressController, createAddressController };
