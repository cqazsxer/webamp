import fetch from "node-fetch";
import { promises as fs } from "fs";
import path from "path";

const PREVIOUS_PATH = path.join(__dirname, "previous.txt");

function average(values) {
  return values.reduce((a, b) => a + b, 0) / values.length;
}

async function getPrevious() {
  return fs.readFile(PREVIOUS_PATH, { encoding: "ascii" });
}

// const body = JSON.parse(`{"mapVersion":"0.19","baseVersion":"7","mapVersionString":"","results":[{"ID":60333,"Label":"Burbank","DEVICE_LOCATIONTYPE":"outside","THINGSPEAK_PRIMARY_ID":"1108161","THINGSPEAK_PRIMARY_ID_READ_KEY":"Y9HNPG5JGYXR5Q3A","THINGSPEAK_SECONDARY_ID":"1108162","THINGSPEAK_SECONDARY_ID_READ_KEY":"NJZ5F2M4NH9CCD6Q","Lat":37.769549,"Lon":-122.271873,"PM2_5Value":"5.74","LastSeen":1600787547,"Type":"PMS5003+PMS5003+BME280","Hidden":"false","DEVICE_BRIGHTNESS":"15","DEVICE_HARDWAREDISCOVERED":"2.0+BME280+PMSX003-B+PMSX003-A","DEVICE_FIRMWAREVERSION":"6.01","Version":"6.01","LastUpdateCheck":1600784185,"Created":1596053038,"Uptime":"1004400","RSSI":"-81","Adc":"0.05","p_0_3_um":"690.16","p_0_5_um":"224.26","p_1_0_um":"46.56","p_2_5_um":"10.25","p_5_0_um":"5.72","p_10_0_um":"2.0","pm1_0_cf_1":"2.91","pm2_5_cf_1":"5.74","pm10_0_cf_1":"9.58","pm1_0_atm":"2.91","pm2_5_atm":"5.74","pm10_0_atm":"9.58","isOwner":0,"humidity":"63","temp_f":"67","pressure":"1018.12","AGE":0,"Stats":"{\"v\":5.74,\"v1\":5.8,\"v2\":5.62,\"v3\":5.39,\"v4\":10.14,\"v5\":16.89,\"v6\":30.53,\"pm\":5.74,\"lastModified\":1600787547536,\"timeSinceModified\":119991}"},{"ID":60334,"ParentID":60333,"Label":"Burbank B","THINGSPEAK_PRIMARY_ID":"1108163","THINGSPEAK_PRIMARY_ID_READ_KEY":"ZXP2S6WL3KJ383QD","THINGSPEAK_SECONDARY_ID":"1108164","THINGSPEAK_SECONDARY_ID_READ_KEY":"RFQY0DTDIBZDN1N8","Lat":37.769549,"Lon":-122.271873,"PM2_5Value":"8.69","LastSeen":1600787547,"Hidden":"false","Created":1596053038,"p_0_3_um":"803.31","p_0_5_um":"252.71","p_1_0_um":"67.73","p_2_5_um":"7.77","p_5_0_um":"2.92","p_10_0_um":"0.69","pm1_0_cf_1":"4.02","pm2_5_cf_1":"8.69","pm10_0_cf_1":"10.54","pm1_0_atm":"4.02","pm2_5_atm":"8.69","pm10_0_atm":"10.54","isOwner":0,"AGE":0,"Stats":"{\"v\":8.69,\"v1\":8.86,\"v2\":8.73,\"v3\":8.51,\"v4\":12.81,\"v5\":19.18,\"v6\":32.37,\"pm\":8.69,\"lastModified\":1600787547536,\"timeSinceModified\":119991}"},{"ID":35013,"Label":"West End","DEVICE_LOCATIONTYPE":"outside","THINGSPEAK_PRIMARY_ID":"826054","THINGSPEAK_PRIMARY_ID_READ_KEY":"11EFWJZTKPQXQTSL","THINGSPEAK_SECONDARY_ID":"826055","THINGSPEAK_SECONDARY_ID_READ_KEY":"05I2M7P85FWU5973","Lat":37.77325,"Lon":-122.284322,"PM2_5Value":"5.44","LastSeen":1600787499,"Type":"PMS5003+PMS5003+BME280","Hidden":"false","DEVICE_BRIGHTNESS":"15","DEVICE_HARDWAREDISCOVERED":"2.0+BME280+PMSX003-B+PMSX003-A","Version":"6.01","LastUpdateCheck":1600784017,"Created":1563395926,"Uptime":"662400","RSSI":"-53","Adc":"0.04","p_0_3_um":"712.75","p_0_5_um":"204.15","p_1_0_um":"47.71","p_2_5_um":"5.91","p_5_0_um":"0.91","p_10_0_um":"0.44","pm1_0_cf_1":"2.2","pm2_5_cf_1":"5.44","pm10_0_cf_1":"6.24","pm1_0_atm":"2.2","pm2_5_atm":"5.44","pm10_0_atm":"6.24","isOwner":0,"humidity":"66","temp_f":"66","pressure":"1018.35","AGE":1,"Stats":"{\"v\":5.44,\"v1\":6.28,\"v2\":6.24,\"v3\":5.98,\"v4\":10.44,\"v5\":16.99,\"v6\":43.12,\"pm\":5.44,\"lastModified\":1600787499682,\"timeSinceModified\":120141}"},{"ID":35014,"ParentID":35013,"Label":"West End B","THINGSPEAK_PRIMARY_ID":"826056","THINGSPEAK_PRIMARY_ID_READ_KEY":"ZWX4OBS2LTPUTGWV","THINGSPEAK_SECONDARY_ID":"826057","THINGSPEAK_SECONDARY_ID_READ_KEY":"OLIZTXJULMCC1KE4","Lat":37.77325,"Lon":-122.284322,"PM2_5Value":"7.14","LastSeen":1600787499,"Hidden":"false","Created":1563395926,"p_0_3_um":"810.11","p_0_5_um":"234.12","p_1_0_um":"54.89","p_2_5_um":"7.89","p_5_0_um":"2.5","p_10_0_um":"1.21","pm1_0_cf_1":"3.68","pm2_5_cf_1":"7.14","pm10_0_cf_1":"9.05","pm1_0_atm":"3.68","pm2_5_atm":"7.14","pm10_0_atm":"9.05","isOwner":0,"AGE":1,"Stats":"{\"v\":7.14,\"v1\":7.1,\"v2\":6.88,\"v3\":6.58,\"v4\":10.96,\"v5\":17.44,\"v6\":42.97,\"pm\":7.14,\"lastModified\":1600787499682,\"timeSinceModified\":120140}"}]}`);
const body = {
  mapVersion: "0.19",
  baseVersion: "7",
  mapVersionString: "",
  results: [
    {
      ID: 60333,
      Label: "Burbank",
      DEVICE_LOCATIONTYPE: "outside",
      THINGSPEAK_PRIMARY_ID: "1108161",
      THINGSPEAK_PRIMARY_ID_READ_KEY: "Y9HNPG5JGYXR5Q3A",
      THINGSPEAK_SECONDARY_ID: "1108162",
      THINGSPEAK_SECONDARY_ID_READ_KEY: "NJZ5F2M4NH9CCD6Q",
      Lat: 37.769549,
      Lon: -122.271873,
      PM2_5Value: "5.74",
      LastSeen: 1600787547,
      Type: "PMS5003+PMS5003+BME280",
      Hidden: "false",
      DEVICE_BRIGHTNESS: "15",
      DEVICE_HARDWAREDISCOVERED: "2.0+BME280+PMSX003-B+PMSX003-A",
      DEVICE_FIRMWAREVERSION: "6.01",
      Version: "6.01",
      LastUpdateCheck: 1600784185,
      Created: 1596053038,
      Uptime: "1004400",
      RSSI: "-81",
      Adc: "0.05",
      p_0_3_um: "690.16",
      p_0_5_um: "224.26",
      p_1_0_um: "46.56",
      p_2_5_um: "10.25",
      p_5_0_um: "5.72",
      p_10_0_um: "2.0",
      pm1_0_cf_1: "2.91",
      pm2_5_cf_1: "5.74",
      pm10_0_cf_1: "9.58",
      pm1_0_atm: "2.91",
      pm2_5_atm: "5.74",
      pm10_0_atm: "9.58",
      isOwner: 0,
      humidity: "63",
      temp_f: "67",
      pressure: "1018.12",
      AGE: 0,
      Stats:
        '{"v":5.74,"v1":5.8,"v2":5.62,"v3":5.39,"v4":10.14,"v5":16.89,"v6":30.53,"pm":5.74,"lastModified":1600787547536,"timeSinceModified":119991}',
    },
    {
      ID: 60334,
      ParentID: 60333,
      Label: "Burbank B",
      THINGSPEAK_PRIMARY_ID: "1108163",
      THINGSPEAK_PRIMARY_ID_READ_KEY: "ZXP2S6WL3KJ383QD",
      THINGSPEAK_SECONDARY_ID: "1108164",
      THINGSPEAK_SECONDARY_ID_READ_KEY: "RFQY0DTDIBZDN1N8",
      Lat: 37.769549,
      Lon: -122.271873,
      PM2_5Value: "8.69",
      LastSeen: 1600787547,
      Hidden: "false",
      Created: 1596053038,
      p_0_3_um: "803.31",
      p_0_5_um: "252.71",
      p_1_0_um: "67.73",
      p_2_5_um: "7.77",
      p_5_0_um: "2.92",
      p_10_0_um: "0.69",
      pm1_0_cf_1: "4.02",
      pm2_5_cf_1: "8.69",
      pm10_0_cf_1: "10.54",
      pm1_0_atm: "4.02",
      pm2_5_atm: "8.69",
      pm10_0_atm: "10.54",
      isOwner: 0,
      AGE: 0,
      Stats:
        '{"v":8.69,"v1":8.86,"v2":8.73,"v3":8.51,"v4":12.81,"v5":19.18,"v6":32.37,"pm":8.69,"lastModified":1600787547536,"timeSinceModified":119991}',
    },
    {
      ID: 35013,
      Label: "West End",
      DEVICE_LOCATIONTYPE: "outside",
      THINGSPEAK_PRIMARY_ID: "826054",
      THINGSPEAK_PRIMARY_ID_READ_KEY: "11EFWJZTKPQXQTSL",
      THINGSPEAK_SECONDARY_ID: "826055",
      THINGSPEAK_SECONDARY_ID_READ_KEY: "05I2M7P85FWU5973",
      Lat: 37.77325,
      Lon: -122.284322,
      PM2_5Value: "5.44",
      LastSeen: 1600787499,
      Type: "PMS5003+PMS5003+BME280",
      Hidden: "false",
      DEVICE_BRIGHTNESS: "15",
      DEVICE_HARDWAREDISCOVERED: "2.0+BME280+PMSX003-B+PMSX003-A",
      Version: "6.01",
      LastUpdateCheck: 1600784017,
      Created: 1563395926,
      Uptime: "662400",
      RSSI: "-53",
      Adc: "0.04",
      p_0_3_um: "712.75",
      p_0_5_um: "204.15",
      p_1_0_um: "47.71",
      p_2_5_um: "5.91",
      p_5_0_um: "0.91",
      p_10_0_um: "0.44",
      pm1_0_cf_1: "2.2",
      pm2_5_cf_1: "5.44",
      pm10_0_cf_1: "6.24",
      pm1_0_atm: "2.2",
      pm2_5_atm: "5.44",
      pm10_0_atm: "6.24",
      isOwner: 0,
      humidity: "66",
      temp_f: "66",
      pressure: "1018.35",
      AGE: 1,
      Stats:
        '{"v":5.44,"v1":6.28,"v2":6.24,"v3":5.98,"v4":10.44,"v5":16.99,"v6":43.12,"pm":5.44,"lastModified":1600787499682,"timeSinceModified":120141}',
    },
    {
      ID: 35014,
      ParentID: 35013,
      Label: "West End B",
      THINGSPEAK_PRIMARY_ID: "826056",
      THINGSPEAK_PRIMARY_ID_READ_KEY: "ZWX4OBS2LTPUTGWV",
      THINGSPEAK_SECONDARY_ID: "826057",
      THINGSPEAK_SECONDARY_ID_READ_KEY: "OLIZTXJULMCC1KE4",
      Lat: 37.77325,
      Lon: -122.284322,
      PM2_5Value: "7.14",
      LastSeen: 1600787499,
      Hidden: "false",
      Created: 1563395926,
      p_0_3_um: "810.11",
      p_0_5_um: "234.12",
      p_1_0_um: "54.89",
      p_2_5_um: "7.89",
      p_5_0_um: "2.5",
      p_10_0_um: "1.21",
      pm1_0_cf_1: "3.68",
      pm2_5_cf_1: "7.14",
      pm10_0_cf_1: "9.05",
      pm1_0_atm: "3.68",
      pm2_5_atm: "7.14",
      pm10_0_atm: "9.05",
      isOwner: 0,
      AGE: 1,
      Stats:
        '{"v":7.14,"v1":7.1,"v2":6.88,"v3":6.58,"v4":10.96,"v5":17.44,"v6":42.97,"pm":7.14,"lastModified":1600787499682,"timeSinceModified":120140}',
    },
  ],
};

