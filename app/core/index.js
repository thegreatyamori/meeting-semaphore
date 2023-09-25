import { winGetActiveApps } from "./dependency_injection/index.js";

export const subscribe = async (pollingTime = 1000) => {
  const getActiveApps = winGetActiveApps();
  const activeApps = await getActiveApps("microphone");
  console.info(activeApps.isDeviceActive ? "Cam/Micro: ON" : "Cam/Micro: OFF");

  await new Promise((resolve) => setTimeout(resolve, pollingTime));
  await subscribe(pollingTime);
};
