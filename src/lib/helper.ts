export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}
export const validCommands = {
  'CMD,2043,CX,ON': 'Active container telemetry transmission',

  CAL: 'Calibrate the telemetry data altitude to 0 meters',

  'CMD,2043,ST,GPS':
    'Sets the flights software time to the current time read from the GPS module',

  'CMD,2043,SIM,ENABLE':
    'Disable the flight mode and switch to the simulation mode',

  'CMD,2043,SIM,ACTIVATE': 'Activates the simulation mode',

  'CMD,2043,SIM,<PRESSURE>':
    'Replace the pressure sensor data with the revived pressure',

  'CMD,2043,SIM,DISABLE':
    'Disable the simulation mode and switch back to the flight mode',

  help: 'Display available commands and their descriptions',

  clear: 'Clear the terminal history',
} as const;

function calculateAltitude(
  P: number, // atmospheric pressure at a certain altitude in Pascals
  Pb: number, // atmospheric pressure at sea level in Pascals
  g0: number, // acceleration due to gravity at the Earth's surface in m/s^2
  M: number, // molar mass of Earth's air in kg/mol
  Rstar: number, // specific gas constant for dry air in J/(kg·K)
  Tb: number, // temperature at sea level in kelvins
  Lb: number, // temperature lapse rate in Kelvin/meter
): number {
  const term1 = (Rstar * Tb) / (-g0 * M);
  const term2 = Math.log(P / Pb);
  return term1 * term2 + Lb; // Add Lb to account for the base altitude
}

// Example usage
const seaLevelPressure = 101325; // atmospheric pressure at sea level in Pascals
const gravityAcceleration = 9.80665; // acceleration due to gravity in m/s^2
const molarMassAir = 0.0289644; // molar mass of Earth's air in kg/mol
// const atmosphericPressure = 93947; // atmospheric pressure at a certain altitude in Pascals
const gasConstantDryAir = 8.3144598; // specific gas constant for dry air in J/(mol·K)
const seaLevelTemperature = 578.15; // temperature at sea level in kelvins
const temperatureLapseRate = 0.0065; // temperature lapse rate in Kelvin/meter

export const calculatedAltitude = (atmosphericPressure: number) =>
  calculateAltitude(
    atmosphericPressure,
    seaLevelPressure,
    gravityAcceleration,
    molarMassAir,
    gasConstantDryAir,
    seaLevelTemperature,
    temperatureLapseRate,
  );
