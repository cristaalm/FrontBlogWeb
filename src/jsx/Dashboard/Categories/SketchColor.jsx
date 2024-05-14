import React, { useState, useRef, useEffect } from "react";
import reactCSS from "reactcss";
import { SketchPicker } from "react-color";
import PropTypes from "prop-types";

const SketchColor = ({ onChange }) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useState({
    r: "241",
    g: "112",
    b: "19",
    a: "1",
  });
  const sketchPickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sketchPickerRef.current &&
        !sketchPickerRef.current.contains(event.target)
      ) {
        setDisplayColorPicker(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };
  function hexToRgba(hex, alpha) {
    // Remove '#' if present
    hex = hex.replace(/^#/, "");

    // Convert hexadecimal to RGB
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    // Ensure alpha value is between 0 and 1
    alpha = alpha >= 0 && alpha <= 1 ? alpha : 1;

    // Return RGBA values
    return { r, g, b, a: alpha };
  }
  const handleChange = (newColor) => {
    setColor(newColor.rgb);
    if (onChange) {
      onChange(newColor);
    }
  };

  $("#btnSketch").off("click");
  $("#btnSketch").on("click", function (event, data) {
    setColor(hexToRgba(data, 1));
  });

  const styles = reactCSS({
    default: {
      color: {
        width: "36px",
        height: "14px",
        borderRadius: "2px",
        background: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
      },
      swatch: {
        padding: "5px",
        background: "#fff",
        borderRadius: "1px",
        boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
        display: "inline-block",
        cursor: "pointer",
      },
      popover: {
        position: "absolute",
        zIndex: "2",
      },
      cover: {
        position: "fixed",
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
      },
    },
  });

  return (
    <div ref={sketchPickerRef}>
      <div style={styles.swatch} onClick={handleClick}>
        <div style={styles.color} />
      </div>
      {displayColorPicker ? (
        <div style={styles.popover}>
          <div
            style={styles.cover}
            onClick={() => setDisplayColorPicker(false)}
          />
          <SketchPicker color={color} onChange={handleChange} />
        </div>
      ) : null}
      <button id="btnSketch" className="hidden" type="button">
        Trigger onChange Programmatically
      </button>
    </div>
  );
};

SketchColor.propTypes = {
  onChange: PropTypes.func,
};

export default SketchColor;
