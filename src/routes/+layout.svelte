<script lang="ts">
  import Navbar from '@/components/navbar/Navbar.svelte';
  import Terminal from '@/components/terminal/Terminal.svelte';
  import terminalStore, { cmdAction } from '@/stores/terminal.store';
  import { Toaster } from '@/components/ui/sonner';
  import { onMount } from 'svelte';
  import '../app.css';
  import { io } from 'socket.io-client';
  import {  airPressureStore, altitudeStore, temperatureStore, tiltAngleStore, batteryVoltageStore } from '@/stores/sensor.data.store';


  type Key =
    | 'Temperature_From_BMP280'
    | 'TILT_Y'
    | 'TILT_X'
    | 'ROT_Z'
    | 'Distance'
    | 'Altitude_From_BMP'
    | 'Battery_Voltage'
    | 'Pressure'
    | 'Height'
    | 'Latitude';

  type Data = [Key, string];


  onMount(() => {
    function handleBeforeUnload(e: BeforeUnloadEvent) {
      e.preventDefault();
      e.returnValue = '';
      return 'Are you sure you want to leave? You are in the middle of something.';
    }

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  });

  $: if ($terminalStore) {
    cmdAction($terminalStore.currentCommand?.value as string);
  }

  const socket = io();

  socket.on('eventFromServer', (message) => {
    console.log('eventFromServer', message);
  });

  let tiltValue = {
    x: "0",
    y: "0",
    z: "0"
  };

  socket.on('serialData', (message) => {
    const resultArray : Data = message.split(":").map((e : string) => e.trim() );


    switch(resultArray[0]){
      case "Temperature_From_BMP280":
        temperatureStore.updateTemperature({time: String(new Date()) , value: resultArray[1].split(" ")[0]})
      break;
      case "Altitude_From_BMP":
        altitudeStore.updateAltitude({
          value: resultArray[1],
          time: String(new Date()) 
        })
        break;

      case "Pressure":
        airPressureStore.updateAirPressure({
          time: String(new Date()),
          value: resultArray[1].split(" ")[0]
        })
        break;

      case "TILT_X":
        tiltValue.x = resultArray[1];
      break;

      case "TILT_X":
        tiltValue.y = resultArray[1];
      break;

      case "Battery_Voltage":
      batteryVoltageStore.updateBatteryVoltage({
        time: String(new Date()),
        value: resultArray[1].split(" ")[0]
      })
      break;

      case "ROT_Z":
        tiltValue.z = resultArray[1];
        tiltAngleStore.updateTiltAngle({
          time: String(new Date()),
          value:{
            x: tiltValue.x,
            y: tiltValue.y,
            z: tiltValue.z
          }
        })
      break;      

      default:
        return
    }

  console.log(message, resultArray, message);
});
</script>

<svelte:head>
  <html lang="en" />
  <title>CANSAT GCS</title>
</svelte:head>

<Toaster richColors closeButton />
<Navbar />
<slot />
<Terminal />
