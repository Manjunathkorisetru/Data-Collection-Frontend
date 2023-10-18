import { useEffect, useState } from "react";
import DownloadDataSets from "../components/DownloadDataSets";
import Chart from "react-apexcharts";
import axios from "axios";

export default function Dashboard({ dataSets }: { dataSets: any }) {
  const [stats, setStats] = useState<any>([]);
  const series = [
    {
      name: "Text",
      data: [44, 55, 41, 67, 22, 43],
    },
    {
      name: "Date",
      data: [13, 23, 20, 8, 13, 27],
    },
  ];

  const fetchDataStats = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users/stats");
      const data = response.data;
      setStats(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDataStats();
  }, []);

  // console.log(stats);

  return (
    <div>
      <div className="p-6">
        <h1 className="text-4xl font-bold">Statistics</h1>
        <div className="flex justify-center items-center gap-40 mt-20">
          <div className="flex flex-col gap-2 bg-slate-300 rounded-lg shadow-lg p-4">
            <p className="text-xl font-bold">Total Data Sets</p>
            <p className="text-3xl font-bold">{stats.totalDatasets}</p>
          </div>
          <div className="flex flex-col gap-2 bg-slate-300 rounded-lg shadow-lg p-4">
            <p className="text-xl font-bold">Total Data Features</p>
            <p className="text-3xl font-bold">{stats.totalFeatures}</p>
          </div>
          <div className="flex flex-col gap-2 bg-slate-300 rounded-lg shadow-lg p-4">
            <p className="text-xl font-bold">Number of Users</p>
            <p className="text-3xl font-bold">{stats.numberOfUsers}</p>
          </div>
        </div>
        <div className="flex justify-center items-center mt-20">
          <Chart
            options={{
              chart: {
                id: "apexchart-example",
                type: "bar",
                height: 350,
                stacked: true,
                toolbar: {
                  show: true,
                },
              },
              xaxis: {
                categories: ["Manju", "Sai", "Ram", "Krishna", "Radha", "Sita"],
              },
              yaxis: {
                title: {
                  text: "Number of Data Features",
                },
              },
              plotOptions: {
                bar: {
                  horizontal: false,
                  borderRadius: 10,
                  dataLabels: {
                    total: {
                      enabled: true,
                      style: {
                        fontSize: "13px",
                        fontWeight: 900,
                      },
                    },
                  },
                },
              },
              legend: {
                position: "top" as const,
                horizontalAlign: "center" as const,
              },
            }}
            series={series}
            type="bar"
            width={700}
            height={500}
          />
        </div>

        <DownloadDataSets dataSets={dataSets} />
      </div>
    </div>
  );
}
