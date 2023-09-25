import { Registry } from "rage-edit";
import WinResponse from "./response.js";

const WEBCAM_REGISTRY_PATH = "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\CapabilityAccessManager\\ConsentStore";
const WEBCAM_OFF_TIMESTAMP_VALUE = "0x0";
const WEBCAM_EXCLUDE_REGISTRY_VALUES = ["$values", "nonpackaged"];
const WEBCAM_NON_PACKAGED = "\\NonPackaged";

const _getActiveApps = async (ioDevice) => {
  const deviceRegistryPath = `${WEBCAM_REGISTRY_PATH}\\${ioDevice}`;
  const reg = new Registry(deviceRegistryPath);
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

const getActiveApps = async (ioDevice) =>{
  const activeApps = await _getActiveApps(ioDevice);
  return new WinResponse(activeApps);
}

export default { getActiveApps }
