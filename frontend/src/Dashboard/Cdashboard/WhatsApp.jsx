import React, { useState, useEffect } from "react";
import { Spin, message, text } from "antd";
import Papa from "papaparse";
import { LoadingOutlined } from "@ant-design/icons";
const WhatsApp = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [image, setImage] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [contacts, setContacts] = useState(null);
  const [text, setMessage] = useState("");
  const [csvFile, setCsvFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch(
          process.env.REACT_APP_BACKEND_URL + "/api/bulkmessage/check-login"
        );
        const data = await response.json();
        setLoggedIn(data.loggedIn);
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    // Call the function to check login status when the component mounts
    checkLoginStatus();
    const intervalId = setInterval(checkLoginStatus, 5000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(
          process.env.REACT_APP_BACKEND_URL +
            "/api/bulkmessage/qrcode/get/qrcode"
        );

        if (response.ok) {
          const imageData = await response.blob();
          const url = URL.createObjectURL(imageData);
          setImageUrl(url);
        } else {
          console.error(
            "Failed to fetch image:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
    const intervalId = setInterval(fetchImage, 5000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  const handleCsvFileUpload = (e) => {
    const file = e.target.files[0];
    setCsvFile(file);
  };
  const parseCsvData = (file) => {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        complete: (result) => {
          if (result.errors.length === 0) {
            const rows = result.data.map((row) => row.join(",")).join(",");
            resolve(rows);
          } else {
            reject(result.errors);
          }
        },
        header: false,
        delimiter: ",", // Specify the delimiter used in your CSV file
      });
    });
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setImage(null);
    setContacts(null);
    setMessage("");
  };

  const handleSubmit = async () => {
    try {
      setLoading(true); // Set loading to true when starting the submission

      const formData = new FormData();
      formData.append("option", selectedOption);
      formData.append("text", text);

      if (selectedOption === "image" || selectedOption === "imageText") {
        formData.append("image", image);
      }
      if (selectedOption === "pdf") {
        formData.append("pdf", pdf);
      }

      if (csvFile) {
        const csvData = await parseCsvData(csvFile);
        formData.append("contacts", csvData);
      }

      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          "/api/bulkmessage/message/create/message",
        {
          method: "POST",
          body: formData,
        }
      );
      console.log(formData);
      if (response.ok) {
        console.log("Form data sent successfully");
        message.success(
          "Your text is recieved, it will be sent to the users soon"
        );
        setTimeout(() => {
          window.location.reload();
        }, 3000);
        // Handle success, e.g., show a success text to the user
      } else {
        console.error(
          "Failed to send form data:",
          response.status,
          response.statusText
        );
        // Handle error, e.g., show an error text to the user
      }
    } catch (error) {
      console.error("Error sending form data:", error);
      // Handle error, e.g., show an error text to the user
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
  const handlePdfUpload = (e) => {
    const file = e.target.files[0];
    setPdf(file);
    console.log("Selected PDF:", file);
  };

  const handleContacts = (e) => {
    setContacts(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  // const handleSubmit = () => {
  //   console.log({ selectedOption, image, csvFile, text });
  // };

  return (
    <React.Fragment>
      {loggedIn === false && imageUrl && (
        <center>
          <div>
            <img src={imageUrl} alt="QR Code" />
            <h1>
              Please scan the QR using your WhatsApp Application to link your
              device
            </h1>
          </div>
        </center>
      )}
      {loggedIn === true && (
        <div className="max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded-md shadow-md">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Select an option:
            </label>
            <div className="flex items-center mb-4">
              <input
                type="radio"
                id="imageOption"
                value="image"
                checked={selectedOption === "image"}
                onChange={() => handleOptionChange("image")}
                className="mr-2"
              />
              <label htmlFor="imageOption" className="mr-4">
                Image
              </label>
              <input
                type="radio"
                id="pdfOption" // Updated ID
                value="pdf"
                checked={selectedOption === "pdf"}
                onChange={() => handleOptionChange("pdf")} // Updated onChange function
                className="mr-2"
              />
              <label htmlFor="pdfOption" className="mr-4">
                {" "}
                PDF + text
              </label>

              <input
                type="radio"
                id="imageTextOption"
                value="imageText"
                checked={selectedOption === "imageText"}
                onChange={() => handleOptionChange("imageText")}
                className="mr-2"
              />

              <label htmlFor="imageTextOption" className="mr-4">
                Image + Text
              </label>

              <input
                type="radio"
                id="textOption"
                value="text"
                checked={selectedOption === "text"}
                onChange={() => handleOptionChange("text")}
              />
              <label htmlFor="textOption">Text</label>
            </div>
          </div>

          {/* Conditional rendering based on the selected option */}
          {selectedOption === "image" && (
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Upload Image:
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="mb-4"
              />
            </div>
          )}
          {selectedOption === "pdf" && (
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Upload Pdf:
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={handlePdfUpload}
                className="mb-4"
              />
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Enter Text:
              </label>
              <textarea
                rows="4"
                value={text}
                onChange={handleMessageChange}
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
              />
            </div>
          )}

          {selectedOption === "imageText" && (
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Upload Image:
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="mb-4"
              />

              <label className="block text-lg font-medium text-gray-700 mb-2">
                Enter Text:
              </label>
              <textarea
                rows="4"
                value={text}
                onChange={handleMessageChange}
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
              />
            </div>
          )}

          {selectedOption === "text" && (
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Enter Text:
              </label>
              <textarea
                rows="4"
                value={text}
                onChange={handleMessageChange}
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
              />
            </div>
          )}

          <label className="block text-lg font-medium text-gray-700 mb-2">
            Upload CSV File:
          </label>
          <input
            type="file"
            accept=".csv"
            onChange={handleCsvFileUpload}
            className="mb-4"
          />

          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <Spin
                indicator={<LoadingOutlined style={{ fontSize: 20 }} spin />}
              />
            ) : (
              "Submit"
            )}
          </button>
        </div>
      )}
    </React.Fragment>
  );
};
export default WhatsApp;
