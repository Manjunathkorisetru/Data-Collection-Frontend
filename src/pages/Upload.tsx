import { SetStateAction, useEffect, useState } from "react";
import ImageUpload from "../components/ImageUpload";
import PreviewDataSets from "../components/PreviewDataSets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import DatePickerComponent from "../components/DatePickerComponent";
// import { postImage } from "../apicalls";

import axios from "axios";

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
            email: "manjukori@outlook.com",
            id: id,
          },
        }
      );
      if (response.status === 201) {
        window.location.reload();
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
      alert("You can't add more than 16 features");
    }
  };

  const handleDateChange = (date: SetStateAction<Date | null>) => {
    setSelectedDate(date);
  };

  const handleUpload = async ({ selectedImage }: { selectedImage: string }) => {
    if (existingDataId) {
      try {
        const response = await axios.put("http://localhost:3000/users/update", {
          email: "manjukori@outlook.com",
          id: existingDataId,
          features: features,
        });
        if (response.status === 201) {
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3000/users/upload",
          {
            email: "manjukori@outlook.com",
            image: selectedImage.split(",")[1],
            features: features,
          }
        );
        if (response.status === 201) {
          setTimeout(() => {
            window.location.reload();
          }, 3000);
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

  return (
    <div className="flex flex-col justify-center items-center">
      {editUpload && selectedImage !== null ? (
        <>
          <div
            className="  h-[50vh] w-screen flex justify-center 
        mt-[40px] relative"
          >
            <div className="flex justify-center gap-4 w-screen">
              <img
                src={selectedImage ? selectedImage : ""}
                alt="image"
                className="rounded-lg lg:w-[30vw] lg:h-[50vh] md:w-[20vw] md:h-[20vh] shadow-2xl"
              />

              <div
                className="container p-4 max-w-screen-sm bg-slate-200 
            rounded-xl flex flex-col justify-center items-center shadow-xl h-max"
              >
                <p className="absolute top-2">Features</p>
                <div
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 
            lg:grid-cols-3 gap-2  rounded-lg w-full  mt-4 ml-10 mr-10"
                >
                  {features.map((feature, index) => {
                    const featureId = `f${index + 1}`;
                    return (
                      <div
                        key={index}
                        className=" bg-blue-400 
                    p-2 rounded-lg h-10 mt-10"
                      >
                        <p>
                          {featureId} : {""}
                          {feature.value instanceof Date
                            ? feature.value.toLocaleDateString("de-DE")
                            : feature.value}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <button className="ml-4">
                <FontAwesomeIcon
                  icon={faTrashCan}
                  className="ml-4"
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
          <input
            type="text"
            placeholder="Enter a feature"
            className="bg-slate-100 p-2 rounded-lg shadow-lg"
            value={text}
            maxLength={10}
            width={200}
            onError={() => {
              alert("You can't add more than 10 characters");
            }}
            onChange={(event) => {
              setText(event.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                setShowInput(true);
              }
            }}
          />
          <button
            onClick={handleFeauture}
            className="bg-green-400 rounded-lg text-black p-2 w-20 h-10
             hover:bg-green-800 hover:text-white shadow-xl"
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
            }
          }}
          className="bg-green-400 rounded-lg text-black p-2 w-20 h-10
                     hover:bg-green-800 hover:text-white shadow-xl mt-20"
        >
          Upload
        </button>
      ) : null}

      <PreviewDataSets
        dataSets={dataSets}
        setEditUpload={setEditUpload}
        setSelectedImage={setSelectedImage}
        setFeatures={setFeatures}
        setExistingDataId={setExistingDataId}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default Upload;
