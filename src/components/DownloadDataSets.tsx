import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDown } from "@fortawesome/free-solid-svg-icons";
import JSZip from "jszip";
import Papa from "papaparse";

interface DataSet {
  id: number;
  image: string;
  features: { name: string; value: string; type: string }[];
}

const downloadData = async (dataSet: DataSet) => {
  const zip = new JSZip();

  const { id, image, features } = dataSet;

  // Download images
  const imageBlob = await fetch(image).then((response) => response.blob());
  zip.file(`image_${id}.jpg`, imageBlob);

  // Convert features to CSV
  const csvData = Papa.unparse(features);
  zip.file(`features_${id}.csv`, csvData);

  // Generate the zip file
  zip.generateAsync({ type: "blob" }).then((content) => {
    // Create a download link and trigger the download
    const url = URL.createObjectURL(content);
    const a = document.createElement("a");
    a.href = url;
    a.download = "dataSets.zip";
    a.click();
  });
};

const downloadAll = async (dataSets: DataSet[]) => {
  const zip = new JSZip();

  // Iterate over dataSets
  for (const dataSet of dataSets) {
    const { id, image, features } = dataSet;

    // Download images
    const imageBlob = await fetch(image).then((response) => response.blob());
    zip.file(`image_${id}.jpg`, imageBlob);

    // Convert features to CSV
    const csvData = Papa.unparse(features);
    zip.file(`features_${id}.csv`, csvData);
  }

  // Generate the zip file
  zip.generateAsync({ type: "blob" }).then((content) => {
    const url = URL.createObjectURL(content);
    const a = document.createElement("a");
    a.href = url;
    a.download = "dataSets.zip";
    a.click();
  });
};

function DownloadDataSets({ dataSets }: { dataSets: DataSet[] }) {
  return (
    <div className="flex flex-col gap-4 w-screen h-screen ">
      <h1 className="text-3xl font-bold text-center mt-24">
        Download Data Sets
      </h1>
      {dataSets.map((dataSet, index) => (
        <div
          key={index}
          className="flex justify-center gap-4 items-center mt-10"
        >
          <img
            src={dataSet.image}
            alt="random"
            className="rounded-lg lg:w-[20vw] lg:h-[20vh] md:w-[20vw] md:h-[20vh]"
          />
          <div
            className="container p-4 w-[30vw] h-[20vh] bg-slate-200 
  rounded-xl flex flex-col justify-center items-center relative"
          >
            <p className="absolute top-1">Features</p>
            <div
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 
  lg:grid-cols-3 gap-6 rounded-lg w-full h-full mt-8"
            >
              {dataSet.features.map((feature, index) => (
                <div
                  key={index}
                  className=" bg-blue-400 
              p-2 rounded-lg h-10 "
                >
                  <p key={index}>
                    {feature.name}: {feature.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <button onClick={() => downloadData(dataSet)}>
            <FontAwesomeIcon icon={faCircleDown} className="text-3xl" />
          </button>
        </div>
      ))}

      <div>
        <button
          onClick={() => {
            downloadAll(dataSets);
          }}
          className=" rounded-lg shadow-lg p-4 bg-slate-600 text-white
         hover:bg-slate-500"
        >
          Download All
        </button>
      </div>
    </div>
  );
}

export default DownloadDataSets;
