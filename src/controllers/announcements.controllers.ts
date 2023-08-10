import { Request, Response } from "express";
import {
  TAnnouncementRequest,
  TAnnouncementResponse,
  TAnnouncementUpdate,
} from "../interfaces/announcements.interfaces";
import {
  announcementSchemaRequest,
  announcementSchemaResponse,
  announcementSchemaUpadate,
} from "../schemas/announcements.schemas";
import { Announcement } from "../entities/announcements.entitie";
import { createAnnouncementService } from "../services/announcements/createAnnouncement.service";
import { listAnnouncementService } from "../services/announcements/listAnnouncement.service";
import { updateAnnouncementService } from "../services/announcements/updateAnnouncement.service";
import deleteAnnouncementService from "../services/announcements/deleteAnnouncement.service";

const createAnnouncementController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const announcementData: TAnnouncementRequest =
    announcementSchemaRequest.parse(req.body);

  const userId = res.locals.token.id;

  const newAnnouncement: Announcement = await createAnnouncementService(
    announcementData,
    userId
  );

  const response: TAnnouncementResponse =
    announcementSchemaResponse.parse(newAnnouncement);

  return res.status(201).json(response);
};
const updateAnnouncementController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const announcementData = req.body;

  const userId = res.locals.token.id;
  const announcementId = Number(req.params.id);

  const newAnnouncement /*: Announcement*/ = await updateAnnouncementService(
    announcementData,
    userId,
    announcementId
  );

  // const response: TAnnouncementResponse =
  //   announcementSchemaResponse.parse(newAnnouncement);

  return res.status(200).json(newAnnouncement);
};

const deleteAnnouncementController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const announcementId: number = parseInt(req.params.id);


const listAnnouncementController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = Number(req.params.id);

  const response = await listAnnouncementService(userId);

  const parsedResponse: TAnnouncementResponse =
    announcementSchemaResponse.parse(response);

  return res.status(200).json(parsedResponse);
};



  await deleteAnnouncementService(announcementId);

  return res.status(204).send();
};

export {
  createAnnouncementController,
  updateAnnouncementController,
  deleteAnnouncementController,
  listAnnouncementController
};

