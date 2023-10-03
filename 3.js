const DATAS_FOR_RADIO_STATION = [
  {
    id: 1293487,
    name: "KCRW",  // radio station callsign
    tracks: [{ timestp: "2021-04-08", trackName: "Peaches" }]
  },
  {
    id: 12923,
    name: "KQED",
    tracks: [
      { timestp: "2021-04-09", trackName: "Savage" },
      { timestp: "2021-04-09", trackName: "Savage (feat. Beyonce)" },
      { timestp: "2021-04-08", trackName: "Savage" },
      { timestp: "2021-04-08", trackName: "Savage" },
      { timestp: "2021-04-08", trackName: "Savage" }
    ]
  },
  {
    id: 4,
    name: "WNYC",
    tracks: [
      { timestp: "2021-04-09", trackName: "Captain Hook" },
      { timestp: "2021-04-08", trackName: "Captain Hook" },
      { timestp: "2021-04-07", trackName: "Captain Hook" }
    ]
  }
];

// Answer
const data = []
// For preprocessing
const pretreatment = {};

// For searching the key
// Set.has(value) is faster then Object.keys(obj).include(value)
const dateKeys = new Set();
const trackKeys = new Set();

// Do preprocessing
// This loop makes data of pretreatment like this,
// {
//   '2021-04-08': { Peaches: 1, Savage: 3, Captain Hook: 1 },
//   '2021-04-09': { Savage: 1, Savage (feat. Beyonce): 1, Captain Hook: 1 },
//   '2021-04-07': { Captain Hook: 1 }
// }
DATAS_FOR_RADIO_STATION.forEach(data => {
  data.tracks.forEach(track => {
    const dateKey = track.timestp
    try {
      if (new Date(dateKey) == 'Invalid Date'){
        throw Error('Invalid Date : ' + dateKey);
      }
      // That valiable is a key for query.
      // I use the trim method for deleting blank.
      const trackName = track.trackName.trim()
      if (trackName === '') {
        throw Error('Invalid track name : ' + "\"" + track.trackName + "\"");
      }

      const uniqueKey = dateKey + '_' + trackName
      if (dateKeys.has(dateKey)) {
        if (trackKeys.has(uniqueKey)) {
          pretreatment[dateKey][track.trackName] += 1
        } else {
          trackKeys.add(uniqueKey);
          pretreatment[dateKey][track.trackName] = 1;
        }
      }
      else {
        dateKeys.add(dateKey);
        pretreatment[dateKey] = {};
        pretreatment[dateKey][track.trackName] = 1;
      }

    } catch (e) {
      console.error(e.message)
    }

  })
})

// It makes answer.
Object.keys(pretreatment).forEach(date => {
  const x = date;

  const each_cnt = Object.values(pretreatment[date]);
  const y = each_cnt.reduce((a, b) => a + b, 0);

  var tooltip = '';
  Object.keys(pretreatment[date]).forEach(trackName => {
    tooltip += (trackName + ' (' + pretreatment[date][trackName] + ')' + ', ');
  })

  data.push({
    x,
    y,
    tooltip: tooltip.slice(0, tooltip.length - 2)
  })
})

// Sort data.
data.sort((a, b) => {
  const dateA = new Date(a.x);
  const dateB = new Date(b.x);
  return dateA - dateB;
});

// Print.
console.log(data);