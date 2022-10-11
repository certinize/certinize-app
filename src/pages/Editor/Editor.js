import Button from "../../components/Button/Button";
import ToolCategory from "../../components/ToolCategory/ToolCategory";
import "./Editor.css";
import React from "react";
import Draggable from "react-draggable";

const fontStyles = [
  { value: "arial", label: "Arial" },
  { value: "times", label: "Times New Roman" },
  { value: "courier", label: "Courier New" },
];

const fontSizes = [
  { value: "12", label: "12" },
  { value: "14", label: "14" },
  { value: "16", label: "16" },
  { value: "18", label: "18" },
  { value: "20", label: "20" },
  { value: "22", label: "22" },
  { value: "24", label: "24" },
  { value: "26", label: "26" },
  { value: "28", label: "28" },
  { value: "30", label: "30" },
  { value: "32", label: "32" },
  { value: "34", label: "34" },
  { value: "36", label: "36" },
  { value: "38", label: "38" },
  { value: "40", label: "40" },
  { value: "64", label: "64" },
  { value: "70", label: "70" },
];

export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.recipientName = React.createRef();
    this.date = React.createRef();
  }

  eventLogger(e, data) {
    console.log("Event: ", e);
    console.log("Data: ", data);
  }

  updateFontStyle(ref, fontStyle = "arial") {
    ref.current.style.fontFamily = fontStyle;
  }

  updateFontSize(ref, fontSize = 12) {
    console.log(fontSize);
    ref.current.style.fontSize = `${fontSize}px`;
  }

  render() {
    return (
      <div className="primary-container">
        <div className="editor-container">
          <div className="ecert-container">
            <div className="box">
              <Draggable bounds="parent" defaultPosition={{ x: 0, y: 0 }}>
                <div className="handle" ref={this.recipientName}>
                  <div className="box__title">
                    <p className="name">Maria Dela Cruz</p>
                  </div>
                </div>
              </Draggable>
              <Draggable bounds="parent" defaultPosition={{ x: 0, y: 20 }}>
                <div className="handle" ref={this.date}>
                  <div className="box__title">
                    <p className="date">MM/DD/YYYY</p>
                  </div>
                </div>
              </Draggable>
            </div>
          </div>
          <div className="btn-container">
            <Button
              text="Next"
              style={{ width: "10%", height: "3em", fontSize: "1.5em" }}
            />
          </div>
        </div>
        <div className="tool-menu">
          <ToolCategory
            label={"Recipient Name"}
            first={fontStyles}
            second={fontSizes}
            firstCallback={(option) => {
              this.updateFontStyle(this.recipientName, option.value);
            }}
            secondCallback={(option) => {
              this.updateFontSize(this.recipientName, option.value);
            }}
          />
          <ToolCategory
            label={"Date"}
            first={fontStyles}
            second={fontSizes}
            firstCallback={(option) => {
              this.updateFontStyle(this.date, option.value);
            }}
            secondCallback={(option) => {
              this.updateFontSize(this.date, option.value);
            }}
          />
        </div>
      </div>
    );
  }
}
