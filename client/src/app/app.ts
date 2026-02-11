import { AfterViewInit, Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import maplibregl from 'maplibre-gl';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, AfterViewInit {
  // protected readonly title = signal('client');
  private map!: any;

  private readonly metroLines: {
    name: string;
    color: string;
    coordinates: [number, number][];
  }[] = [
    {
      name: 'Red Line',
      color: '#d13438',
      coordinates: [
        [30.355, 50.465556],       // Akademmistechko
        [30.364167, 50.455833],    // Zhytomyrska
        [30.390556, 50.457778],    // Sviatoshyn
        [30.404042, 50.458653],    // Nyvky
        [30.41969, 50.45909],      // Beresteiska
        [30.44537, 50.45508],      // Shuliavska
        [30.46613, 50.45079],      // Politekhnichnyi Instytut
        [30.466389, 50.450833],    // Vokzalna
        [30.50589, 50.44425],      // Universytet
        [30.518056, 50.445278],    // Teatralna
        [30.524919, 50.447255],    // Khreshchatyk
        [30.54556, 50.4444],       // Arsenalna
        [30.559167, 50.441111],    // Dnipro
        [30.576944, 50.445833],    // Hidropark
        [30.59817, 50.45186],      // Livoberezhna
        [30.608553, 50.453333],    // Darnytsia
        [30.629722, 50.459722],    // Chernihivska
        [30.64597, 50.46476]       // Lisova
      ]
    },
    {
      name: 'Blue Line',
      color: '#0057b7',
      coordinates: [
        [30.4989, 50.52267],       // Heroiv Dnipra
        [30.498333, 50.512222],    // Minska
        [30.49822, 50.50153],      // Obolon
        [30.497778, 50.486667],    // Pochaina
        [30.503611, 50.473889],    // Tarasa Shevchenka
        [30.516667, 50.465278],    // Kontraktova Ploshcha
        [30.524308, 50.45933],     // Poshtova Ploshcha
        [30.524923, 50.450352],    // Maidan Nezalezhnosti
        [30.516944, 50.439444],    // Ploshcha Ukrainskykh Heroiv
        [30.516605, 50.432131],    // Olimpiiska
        [30.52131, 50.42068],      // Palats Ukraina
        [30.521331, 50.40783],     // Lybidska
        [30.516764, 50.402873],    // Demiivska
        [30.504998, 50.391831],    // Holosiivska
        [30.488223, 50.393335],    // Vasylkivska
        [30.477536, 50.382581],    // Vystavkovyi Tsentr
        [30.468886, 50.3766],      // Ipodrom
        [30.454037, 50.367]        // Teremky
      ]
    },
    {
      name: 'Green Line',
      color: '#35ab52',
      coordinates: [
        [30.694444, 50.408889],    // Chervonyi Khutir
        [30.684411, 50.403479],    // Boryspilska
        [30.666111, 50.403333],    // Vyrlytsia
        [30.652222, 50.400833],    // Kharkivska
        [30.633333, 50.398056],    // Pozniaky
        [30.615833, 50.395556],    // Osokorky
        [30.604864, 50.394217],    // Slavutych
        [30.560833, 50.402222],    // Vydubychi
        [30.545, 50.418056],       // Zvirynetska
        [30.540119, 50.426553],    // Pecherska
        [30.53192, 50.43693],      // Klovska
        [30.521519, 50.438371],    // Palats Sportu
        [30.513333, 50.448333],    // Zoloti Vorota
        [30.48194, 50.4625],       // Lukianivska
        [30.449167, 50.473611],    // Dorohozhychi
        [30.430556, 50.476111]     // Syrets
      ]
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.initMap();
  }


  private initMap() {
    this.map = new maplibregl.Map({
      style: 'https://tiles.openfreemap.org/styles/liberty',
      center: [30.556059050602947, 50.43865448846939],
      zoom: 11,
      container: 'map',
    });

    this.map.on('load', () => {
      this.metroLines.forEach((line, index) => {
        const normalizedName = line.name.toLowerCase().replace(/\s+/g, '-');
        const sourceId = `${normalizedName}-source`;
        const layerId = `${normalizedName}-layer`;

        const colorOfLane = line.name.split(" ")[0].toLowerCase();

        // el.addEventListener('click', () => {
        //   window.alert(line.properties.message);
        // });

        this.map.addSource(sourceId, {
          'type': 'geojson',
          'data': {
            'type': 'Feature',
            'properties': {},
            'geometry': {
              'type': 'LineString',
              'coordinates': line.coordinates
            }
          }
        });

        this.map.addLayer({
          'id': layerId,
          'type': 'line',
          'source': sourceId,
          'layout': {
            'line-join': 'round',
            'line-cap': 'round'
          },
          'paint': {
            'line-color': line.color,
            'line-width': 5
          }
        });

        line.coordinates.forEach(coordinatesPair => {
          const el = document.createElement('div');
          el.className = 'marker';
          el.style.backgroundImage = `url('./assets/${ colorOfLane }_m.png')`;
          el.style.backgroundSize = 'contain';
          el.style.width = `20px`;
          el.style.height = `15px`;

          new maplibregl.Marker({ element: el })
            .setLngLat(coordinatesPair)
            .addTo(this.map);
        });
      });
    });
  }
}
