import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faRotate, faPen } from "@fortawesome/free-solid-svg-icons";
import formatDate from "../utils/FormatDate";

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

  // function formatDate(isoDateString: string | number | Date) {
  //   const date = new Date(isoDateString);
  //   const day = date.getDate().toString().padStart(2, "0"); // Add leading zero if single-digit
  //   const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
  //   const year = date.getFullYear();
  //   return `${day}.${month}.${year}`;
  // }

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
                className="container p-4 w-[30vw] h-[30vh] bg-slate-200 
  rounded-xl flex flex-col justify-center items-center relative"
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
                      <>
                        <div
                          key={feature._id}
                          className=" bg-blue-400 
                p-1 rounded-lg text-xs text-center h-auto w-auto mt-auto mb-auto "
                        >
                          <p key={feature._id}>
                            {featureId}: {featureValue}
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
                  window.scrollTo(0, 0);
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