export async function checkAir() {
  const response = await fetch(
    "https://www.purpleair.com/json?show=35013|60333"
  );
  if (!response.ok) {
    console.error(response);
    throw new Error("Not Ok");
  }

  const body = await response.json();

  const results = body.results
    .filter((obj) => obj.ParentID == null)
    .map((obj) => Number(obj.PM2_5Value))
    .map(aqiFromPM)
    .map((aqi) => {
      if (typeof aqi !== "number") {
        throw new Error(`Expected AQI to be a number, but it was: "${aqi}"`);
      }
      return aqi;
    });

  const aqi = average(results);

  const roundedAqi = Math.round(aqi);
  const description = getAQIDescription(aqi);

  const previousDescription = await getPrevious();
  if (previousDescription === description) {
    console.log("No change, not messaging");
    return null;
  }
  console.log(`"${previousDescription}" !== "${description}`);
  await fs.writeFile(PREVIOUS_PATH, String(description));

  return `The current air quiality is "${description}" (AQI ${roundedAqi})`;
}

function aqiFromPM(pm) {
  if (isNaN(pm)) return "-";
  if (pm == undefined) return "-";
  if (pm < 0) return pm;
  if (pm > 1000) return "-";
  /*      
            Good                              0 - 50         0.0 - 15.0         0.0 – 12.0
      Moderate                        51 - 100           >15.0 - 40        12.1 – 35.4
      Unhealthy for Sensitive Groups   101 – 150     >40 – 65          35.5 – 55.4
      Unhealthy                                 151 – 200         > 65 – 150       55.5 – 150.4
      Very Unhealthy                    201 – 300 > 150 – 250     150.5 – 250.4
      Hazardous                                 301 – 400         > 250 – 350     250.5 – 350.4
      Hazardous                                 401 – 500         > 350 – 500     350.5 – 500
      */
  if (pm > 350.5) {
    return calcAQI(pm, 500, 401, 500, 350.5);
  } else if (pm > 250.5) {
    return calcAQI(pm, 400, 301, 350.4, 250.5);
  } else if (pm > 150.5) {
    return calcAQI(pm, 300, 201, 250.4, 150.5);
  } else if (pm > 55.5) {
    return calcAQI(pm, 200, 151, 150.4, 55.5);
  } else if (pm > 35.5) {
    return calcAQI(pm, 150, 101, 55.4, 35.5);
  } else if (pm > 12.1) {
    return calcAQI(pm, 100, 51, 35.4, 12.1);
  } else if (pm >= 0) {
    return calcAQI(pm, 50, 0, 12, 0);
  } else {
    return undefined;
  }
}
function bplFromPM(pm) {
  if (isNaN(pm)) return 0;
  if (pm == undefined) return 0;
  if (pm < 0) return 0;
  /*      
            Good                              0 - 50         0.0 - 15.0         0.0 – 12.0
      Moderate                        51 - 100           >15.0 - 40        12.1 – 35.4
      Unhealthy for Sensitive Groups   101 – 150     >40 – 65          35.5 – 55.4
      Unhealthy                                 151 – 200         > 65 – 150       55.5 – 150.4
      Very Unhealthy                    201 – 300 > 150 – 250     150.5 – 250.4
      Hazardous                                 301 – 400         > 250 – 350     250.5 – 350.4
      Hazardous                                 401 – 500         > 350 – 500     350.5 – 500
      */
  if (pm > 350.5) {
    return 401;
  } else if (pm > 250.5) {
    return 301;
  } else if (pm > 150.5) {
    return 201;
  } else if (pm > 55.5) {
    return 151;
  } else if (pm > 35.5) {
    return 101;
  } else if (pm > 12.1) {
    return 51;
  } else if (pm >= 0) {
    return 0;
  } else {
    return 0;
  }
}
function bphFromPM(pm) {
  //return 0;
  if (isNaN(pm)) return 0;
  if (pm == undefined) return 0;
  if (pm < 0) return 0;
  /*      
            Good                              0 - 50         0.0 - 15.0         0.0 – 12.0
      Moderate                        51 - 100           >15.0 - 40        12.1 – 35.4
      Unhealthy for Sensitive Groups   101 – 150     >40 – 65          35.5 – 55.4
      Unhealthy                                 151 – 200         > 65 – 150       55.5 – 150.4
      Very Unhealthy                    201 – 300 > 150 – 250     150.5 – 250.4
      Hazardous                                 301 – 400         > 250 – 350     250.5 – 350.4
      Hazardous                                 401 – 500         > 350 – 500     350.5 – 500
      */
  if (pm > 350.5) {
    return 500;
  } else if (pm > 250.5) {
    return 500;
  } else if (pm > 150.5) {
    return 300;
  } else if (pm > 55.5) {
    return 200;
  } else if (pm > 35.5) {
    return 150;
  } else if (pm > 12.1) {
    return 100;
  } else if (pm >= 0) {
    return 50;
  } else {
    return 0;
  }
}

