import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faRotate, faPen } from "@fortawesome/free-solid-svg-icons";

// interface Features {
//   value: string | Date | null;
//   type: string;
//   _id: string;
// }
// interface DataSet {
//   id: number;
//   image: string;
//   features: Features[];
// }

// import { useEffect } from "react";

// interface PreviewDataSetsProps {
//   dataSets: DataSet[];
// }

interface PreviewDataSetsProps {
  dataSets: any;
  setEditUpload: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedImage: any;
  setFeatures: any;
  setExistingDataId?: any;
  handleDelete: any;
}

function PreviewDataSets({
  dataSets: initialDataSets,
  setEditUpload,
  setSelectedImage,
  setFeatures,
  setExistingDataId,
  handleDelete,
}: PreviewDataSetsProps) {
  const data = initialDataSets.map((dataSet: any) => {
    const result = dataSet.datasets.map((element: any) => {
      return element;
    });
    return result;
  });

  return (
    <div className="flex flex-col gap-4 w-screen h-screen ">
      <h1 className="text-3xl font-bold text-center mt-24">
        Preview of Uploaded Data Sets
      </h1>
      <button
        onClick={() => {
          window.location.reload();
        }}
      >
        <FontAwesomeIcon
          icon={faRotate}
          className="ml-4"
          fontSize="24px"
          color="black"
        />
      </button>

      {data.map((item: any) => {
        return item.map((dataSet: any) => {
          return (
            <div
              key={dataSet._id}
              className="flex justify-center gap-4 items-center mt-10"
            >
              <img
                src={`data:image/jpeg;base64,${dataSet.image}`}
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
                  {dataSet.features.map((feature: any, index: number) => {
                    const featureId = `f${index + 1}`;
                    return (
                      <>
                        <div
                          key={feature._id}
                          className=" bg-blue-400 
                p-2 rounded-lg h-10 "
                        >
                          <p key={feature._id}>
                            {featureId}:{" "}
                            {feature.value instanceof Date
                              ? feature.value.toLocaleDateString("de-DE")
                              : feature.value}
                          </p>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
              <button
                className="ml-4"
                onClick={() => {
                  setSelectedImage(`data:image/jpeg;base64,${dataSet.image}`);
                  setEditUpload(true);
                  setFeatures(dataSet.features);
                  setExistingDataId(dataSet.id);
                }}
              >
                <FontAwesomeIcon
                  icon={faPen}
                  className="ml-4"
                  fontSize="24px"
                  color="black"
                />
              </button>
              <button
                className="ml-4"
                onClick={() => {
                  handleDelete(dataSet.id);
                }}
              >
                <FontAwesomeIcon
                  icon={faTrashCan}
                  className="ml-4"
                  fontSize="24px"
                  color="red"
                />
              </button>
            </div>
          );
        });
      })}
    </div>
  );
}

export default PreviewDataSets;
