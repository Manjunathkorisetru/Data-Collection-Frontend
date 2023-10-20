import { useEffect, useState } from "react";
import DownloadDataSets from "../components/DownloadDataSets";
import Chart from "react-apexcharts";
import axios from "axios";
import LoadingStatus from "../components/LoadingStatus";

export default function Dashboard({ dataSets }: { dataSets: any }) {
  const [stats, setStats] = useState<any>([]);
  const [graphData, setGraphData] = useState<any>([]);
  const userInfo = localStorage.getItem("userInfo");

  const fetchDataStats = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users/stats", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + `${localStorage.getItem("token")}`,
        },
      });
      const data = response.data;
      setStats(data);
    } catch (err) {
      console.log(err);
    }
    try {
      const response = await axios.get(
        "http://localhost:3000/users/stats/graph",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + `${localStorage.getItem("token")}`,
          },
        }
      );
      const data = response.data;
      setGraphData(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (userInfo === "adminuser") fetchDataStats();
  }, [userInfo]);

  const adminUser = dataSets.find((item: any) => {
    if (item.role === 0) {
      return item;
    }
  });

  return (
    <div>
      <div className="p-6">
        {adminUser && stats.length !== 0 && (
          <div>
            <h1 className="text-4xl font-bold">Statistics</h1>
            <div className="flex justify-center items-center gap-8 mt-20 ">
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
                    height: 300,
                    stacked: false,
                    toolbar: {
                      show: true,
                    },
                  },
                  xaxis: {
                    categories: ["Data Types"],
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
                series={graphData}
                type="bar"
                width={600}
                height={500}
              />
            </div>
          </div>
        )}
        {dataSets.length > 0 ? (
          <DownloadDataSets dataSets={dataSets} />
        ) : (
          <LoadingStatus />
        )}
      </div>
    </div>
  );
}