function calcAQI(Cp, Ih, Il, BPh, BPl) {
  var a = Ih - Il;
  var b = BPh - BPl;
  var c = Cp - BPl;
  return Math.round((a / b) * c + Il);
}

function getAQIDescription(aqi) {
  if (aqi >= 401) {
    return "Hazardous";
  } else if (aqi >= 301) {
    return "Hazardous";
  } else if (aqi >= 201) {
    return "Very Unhealthy";
  } else if (aqi >= 151) {
    return "Unhealthy";
  } else if (aqi >= 101) {
    return "Unhealthy for Sensitive Groups";
  } else if (aqi >= 51) {
    return "Moderate";
  } else if (aqi >= 0) {
    return "Good";
  } else {
    return undefined;
  }
}

function getAQIMessage(aqi) {
  if (aqi >= 401) {
    return ">401: Health alert: everyone may experience more serious health effects";
  } else if (aqi >= 301) {
    return "301-400: Health alert: everyone may experience more serious health effects";
  } else if (aqi >= 201) {
    return "201-300: Health warnings of emergency conditions. The entire population is more likely to be affected. ";
  } else if (aqi >= 151) {
    return "151-200: Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.";
  } else if (aqi >= 101) {
    return "101-150: Members of sensitive groups may experience health effects. The general public is not likely to be affected.";
  } else if (aqi >= 51) {
    return "51-100: Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.";
  } else if (aqi >= 0) {
    return "0-50: Air quality is considered satisfactory, and air pollution poses little or no risk";
  } else {
    return undefined;
  }
}
