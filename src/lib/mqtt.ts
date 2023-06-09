import mqtt from 'mqtt';
import chalk from 'chalk';
import type { MqttClient } from 'mqtt';
import { temperature, voltage } from '@stores/data.store';

class MqttHandler {
  private mqttClient: MqttClient | null;

  constructor() {
    this.mqttClient = null;
    this.connect();

    setInterval(() => {
      this.pubTemperature();
    }, 5000);
  }

  connect() {
    this.mqttClient = mqtt.connect('ws://127.0.0.1:8080');

    // Mqtt error calback
    this.mqttClient.on('error', (err) => {
      console.log(`ERROR: ${err}`);
      this.mqttClient?.end();
    });

    // Connection callback
    this.mqttClient.on('connect', () => {
      console.log(`mqtt client connected`);
    });

    // When a message arrives, do magic
    this.mqttClient.on('message', async (topic, message) => {
      let decodedMessage: string;
      const decoder = new TextDecoder('utf8');

      switch (topic) {
        case 'temperature':
          try {
            decodedMessage = decoder.decode(message);
            const { value, time }: { value: string; time: string } =
              JSON.parse(decodedMessage);

            temperature.update((t) => ({
              value: [...t.value, +value],
              time: [...t.time, time]
            }));

            // console.log(
            //   `type = ${chalk.bold.bgBlue('sub')}, topic = ${chalk.bold.bgGreen(
            //     topic
            //   )}, message = ${chalk.bold.bgRed(decodedMessage)}`
            // );
          } catch (error) {
            console.log(error);
          }
          break;
        case 'voltage':
          try {
            decodedMessage = decoder.decode(message);
            const { value }: { value: string } = JSON.parse(decodedMessage);
            const time = new Date().toLocaleTimeString();

            voltage.update((t) => ({
              value: [...t.value, +value],
              time: [...t.time, time]
            }));

            console.log(
              `type = ${chalk.bold.bgBlue('sub')}, topic = ${chalk.bold.bgGreen(
                topic
              )}, message = ${chalk.bold.bgRed(value)}`
            );
          } catch (error) {
            console.log('error');
          }
          break;
        default:
          break;
      }
    });

    this.mqttClient.on('close', () => {
      console.log(`mqtt client disconnected`);
    });
  }

  subToTemp() {
    this.mqttClient?.subscribe('temperature', (err) => {
      if (err) console.log(err);
    });
  }

  subToVoltage() {
    this.mqttClient?.subscribe('voltage', (err) => {
      if (err) console.log(err);
    });
  }

  isConnected() {
    return this.mqttClient?.connected;
  }

  // publish temperature
  pubTemperature() {
    const temperature = (50 + Math.random() * 20).toFixed(2);
    const time = new Date().toLocaleTimeString();
    this.mqttClient?.publish(
      'temperature',
      JSON.stringify({
        value: temperature,
        time
      })
    );
  }

  // publish orbitPosition
  sendOrbitPosition() {
    const time = new Date().toLocaleString();
    const data = Math.random() * 200;
    this.mqttClient?.publish('orbit', JSON.stringify({ time, data }));
    console.log(
      `type = ${chalk.bold.bgRed('pub')}, topic = ${chalk.bold.bgGreen(
        'orbit'
      )}, message = ${chalk.bold.bgBlue(`time = ${time}s, data = ${data} `)}`
    );
  }
}

const mqttClient = new MqttHandler();
export default mqttClient;
