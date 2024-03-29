// import mqtt from 'mqtt';
// import type { Topics } from './types';
// import payload from './payload';
// import gcsMachine  from '../../machines/gcs-machine';
// import type { StringData, XYZNumberData } from '$lib/@types/app.types';

// // MQTT handler
// const createMqttHandler = () => {
//   const mqttClient = mqtt.connect('ws://127.0.0.1:8080');
//   const Payload = payload(mqttClient);

//   mqttClient.on('error', (err) => {
//     console.log(`ERROR: ${err}`);
//     mqttClient.end();
//   });

//   mqttClient.on('connect', () => {
//     console.log(`mqtt client connected`);
//   });

//   mqttClient.on('message', async (topic: Topics, message: BufferSource) => {
//     const decoder = new TextDecoder('utf8');
//     const decodedMessage = JSON.parse(decoder.decode(message));

//     switch (topic) {
//       case 'payload/altitude':
//         gcsService.send({
//           type: 'UPDATE_ALTITUDE',
//           altitude: decodedMessage as StringData
//         });
//         break;

//       case 'payload/air_pressure':
//         gcsService.send({
//           type: 'UPDATE_AIR_PRESSURE',
//           airPressure: decodedMessage as StringData
//         });
//         break;

//       case 'payload/temperature':
//         gcsService.send({
//           type: 'UPDATE_TEMPERATURE',
//           temperature: decodedMessage as StringData
//         });
//         break;

//       case 'payload/battery_voltage':
//         gcsService.send({
//           type: 'UPDATE_BATTERY_VOLTAGE',
//           batteryVoltage: decodedMessage as StringData
//         });
//         break;

//       case 'payload/tilt_angle':
//         gcsService.send({
//           type: 'UPDATE_TILT_ANGLE',
//           tiltAngle: decodedMessage as StringData
//         });
//         break;

//       case 'payload/air_speed':
//         gcsService.send({
//           type: 'UPDATE_AIR_SPEED',
//           airSpeed: decodedMessage as StringData
//         });
//         break;

//       case 'payload/command_echo':
//         // gcsService.send({
//         //   type: 'U',
//         //   airSpeed: decodedMessage as StringData
//         // });
//         break;

//       case 'payload/gps_coordinates':
//         gcsService.send({
//           type: 'UPDATE_GPS_COORDINATES',
//           gpsCoordinates: decodedMessage as StringData
//         });
//         break;

//       case 'payload/longitude':
//         gcsService.send({
//           type: 'UPDATE_LONGITUDE',
//           longitude: decodedMessage as StringData
//         });
//         break;

//       case 'payload/satellites_tracked':
//         gcsService.send({
//           type: 'UPDATE_SATELLITES_TRACKED',
//           satellitesTracked: decodedMessage as StringData
//         });
//         break;

//       case 'payload/gyroscope':
//         gcsService.send({
//           type: 'UPDATE_GYROSCOPE',
//           gyroscope: decodedMessage as XYZNumberData
//         });
//         break;

//       default:
//         break;
//     }
//   });

//   mqttClient.on('close', () => {
//     console.log(`mqtt client disconnected`);
//   });

//   return {
//     mqttClient,
//     isConnected: () => mqttClient.connected,
//     payload: Payload
//   };
// };

// const mqttHandler = createMqttHandler();
// export default mqttHandler;
