import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDown } from "@fortawesome/free-solid-svg-icons";
import JSZip from "jszip";
import Papa from "papaparse";
import formatDate from "../utils/FormatDate";
import { useEffect, useState } from "react";

function DownloadDataSets({ dataSets: initialDataSets }: { dataSets: any }) {
  const [search, setSearch] = useState("");
  const [dataSets, setDataSets] = useState([]);

  const downloadData = async (dataSet: any) => {
    const zip = new JSZip();

    const { id, image, features } = dataSet;

    const base64Image = `data:image/jpeg;base64,${image}`;

    const imageBlob = await fetch(base64Image).then((response) =>
      response.blob()
    );
    zip.file(`image_${id}.jpg`, imageBlob);

    const csvData = Papa.unparse(features);
    zip.file(`features_${id}.csv`, csvData);

    zip.generateAsync({ type: "blob" }).then((content) => {
      const url = URL.createObjectURL(content);
      const a = document.createElement("a");
      a.href = url;
      a.download = "dataSets.zip";
      a.click();
    });
  };

  const downloadAll = async (dataSets: any) => {
    const zip = new JSZip();

    for (const dataSet of dataSets) {
      const { id, image, features } = dataSet;
      const base64Image = `data:image/jpeg;base64,${image}`;
      const imageBlob = await fetch(base64Image).then((response) =>
        response.blob()
      );
      zip.file(`image_${id}.jpg`, imageBlob);

      const csvData = Papa.unparse(features);
      zip.file(`features_${id}.csv`, csvData);
    }

    zip.generateAsync({ type: "blob" }).then((content) => {
      const url = URL.createObjectURL(content);
      const a = document.createElement("a");
      a.href = url;
      a.download = "dataSets.zip";
      a.click();
    });
  };

  function flattenDataSets() {
    const data = initialDataSets.map((item: any) => {
      const result = item.datasets.map((item: any) => {
        return item;
      });
      return result;
    });
    setDataSets(data.flat());
  }

  useEffect(() => {
    if (initialDataSets.length > 0) {
      flattenDataSets();
    }
  }, [initialDataSets]);

  const filterSearch = () => {
    const regex = new RegExp(search, "i");
    const result = dataSets.filter((item: any) => {
      for (let i = 0; i < item.features.length; i++) {
        if (regex.test(item.features[i].value)) {
          return true;
        }
      }
    });
    setDataSets(result);
  };

  return (
    <div className="flex flex-col gap-4 w-screen h-auto mb-10">
      {dataSets.length > 0 && (
        <>
          <h1 className="text-3xl font-bold text-center mt-24">
            Download Data Sets
          </h1>
          <div>
            <input
              type="text"
              placeholder="Search for the text features"
              className="border-2 border-gray-300 rounded-md p-2 
            xs: w-[300px] md:w-[400px] lg:w-[500px] xl:[600px] mt-10"
              value={search}
              onKeyDown={(e: any) => {
                if (e.key === "Enter") {
                  filterSearch();
                }
                if (e.key === "Backspace") {
                  flattenDataSets();
                }
              }}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>
        </>
      )}
      {dataSets.map((dataSet: any, index: number) => (
        <div
          key={index}
          className="flex justify-center gap-4 items-center mt-10"
        >
          <img
            src={`data:image/jpeg;base64,${dataSet.image}`}
            alt="random"
            className="rounded-lg w-[30vw] h-[30vh]"
          />
          <div
            className="container p-4 w-[30vw] h-[30vh] bg-slate-200 
  rounded-xl flex flex-col justify-center items-center relative sm:max-h-80 sm:overflow-y-auto"
          >
            <p className="absolute top-1">Features</p>
            <div
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 
  lg:grid-cols-3 gap-6 rounded-lg w-full h-full mt-8"
            >
              {dataSet.features.map((feature: any, index: number) => {
                const featureId = `f${index + 1}`;
                let featureValue;
                if (feature.value.endsWith("Z")) {
                  featureValue = formatDate(feature.value);
                } else {
                  featureValue = feature.value;
                }
                return (
                  <div
                    key={feature._id}
                    className=" bg-blue-400 
                    p-1 rounded-lg text-xs text-center h-auto w-auto mt-auto mb-auto"
                  >
                    <p key={feature._id}>
                      {featureId}:{featureValue}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <button onClick={() => downloadData(dataSet)}>
            <FontAwesomeIcon icon={faCircleDown} className="text-3xl" />
          </button>
        </div>
      ))}

      {dataSets.length > 0 ? (
        <div>
          <button
            onClick={() => {
              downloadAll(dataSets);
            }}
            className=" rounded-lg shadow-lg p-4 bg-slate-600 text-white
         hover:bg-slate-500 mt-10"
          >
            Download All
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default DownloadDataSets;
