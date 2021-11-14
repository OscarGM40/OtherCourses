import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// la propiedad name si es importante,lo demas lo puedo personalizar,cada propiedad extra será una Line y va en su dataKey
const data = [
  {
    name: "January",
    Iphone: 4000,
  },
  {
    name: "March",
    Iphone: 1000,
  },
  {
    name: "May",
    Iphone: 4000,
  },
  {
    name: "July",
    Iphone: 800,
  },
  {
    name: "October",
    Iphone: 1500,
  },
];

// background color: #132737; (Goes on the index.css)
// text color: #fff (white)
// Horizontal Grid Color: #243240
// chart line color : #2e4355
// Data point Dot Fill color : #2e4355
// Data point Dot Stroke  color (dot outline outline) : #8884d8

function App() {
  return (
    <>
      <h2 style={{color:"white"}}>Quarterly sales figures for mobile phones</h2>
      {/*  hay que usar un aspecto o no se verá la gráfica */}
      <ResponsiveContainer
        width="100%"
        // height="100%"
        aspect={3}
      >
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 15,
            right: 50,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid horizontal="true" vertical="" stroke="#243240" />
          <XAxis
            dataKey="name"
            tick={{
              fill: "#fff",
            }}
          />
          <YAxis tick={{ fill: "#fff" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#8884d8",
              color: "#fff",
            }}
            itemStyle={{
              color: "#fff",
            }}
            cursor={false}
          />
          <Line
            type="monotone"
            dataKey="Iphone"
            stroke="#8884d8"
            strokeWidth="5"
            dot={{ fill: "#2e4355", stroke: "#8884d8", strokeWidth: 2, r: 5 }}
            activeDot={{
              fill: "#2e4355",
              stroke: "#8884d8",
              strokeWidth: 5,
              r: 10,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}

export default App;
