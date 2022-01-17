import express from "express"
import { googleOauthHandler } from "../controllers/OAuthGoogle";

const router = express.Router()

router.get("/oauth", googleOauthHandler)


export default router;