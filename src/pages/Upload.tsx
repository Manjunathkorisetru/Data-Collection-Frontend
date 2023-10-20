import { SetStateAction, useEffect, useState } from "react";
import ImageUpload from "../components/ImageUpload";
import PreviewDataSets from "../components/PreviewDataSets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faXmark } from "@fortawesome/free-solid-svg-icons";
import DatePickerComponent from "../components/DatePickerComponent";
// import { postImage } from "../apicalls";
import formatDate from "../utils/FormatDate";

import axios from "axios";
import Banner from "../components/Banner";
import LoadingStatus from "../components/LoadingStatus";

// interface Features {
//   value: string | Date | null;
//   type: string;
//   _id: string;
// }
// interface DataSet {
//   id: number;
//   image: string;
//   features: Features;
// }

// interface Props {
//   dataSets: DataSet[];
// }

function Upload({
  dataSets,
  getDataSets,
}: {
  dataSets: any;
  getDataSets: any;
}) {
  const options = ["Text", "Date"];
  const [selectedOption, setSelectedOption] = useState("Text");
  const [text, setText] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [editUpload, setEditUpload] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [existingDataId, setExistingDataId] = useState<string | null>(null);
  const [showUploadBanner, setShowUploadBanner] = useState(false);
  const [showUpdateBanner, setShowUpdateBanner] = useState(false);
  const [showDeleteBanner, setShowDeleteBanner] = useState(false);
  const [limitReached, setLimitReached] = useState(false);
  const [charLimitReached, setCharLimitReached] = useState(false);
  const userInfo = localStorage.getItem("userInfo");

  interface Feature {
    value: string | Date | null;
    type: string;
  }
  const [features, setFeatures] = useState<Feature[]>([]);

  const handleOptionChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSelectedOption(event.target.value);
  };

  const featuresCount = features.length;

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(
        "http://localhost:3000/users/delete",
        {
          data: {
            email: `${userInfo}@gmail.com`,
            id: id,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + `${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 201) {
        window.scrollTo(0, 0);
        setShowDeleteBanner(true);
        setTimeout(() => {
          window.location.reload();
        }, 4000);
        setTimeout(() => {
          setShowDeleteBanner(false);
        }, 3000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleFeauture = () => {
    if (featuresCount < 16) {
      if (selectedOption === "Text") {
        setFeatures([...features, { value: text, type: "Text" }]);
      } else {
        setFeatures([...features, { value: selectedDate, type: "Date" }]);
      }
    } else {
      setLimitReached(true);
    }
  };

  const handleDateChange = (date: SetStateAction<Date | null>) => {
    setSelectedDate(date);
  };

  const handleUpload = async ({ selectedImage }: { selectedImage: string }) => {
    if (existingDataId) {
      try {
        const response = await axios.put(
          "http://localhost:3000/users/update",
          {
            email: `${userInfo}@gmail.com`,
            id: existingDataId,
            features: features,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + `${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.status === 201) {
          setShowUpdateBanner(true);
          window.scrollTo(0, 0);
          setTimeout(() => {
            window.location.reload();
          }, 4000);
          setTimeout(() => {
            setShowUpdateBanner(false);
          }, 4000);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3000/users/upload",
          {
            email: `${userInfo}@gmail.com`,
            image: selectedImage.split(",")[1],
            features: features,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + `${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.status === 201) {
          setShowUploadBanner(true);
          window.scrollTo(0, 0);
          setTimeout(() => {
            window.location.reload();
          }, 4000);
          setTimeout(() => {
            setShowUploadBanner(false);
          }, 4000);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    if (selectedOption === "Text") {
      setShowInput(true);
      setShowDate(false);
    } else {
      setShowDate(true);
      setShowInput(false);
    }
  }, [selectedOption]);

  useEffect(() => {
    if (featuresCount < 16) {
      setLimitReached(false);
    }
    // if (text.length > 8) {
    //   setCharLimitReached(true);
    // }
  }, [features]);

  return (
    <div className="flex flex-col justify-center items-center mb-14 ">
      {showUploadBanner && <Banner msg="Uploaded" />}
      {showUpdateBanner && <Banner msg="Updated" />}
      {showDeleteBanner && <Banner msg="Deleted" />}
      {editUpload && selectedImage !== null ? (
        <>
          <div
            className="h-[50vh] w-screen flex justify-center 
        mt-[40px] relative items-center sm:max-w-screen-sm 
        md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl gap-2"
          >
            <div
              className="flex justify-center gap-4 w-screen
          sm:gap-0 sm:mt-0 sm:min-w-min "
            >
              <img
                src={selectedImage ? selectedImage : ""}
                alt="image"
                className="rounded-lg lg:w-[30vw] lg:h-[50vh] md:w-[25vw] md:h-[40vh]
                sm:w-[25vw] sm:h-[40vh] shadow-lg "
              />

              <div
                className="container sm:max-w-screen-sm bg-slate-200 
            rounded-xl flex flex-col justify-center items-center shadow-xl"
              >
                <p>Features</p>
                <div
                  className="grid sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 
            lg:grid-cols-3 gap-2 rounded-lg w-full 
            sm:max-h-80 sm:overflow-y-auto sm:gap-4 p-4 border-2 border-gray-400 "
                >
                  {features.map((feature, index) => {
                    const featureId = `f${index + 1}`;
                    let featureValue;

                    if (
                      typeof feature.value === "string" &&
                      feature.value.endsWith("Z")
                    ) {
                      featureValue = formatDate(feature.value);
                    } else {
                      featureValue = feature.value;
                    }
                    return (
                      <div
                        key={index}
                        className=" bg-blue-400 
                        p-2 rounded-lg h-10 mt-10 relative text-sm "
                      >
                        <p>
                          {featureId} : {""}
                          {featureValue
                            ? featureValue.toLocaleString("de-DE", {
                                year: "numeric",
                                month: "numeric",
                                day: "numeric",
                              })
                            : ""}
                        </p>
                        <FontAwesomeIcon
                          icon={faXmark}
                          fontSize="24px"
                          color="black"
                          className="absolute top-2 right-2 cursor-pointer hover:text-red-700"
                          onClick={() => {
                            const newFeatures = features.filter(
                              (_item, i) => i !== index
                            );
                            setFeatures(newFeatures);
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
                {limitReached && (
                  <p className="text-red-700 text-xs mt-4">
                    Maximum limit of 16 reached! (Scrollable List!) ⬆
                  </p>
                )}
              </div>
              <button className="ml-2 ">
                <FontAwesomeIcon
                  icon={faTrashCan}
                  className="ml-2"
                  fontSize="24px"
                  color="red"
                  onClick={() => {
                    setEditUpload(false);
                    setFeatures([]);
                    setSelectedImage(null);
                  }}
                />
              </button>
            </div>
          </div>
          <div className="flex justify-between gap-4 w-1/2 mt-10 items-center">
            <p>Select the feature type: </p>
            {options.map((option, index) => (
              <div key={index}>
                <input
                  type="radio"
                  id={option}
                  name="options"
                  value={option}
                  checked={selectedOption === option}
                  onChange={handleOptionChange}
                />
                <label className="ml-2 " htmlFor={option}>
                  {option}
                </label>
              </div>
            ))}
          </div>
        </>
      ) : (
        <ImageUpload
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          setEditUpload={setEditUpload}
        />
      )}
      {showInput && editUpload ? (
        <div
          className="flex justify-between gap-4 items-center 
         mt-10 p-2 rounded-lg"
        >
          <div className="flex flex-col justify-normal gap-10 relative">
            <input
              type="text"
              placeholder="Enter a feature (Max 10 chars)"
              className={`bg-slate-100 p-2 rounded-lg shadow-lg mt-3 ${
                charLimitReached ? "border-red-500" : ""
              }`}
              value={text}
              maxLength={9}
              onChange={(event) => {
                setCharLimitReached(false);
                if (event.target.value.length <= 8) {
                  setText(event.target.value);
                }
                if (event.target.value.length === 9) {
                  setCharLimitReached(true);
                }
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleFeauture();
                }
              }}
            />
            {charLimitReached && (
              <p className="text-red-700 text-xs mt-4 absolute -bottom-4">
                Max Char limit of 8 reached!
              </p>
            )}
          </div>

          <button
            onClick={handleFeauture}
            className="bg-green-400 rounded-lg text-black p-2 w-20 h-10
             hover:bg-green-800 hover:text-white shadow-xl"
            hidden={text.length === 0}
          >
            Add
          </button>
        </div>
      ) : showDate ? (
        <div className="flex justify-center items-center gap-4 mt-20">
          <DatePickerComponent
            selectedDate={selectedDate}
            handleDateChange={handleDateChange}
          />
          <button
            onClick={handleFeauture}
            className="bg-green-400 rounded-lg text-black p-2 w-20 h-10
             hover:bg-green-800 hover:text-white shadow-xl"
          >
            Add
          </button>
        </div>
      ) : null}

      {editUpload && selectedImage !== null ? (
        <button
          onClick={() => {
            if (selectedImage) {
              handleUpload({ selectedImage });
              getDataSets();
              setEditUpload(false);
              setSelectedImage(null);
            }
          }}
          className="bg-green-400 rounded-lg text-black px-4 py-2 
                     hover:bg-green-800 hover:text-white shadow-xl mt-20 relative"
        >
          Upload
        </button>
      ) : null}

      {dataSets.length > 0 ? (
        <PreviewDataSets
          dataSets={dataSets}
          setEditUpload={setEditUpload}
          setSelectedImage={setSelectedImage}
          setFeatures={setFeatures}
          setExistingDataId={setExistingDataId}
          handleDelete={handleDelete}
        />
      ) : (
        <LoadingStatus />
      )}
    </div>
  );
}

export default Upload;
