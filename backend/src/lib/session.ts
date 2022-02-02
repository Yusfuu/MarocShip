import { ironSession } from "iron-session/express";
import { sealData, unsealData } from "iron-session";

export const session = ironSession({
  cookieName: "session-app",
  password: 'WuiH12k4teOueGzMflhzvghJHwbw2InJ',
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
});

const password = 'Jr7ZGndbGr97k4hOcMFsOWXi4JOGTHl3';

export const seal: Function = async (data: any): Promise<any> => sealData(data, { password });

export const unseal: Function = async (data: any): Promise<any> => unsealData(data, { password });
