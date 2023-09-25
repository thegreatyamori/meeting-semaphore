import { Registry } from "rage-edit";

const getActiveApps = async () => {
  const WEBCAM_REGISTRY_PATH =
    "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\CapabilityAccessManager\\ConsentStore\\microphone";
  const WEBCAM_OFF_TIMESTAMP_VALUE = "0x0";
  const WEBCAM_EXCLUDE_REGISTRY_VALUES = ["$values", "nonpackaged"];
  const WEBCAM_NON_PACKAGED = "\\NonPackaged";

  const reg = new Registry(WEBCAM_REGISTRY_PATH);
  const subRegistries = await Promise.all([
    reg.get(),
    reg.get(WEBCAM_NON_PACKAGED),
  ]);
  const registryPaths = subRegistries
    .map((registry) => Object.keys(registry))
    .flat()
    .filter((value) => !WEBCAM_EXCLUDE_REGISTRY_VALUES.includes(value))
    .map((value) =>
      !value.startsWith("c:#")
        ? `\\${value}`
        : `${WEBCAM_NON_PACKAGED}\\${value}`
    )
    .map((pathApp) => reg.get(pathApp));
  const registryValues = await Promise.all(registryPaths);

  const activeApps = registryValues.filter(
    (value) =>
      value["$values"]["lastusedtimestop"] === WEBCAM_OFF_TIMESTAMP_VALUE
  );

  return activeApps;
};

export const subscribe = async (pollingTime = 1000) => {
  const activeApps = await getActiveApps();
  await new Promise((resolve) => setTimeout(resolve, pollingTime));
  console.log(activeApps.length !== 0 ? "Cam/Micro: ON" : "Cam/Micro: OFF");
  await subscribe(pollingTime);
};
